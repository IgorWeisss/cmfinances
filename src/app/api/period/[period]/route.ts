import { prisma } from '@/services/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Returns a list of entries for the specified period
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
        entries: {
          orderBy: {
            client: 'asc',
          },
        },
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
