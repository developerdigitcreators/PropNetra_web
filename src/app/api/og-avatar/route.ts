import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OG_WIDTH = 200;
const OG_HEIGHT = 200;

function initialsFromName(raw: string) {
  const parts = String(raw || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return "A";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function sanitizeInitials(raw: string | null, name: string | null) {
  const fromParam = String(raw || "")
    .trim()
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 2)
    .toUpperCase();
  if (fromParam) return fromParam;
  return initialsFromName(name || "A").slice(0, 2);
}

export async function GET(req: NextRequest) {
  const initials = sanitizeInitials(
    req.nextUrl.searchParams.get("n"),
    req.nextUrl.searchParams.get("name"),
  );

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1B3A4B"/>
      <stop offset="100%" stop-color="#0F766E"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="100" y="115" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
        font-size="72" font-weight="700" fill="#FFFFFF">${initials}</text>
</svg>`;

  try {
    const sharp = (await import("sharp")).default;
    const jpeg = await sharp(Buffer.from(svg))
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover" })
      .jpeg({ quality: 82, chromaSubsampling: "4:2:0", mozjpeg: true })
      .toBuffer();

    return new NextResponse(Uint8Array.from(jpeg), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "Content-Length": String(jpeg.length),
      },
    });
  } catch {
    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
}
