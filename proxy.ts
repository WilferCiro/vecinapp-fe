import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token");

  const isAuth = Boolean(token);
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login") && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/dashboard") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}