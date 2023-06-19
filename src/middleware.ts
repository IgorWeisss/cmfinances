import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://www.carolmueller.com.br', 'https://carolmueller.com.br']
  : ['http://localhost:3000', 'chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld']

export async function middleware(req:NextRequest, res:NextResponse) {
  
  const origin = req.headers.get('origin')
  console.log("Origin: ", origin)

  if (origin && !allowedOrigins.includes(origin) || !origin) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-type': 'text/plain'
      }
    })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}