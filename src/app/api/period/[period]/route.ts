import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { period: string } },
) {
  const origin = req.headers.get('origin')
  const period = params.period

  try {
    const periodData = await prisma.period.findUnique({
      where: {
        name: period,
      },
      include: {
        _count: true,
        entries: true,
      },
    })

    return NextResponse.json(periodData, {
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
