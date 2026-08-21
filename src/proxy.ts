import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAllowedSiteHost, isShareHost } from "@/lib/domains";

function hostname(request: NextRequest) {
  return request.headers.get("host") || "";
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

export function proxy(request: NextRequest) {
  const host = hostname(request);
  if (!isAllowedSiteHost(host)) {
    return new NextResponse(null, { status: 404 });
  }

  if (!isShareHost(host)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return rewriteToShare(request);
  }

  if (
    pathname.startsWith("/share") ||
    pathname.startsWith("/api/og-image")
  ) {
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

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
