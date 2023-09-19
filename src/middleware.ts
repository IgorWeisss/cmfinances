import { NextRequest, NextResponse } from 'next/server'
import { verify } from './lib/JWTUtil'

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_ALLOWED_ORIGIN.split(',')
    : [
        'http://localhost:3000',
        'chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld',
      ]

export async function middleware(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname.startsWith('/api/auth/logout')) {
    return NextResponse.next()
  }

  // Auth for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const origin = request.headers.get('origin')
    const auth = request.headers.get('Authorization')
    const verifiedApiRequest = auth === process.env.NEXT_PUBLIC_API_KEY

    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse(null, {
        status: 400,
        statusText: 'Bad Request',
        headers: {
          'Content-type': 'text/plain',
        },
      })
    }

    if (!verifiedApiRequest) {
      return new NextResponse(null, {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
          'Content-type': 'text/plain',
        },
      })
    }
  }

  // Auth for the app Main page
  if (request.nextUrl.pathname.startsWith('/inicio')) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/', request.url), {
        headers: {
          'Set-cookie': `redirectTo=${request.url}; HttpOnly; Path=/; max-age=60;`,
        },
      })
    }

    try {
      const secret = process.env.JWT_SECRET
      await verify(token, secret)
    } catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL('/', request.url), {
        headers: {
          'Set-cookie': `redirectTo=${request.url}; HttpOnly; Path=/; max-age=60;`,
        },
      })
    }
  }

  return NextResponse.next()
}
