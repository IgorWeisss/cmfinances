import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Returns a paginated list of all entries
export async function GET(req: NextRequest) {
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

// Creates a new Entry with data provided on request body
// Verifies if there is a valid period.
// If there's not, creates it before creating the Entry
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')

  const {
    description,
    dueDate,
    entryType,
    paid,
    value,
    periodName,
    userId,
    client, // optional
    clientId, // optional
    payMethod, // optional
  } = await req.json()

  let verifiedPeriod = await prisma.period.findUnique({
    where: {
      name: periodName,
    },
  })

  if (!verifiedPeriod) {
    verifiedPeriod = await prisma.period.create({
      data: {
        name: periodName,
      },
    })
  }

  try {
    const newEntry = await prisma.entry.create({
      data: {
        description,
        dueDate,
        entryType,
        paid,
        value,
        periodName: verifiedPeriod.name,
        userId,
        client: client || undefined,
        clientId: clientId || undefined,
        payMethod: payMethod || undefined,
      },
    })

    return NextResponse.json(newEntry, {
      status: 201,
      statusText: 'Created',
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Content-type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(error, {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
      },
    })
  }
}
