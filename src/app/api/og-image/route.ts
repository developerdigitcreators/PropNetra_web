import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024;
const BANNER_W = 1200;
const BANNER_H = 630;
const THUMB_EDGE = 200;

function isPublicHttpsUrl(raw: string) {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  const host = parsed.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    host === "::1"
  ) {
    return false;
  }
  if (
    /^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host)
  ) {
    return false;
  }
  return true;
}

async function toJpeg(buffer: Buffer, width: number, height: number): Promise<Buffer> {
  const sharp = (await import("sharp")).default;
  return sharp(buffer)
    .rotate()
    .resize(width, height, { fit: "cover", position: "centre" })
    .jpeg({ quality: 78, chromaSubsampling: "4:2:0", mozjpeg: true })
    .toBuffer();
}

async function solidThumb(): Promise<Buffer> {
  const sharp = (await import("sharp")).default;
  return sharp({
    create: {
      width: THUMB_EDGE,
      height: THUMB_EDGE,
      channels: 3,
      background: { r: 15, g: 118, b: 110 },
    },
  })
    .jpeg({ quality: 70 })
    .toBuffer();
}

export async function GET(req: NextRequest) {
  const source = req.nextUrl.searchParams.get("u")?.trim() || "";
  if (!source || !isPublicHttpsUrl(source)) {
    return new NextResponse("Invalid image url", { status: 400 });
  }

  const layout = (req.nextUrl.searchParams.get("layout") || "").toLowerCase();
  const isThumb = layout === "thumb";
  const width = isThumb ? THUMB_EDGE : BANNER_W;
  const height = isThumb ? THUMB_EDGE : BANNER_H;

  const upstream = await fetch(source, {
    redirect: "follow",
    headers: {
      Accept: "image/jpeg,image/jpg,image/png,image/webp,image/*;q=0.8,*/*;q=0.1",
      "User-Agent":
        "Mozilla/5.0 (compatible; PropNetraOgBot/1.0; +https://propnetra.devsol.in)",
    },
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    if (isThumb) {
      const fallback = await solidThumb();
      return new NextResponse(Uint8Array.from(fallback), {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=300",
          "Content-Length": String(fallback.length),
        },
      });
    }
    return new NextResponse("Image not found", { status: 404 });
  }

  const contentType = (upstream.headers.get("content-type") || "image/jpeg")
    .split(";")[0]
    .trim()
    .toLowerCase();
  if (!contentType.startsWith("image/") || contentType.includes("svg")) {
    return new NextResponse("Unsupported image type", { status: 415 });
  }

  const buffer = Buffer.from(await upstream.arrayBuffer());
  if (!buffer.length || buffer.length > MAX_BYTES) {
    return new NextResponse("Image too large", { status: 413 });
  }

  let jpeg: Buffer;
  try {
    jpeg = await toJpeg(buffer, width, height);
  } catch {
    jpeg = isThumb ? await solidThumb() : buffer;
  }

  return new NextResponse(Uint8Array.from(jpeg), {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": isThumb
        ? "public, max-age=3600, stale-while-revalidate=86400"
        : "public, max-age=86400, stale-while-revalidate=604800",
      "Content-Length": String(jpeg.length),
    },
  });
}
