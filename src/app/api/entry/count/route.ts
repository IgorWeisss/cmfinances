import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Returns the count of entries
export async function GET(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get('origin')

  try {
    const count = await prisma.entry.count()
    return NextResponse.json(count, {
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
