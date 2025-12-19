import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // If user is trying to access root or auth pages, let them through
  if (pathname === "/" || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // All authenticated users can access all routes
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/manager/:path*",
    "/lead/:path*",
    "/employee/:path*",
    "/projects/:path*",
    "/settings/:path*",
  ],
};
