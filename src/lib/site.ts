import { headers } from "next/headers";
import { DEFAULT_SHARE_DOMAIN } from "./domains";

export const SITE_NAME = "PropNetra";
export const SITE_TAGLINE = "Property listings shared on PropNetra";
export const SITE_LOGO_PATH = "/logo.png";

export const SITE_URL = fallbackSiteUrl();

function fallbackSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SHARE_SITE_URL ||
    (process.env.NEXT_PUBLIC_SHARE_DOMAIN
      ? `https://${process.env.NEXT_PUBLIC_SHARE_DOMAIN}`
      : "") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : `https://${DEFAULT_SHARE_DOMAIN}`)
  ).replace(/\/$/, "");
}

/** Origin WhatsApp actually crawled, so og:url / og:image stay same-host. */
export async function resolveSiteUrl() {
  try {
    const headerStore = await headers();
    const raw = (
      headerStore.get("x-forwarded-host") ||
      headerStore.get("host") ||
      ""
    )
      .split(",")[0]
      .trim()
      .replace(/:\d+$/, "");
    if (raw) {
      const forwarded = (headerStore.get("x-forwarded-proto") || "")
        .split(",")[0]
        .trim()
        .toLowerCase();
      const isLocal = /^(localhost|127\.0\.0\.1)$/i.test(raw);
      const proto = isLocal ? forwarded || "http" : "https";
      return `${proto}://${raw}`.replace(/\/$/, "");
    }
  } catch {
    // headers() is unavailable outside a request
  }
  return SITE_URL;
}

export function siteUrl(path = "/", origin = SITE_URL) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin.replace(/\/$/, "")}${normalized}`;
}

export function siteLogoUrl(origin = SITE_URL) {
  return siteUrl(SITE_LOGO_PATH, origin);
}

export function absoluteImageUrl(url?: string | null, origin = SITE_URL) {
  if (!url) return siteLogoUrl(origin);
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return siteUrl(url, origin);
  return url;
}

/** WhatsApp rejects WebP/AVIF and often skips Unsplash `auto=format` URLs. */
export function whatsappSafeImageUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (host === "images.unsplash.com" || host.endsWith(".unsplash.com")) {
      parsed.search = "";
      parsed.searchParams.set("w", "1200");
      parsed.searchParams.set("h", "630");
      parsed.searchParams.set("fit", "crop");
      parsed.searchParams.set("fm", "jpg");
      parsed.searchParams.set("q", "80");
      return parsed.toString();
    }
  } catch {
    return url;
  }
  return url;
}

/** Same-origin JPEG so WhatsApp does not have to follow Unsplash redirects. */
export function proxiedOgImageUrl(
  url?: string | null,
  origin = SITE_URL,
  opts?: { layout?: "banner" | "thumb" },
) {
  if (!url || /^data:|^blob:/i.test(url)) return null;
  const absolute = /^https?:\/\//i.test(url)
    ? url
    : url.startsWith("/")
      ? siteUrl(url, origin)
      : url;
  if (!absolute || !/^https?:\/\//i.test(absolute) || absolute === siteLogoUrl(origin)) {
    return null;
  }
  const safe = whatsappSafeImageUrl(absolute);
  const proxyOrigin = origin.startsWith("http://") && !/localhost|127\.0\.0\.1/i.test(origin)
    ? origin.replace(/^http:/i, "https:")
    : origin;
  const layout =
    opts?.layout === "thumb" ? "&layout=thumb" : "";
  const version = opts?.layout === "thumb" ? "&v=7" : "";
  return siteUrl(`/api/og-image?u=${encodeURIComponent(safe)}${layout}${version}`, proxyOrigin);
}
