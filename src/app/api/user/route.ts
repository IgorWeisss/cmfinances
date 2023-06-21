import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin')
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
      },
    })
    return NextResponse.json(users, {
      status: 200,
      statusText: 'Ok',
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Content-type': 'application/json',
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

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')

  const { email, name, password } = await req.json()

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })

    return NextResponse.json(newUser, {
      status: 201,
      statusText: 'Created',
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Content-type': 'application/json',
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
