import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest, res:NextResponse) {
  const origin = req.nextUrl.origin
  console.log("Origin: ", origin)
  const pathname = req.nextUrl.pathname
  console.log("pathname: ", pathname)
  const basePath = req.nextUrl.basePath
  console.log("basePath: ", basePath)

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}