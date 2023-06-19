import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [process.env.NEXT_PUBLIC_ALLOWED_ORIGIN]
    : [
        'http://localhost:3000',
        'chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld',
      ]

export async function middleware(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get('origin')
  console.log('Origin: ', origin)

  // Remove when finished and deployed to production
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  if ((origin && !allowedOrigins.includes(origin)) || !origin) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-type': 'text/plain',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
