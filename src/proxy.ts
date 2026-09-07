import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_SHARE_CLIENT_ID,
  isAgentPath,
  isAllowedSiteHost,
  isBrokerListingPath,
  isLocalHost,
  isPropnetraHost,
  isShareAppPath,
  isShareHost,
} from "@/lib/domains";

function hostname(request: NextRequest) {
  return request.headers.get("host") || "";
}

function notFound() {
  return new NextResponse(null, { status: 404 });
}

function withShareHeader(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-propnetra-site", "share");
  return NextResponse.next({ request: { headers } });
}

function rewriteToShare(request: NextRequest, pathname = "/share") {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const headers = new Headers(request.headers);
  headers.set("x-propnetra-site", "share");
  return NextResponse.rewrite(url, { request: { headers } });
}

/** Short public paths → existing /share/... page tree. */
function rewriteShortSharePath(pathname: string): string | null {
  let m = pathname.match(/^\/l\/([^/]+)\/([^/]+)\/?$/);
  if (m) return `/share/listings/${m[1]}/u/${m[2]}`;
  m = pathname.match(/^\/l\/([^/]+)\/?$/);
  if (m) return `/share/listings/${m[1]}`;

  m = pathname.match(/^\/c\/([^/]+)\/([^/]+)\/?$/);
  if (m) return `/share/clients/${m[1]}/${m[2]}`;
  m = pathname.match(/^\/c\/([^/]+)\/?$/);
  if (m) return `/share/clients/${m[1]}`;

  m = pathname.match(/^\/k\/([^/]+)\/?$/);
  if (m) return `/share/packs/${m[1]}`;

  return null;
}

/** Broker short paths → /p/... page tree. */
function rewriteShortBrokerPath(pathname: string): string | null {
  let m = pathname.match(/^\/k\/([^/]+)\/([^/]+)\/?$/);
  if (m) return `/p/packs/${m[1]}/u/${m[2]}`;
  m = pathname.match(/^\/k\/([^/]+)\/?$/);
  if (m) return `/p/packs/${m[1]}`;

  // /p/:code/:sharer (drop legacy /u/) — not /p/packs/...
  m = pathname.match(/^\/p\/(?!packs(?:\/|$))([^/]+)\/([^/]+)\/?$/);
  if (m && m[2] !== "u") return `/p/${m[1]}/u/${m[2]}`;

  return null;
}

/**
 * Merged WhatsApp-card site:
 *   Short: /l /c /k  (+ legacy /share/... and /listings /clients /packs)
 * Anything else (marketing, /agent) is 404.
 */
function handleShareHost(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "/share") {
    const url = request.nextUrl.clone();
    url.pathname = `/share/clients/${DEFAULT_SHARE_CLIENT_ID}`;
    if (!url.searchParams.has("og")) url.searchParams.set("og", "3");
    if (!url.searchParams.has("n")) url.searchParams.set("n", "5");
    const headers = new Headers(request.headers);
    headers.set("x-propnetra-site", "share");
    return NextResponse.rewrite(url, { request: { headers } });
  }

  const short = rewriteShortSharePath(pathname);
  if (short) return rewriteToShare(request, short);

  if (
    pathname.startsWith("/share") ||
    pathname.startsWith("/api/og-image") ||
    pathname.startsWith("/api/og-avatar")
  ) {
    return withShareHeader(request);
  }

  if (
    pathname === "/icon" ||
    pathname.startsWith("/icon.") ||
    pathname.startsWith("/apple-icon") ||
    pathname === "/apple-touch-icon.png" ||
    pathname === "/apple-touch-icon-precomposed.png" ||
    pathname === "/brand-icon-192.png" ||
    pathname === "/favicon.ico" ||
    pathname === "/favicon.png" ||
    pathname === "/logo-cropped.png"
  ) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/clients/") ||
    pathname.startsWith("/listings/") ||
    pathname.startsWith("/packs/") ||
    pathname === "/clients" ||
    pathname === "/listings" ||
    pathname === "/packs"
  ) {
    return rewriteToShare(request, `/share${pathname}`);
  }

  return notFound();
}

/**
 * propnetra.devsol.in  → marketing site
 *   /p/:id  /p/:id/:sharer  /k/:id  → broker WhatsApp cards
 * 168-144-88-78.sslip.io → client WhatsApp share pages only
 */
export function proxy(request: NextRequest) {
  const host = hostname(request);
  if (!isAllowedSiteHost(host)) {
    return notFound();
  }

  if (isLocalHost(host)) {
    return NextResponse.next();
  }

  if (isShareHost(host)) {
    return handleShareHost(request);
  }

  if (isPropnetraHost(host)) {
    const { pathname } = request.nextUrl;
    const short = rewriteShortBrokerPath(pathname);
    if (short) return rewriteToShare(request, short);

    if (
      isBrokerListingPath(pathname) ||
      pathname.startsWith("/api/og-image") ||
      pathname.startsWith("/api/og-avatar")
    ) {
      return withShareHeader(request);
    }
    if (isShareAppPath(pathname) || isAgentPath(pathname)) {
      return notFound();
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
