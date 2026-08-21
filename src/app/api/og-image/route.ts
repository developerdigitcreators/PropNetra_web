import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024;
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

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

async function toWhatsAppJpeg(buffer: Buffer): Promise<Buffer> {
  const sharp = (await import("sharp")).default;
  return sharp(buffer)
    .rotate()
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, chromaSubsampling: "4:2:0", mozjpeg: true })
    .toBuffer();
}

export async function GET(req: NextRequest) {
  const source = req.nextUrl.searchParams.get("u")?.trim() || "";
  if (!source || !isPublicHttpsUrl(source)) {
    return new NextResponse("Invalid image url", { status: 400 });
  }

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
    jpeg = await toWhatsAppJpeg(buffer);
  } catch {
    jpeg = buffer;
  }

  return new NextResponse(Uint8Array.from(jpeg), {
    status: 200,
    headers: {
      "Content-Type": jpeg === buffer && contentType.startsWith("image/")
        ? (contentType === "image/jpg" ? "image/jpeg" : contentType)
        : "image/jpeg",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Content-Length": String(jpeg.length),
    },
  });
}
