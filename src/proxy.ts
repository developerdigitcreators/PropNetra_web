import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isShareHost } from "@/lib/domains";

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
  if (!isShareHost(hostname(request))) {
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

  return rewriteToShare(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
