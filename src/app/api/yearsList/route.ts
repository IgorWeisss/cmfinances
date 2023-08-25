import { prisma } from '@/services/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Returns the list of years that have periods registered
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin')

  try {
    const periods = await prisma.period.findMany({
      select: {
        name: true,
      },
    })
    const yearsList = periods
      .reduce<string[]>((acc, cur) => {
        const year = cur.name.slice(3)
        if (acc.indexOf(year) === -1) {
          acc.push(year)
        }
        return acc
      }, [])
      .sort()

    return NextResponse.json(yearsList, {
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
