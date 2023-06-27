import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get('origin')

  const { searchParams } = new URL(req.url)
  const pageParam = searchParams.get('page')
  const page = pageParam !== null ? Number(pageParam) * 20 - 20 : 0

  try {
    const entries = await prisma.entry.findMany({
      take: 20,
      skip: page,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        dueDate: true,
        periodName: true,
      },
    })

    return NextResponse.json(entries, {
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
