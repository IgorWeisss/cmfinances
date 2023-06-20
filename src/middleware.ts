import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [process.env.NEXT_PUBLIC_ALLOWED_ORIGIN]
    : [
        'http://localhost:3000',
        'chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld',
      ]

export async function middleware(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    const origin = request.headers.get('origin')
    console.log('Origin: ', origin)
    const auth = request.headers.get('Authorization')
    console.log('Auth: ', auth)
    console.log('Key (.env): ', process.env.NEXT_PUBLIC_API_KEY)
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
        status: 403,
        statusText: 'Forbidden',
        headers: {
          'Content-type': 'text/plain',
        },
      })
    }
  }

  if (request.nextUrl.pathname.startsWith('/main')) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/', request.url), {
        headers: {
          'Set-cookie': `redirectTo=${request.url}; HttpOnly; Path=/; max-age=60;`,
        },
      })
    }
  }

  return NextResponse.next()
}
