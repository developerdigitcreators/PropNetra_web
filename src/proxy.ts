import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isAllowedSiteHost,
  isLocalHost,
  isMergedHost,
  isMergedPath,
  isPropnetraHost,
  isPropnetraPath,
  isShareHost,
  isSharedPath,
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

  return rewriteToShare(request);
}

/**
 * Domain isolation (same Next.js process, two public hosts):
 * - propnetra.devsol.in  → marketing pages only
 * - *.sslip.io           → merged /agent app only
 *
 * Route groups like (propnetra) cannot both own `/`, so isolation is
 * host + path allowlists instead of rewriting to /(propnetra).
 */
export function proxy(request: NextRequest) {
  const host = hostname(request);
  if (!isAllowedSiteHost(host)) {
    return notFound();
  }

  if (isShareHost(host)) {
    return handleShareHost(request);
  }

  // localhost: no isolation so both apps can be developed on one origin
  if (isLocalHost(host)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (isSharedPath(pathname)) {
    return NextResponse.next();
  }

  if (isPropnetraHost(host)) {
    if (isMergedPath(pathname)) {
      return notFound();
    }
    return NextResponse.next();
  }

  if (isMergedHost(host)) {
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/agent";
      return NextResponse.redirect(url);
    }
    if (isMergedPath(pathname)) {
      return NextResponse.next();
    }
    if (isPropnetraPath(pathname)) {
      return notFound();
    }
    return notFound();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
