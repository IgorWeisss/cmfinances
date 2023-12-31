import { JWT_DURATION_IN_SECONDS, sign, verify } from '@/lib/JWTUtil'
import { comparePassword } from '@/lib/passwordUtils'
import { prisma } from '@/services/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')

  const { email, password }: { email: string; password: string } =
    await req.json()

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return NextResponse.json('Usuário não cadastrado', {
        status: 404,
        statusText: 'User not found',
        headers: {
          'Access-Control-Allow-Origin': origin || '*',
        },
      })
    }

    const match = await comparePassword(password, user.password)

    if (!match) {
      return NextResponse.json('Senha incorreta', {
        status: 403,
        statusText: 'Wrong password',
        headers: {
          'Access-Control-Allow-Origin': origin || '*',
        },
      })
    }

    const userInfo = {
      userName: user.name,
      userId: user.id,
      userEmail: user.email,
    }

    // Creates JWT and sends it via cookies
    const secret = process.env.JWT_SECRET
    const token = await sign(userInfo, secret)
    const redirectTo = req.cookies.get('redirectTo')?.value || '/inicio'

    return NextResponse.json(redirectTo, {
      headers: {
        'Set-cookie': `token=${token}; Path=/; HttpOnly=true; Secure=true; max-age=${JWT_DURATION_IN_SECONDS};`,
        'Access-Control-Allow-Origin': origin || '*',
      },
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
      },
    })
  }
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin')

  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json('No token available', {
      status: 404,
      statusText: 'No token found',
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
      },
    })
  }

  try {
    const user = await verify(token, process.env.JWT_SECRET)

    return NextResponse.json(user, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
      },
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, {
      status: 503,
      statusText: 'Invalid token',
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
      },
    })
  }
}
