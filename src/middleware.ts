import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest, res:NextResponse) {
  const url = req.url
  console.log(url)  
}

export const config = {
  matcher: '/api/:path*',
}