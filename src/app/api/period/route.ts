import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin')

  try {
    const periods = await prisma.period.findMany({
      orderBy: {
        name: 'desc',
      },
      select: {
        name: true,
        _count: true,
      },
    })

    return NextResponse.json(periods, {
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
