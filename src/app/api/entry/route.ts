import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Generates a periodName (MM-YYYY) based on a dueDate (string typed Date)
function generatePeriodName(dueDateString: string) {
  const dueDate = new Date(dueDateString)
  const day = dueDate.getDate()
  const month = dueDate.getMonth() + 1
  const year = dueDate.getFullYear()
  const periodName =
    day < 6
      ? `${(month - 1).toString().padStart(2, '0')}-${year}`
      : `${month.toString().padStart(2, '0')}-${year}`
  return periodName
}

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
// Takes dueDate and generates periodName based on it
// Verifies if there is a valid period in the db.
// If there's not, creates it before creating the Entry
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')

  const {
    description,
    dueDate,
    entryType,
    paid,
    value,
    userId,
    client, // optional
    clientId, // optional
    payMethod, // optional
  } = await req.json()

  const periodName = generatePeriodName(dueDate)

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

// Updates an Entry with data provided on request body
// If dueDate is provided, generates periodName and checks db for existing valid period
// If there's no such period, creates it before updating the Entry
export async function PUT(req: NextRequest) {
  const origin = req.headers.get('origin')

  const { id, ...entryProperties } = await req.json()

  const { dueDate } = entryProperties

  if (dueDate) {
    entryProperties.periodName = generatePeriodName(dueDate)
    let verifiedPeriod = await prisma.period.findUnique({
      where: {
        name: entryProperties.periodName,
      },
    })

    if (!verifiedPeriod) {
      verifiedPeriod = await prisma.period.create({
        data: {
          name: entryProperties.periodName,
        },
      })
    }
  }

  try {
    const updatedEntry = await prisma.entry.update({
      where: {
        id,
      },
      data: {
        ...entryProperties,
      },
    })

    return NextResponse.json(updatedEntry, {
      status: 200,
      statusText: 'Entry updated',
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

// Deletes an Entry with id provided on id param in the url
export async function DELETE(req: NextRequest) {
  const origin = req.headers.get('origin')

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  try {
    if (id) {
      const deletedEntry = await prisma.entry.delete({
        where: {
          id,
        },
      })

      return NextResponse.json(deletedEntry, {
        status: 200,
        statusText: 'Entry deleted',
        headers: {
          'Access-Control-Allow-Origin': origin || '*',
          'Content-type': 'application/json',
        },
      })
    }
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
