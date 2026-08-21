import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isAgentPath,
  isAllowedSiteHost,
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

/**
 * Merged WhatsApp-card site:
 *   /                         → share home
 *   /share/clients/:id        → property cards for a client
 *   /share/listings/:id       → single listing card
 *   /clients/:id, /listings/:id (short links) rewrite to /share/...
 * Anything else (marketing, /agent) is 404.
 */
function handleShareHost(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return rewriteToShare(request);
  }

  if (pathname.startsWith("/share") || pathname.startsWith("/api/og-image")) {
    return withShareHeader(request);
  }

  if (
    pathname.startsWith("/clients/") ||
    pathname.startsWith("/listings/") ||
    pathname === "/clients" ||
    pathname === "/listings"
  ) {
    return rewriteToShare(request, `/share${pathname}`);
  }

  return notFound();
}

/**
 * propnetra.devsol.in  → marketing site only
 * 168-144-88-78.sslip.io (and other share hosts) → WhatsApp card review pages
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
    if (isShareAppPath(request.nextUrl.pathname) || isAgentPath(request.nextUrl.pathname)) {
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
