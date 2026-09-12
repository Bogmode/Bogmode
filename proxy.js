import { NextResponse } from "next/server";
export function proxy() {
  return process.env.NODE_ENV === "production" ? new NextResponse(null, { status: 404 }) : NextResponse.next();
}
export const config = { matcher: ["/keystatic/:path*", "/api/keystatic/:path*"] };
