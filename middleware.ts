// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_PATHS.some((p) => pathname === p) || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/text/:path*",
    "/image/:path*",
    "/video/:path*",
    "/url/:path*",
    "/document/:path*",
    "/history/:path*",
    "/profile/:path*",
  ],
};
