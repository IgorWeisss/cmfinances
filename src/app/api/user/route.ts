import { prisma } from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// Returns a list of users
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin')
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        id: true,
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

// Creates a new user
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

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          'There is a unique constraint violation, a new user cannot be created with this email',
          {
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': origin || '*',
            },
          },
        )
      }
    }
  }
}
