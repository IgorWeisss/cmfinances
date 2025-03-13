import { prisma } from '@/services/prisma'
import { addDays, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { NextRequest, NextResponse } from 'next/server'

// Deletes periods without entries (runs on PUT and DELETE requests)
async function deleteEmptyPeriods() {
  try {
    await prisma.period.deleteMany({
      where: {
        entries: {
          none: {},
        },
      },
    })
  } catch (error) {
    console.error(error)
  }
}

// Generates a periodName (MM-YYYY) based on a dueDate
// If it's a card payment, extends to the next period.
function generatePeriodName(dueDate: Date) {
  const day = dueDate.getDate()
  const periodName =
    day < 6
      ? format(subMonths(dueDate, 1), "MM'-'yyyy", { locale: ptBR })
      : format(dueDate, "MM'-'yyyy", { locale: ptBR })

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

  const periodName =
    payMethod && payMethod.startsWith('Cartão')
      ? generatePeriodName(addDays(new Date(dueDate), 14))
      : generatePeriodName(new Date(dueDate))

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

  const { dueDate, payMethod } = entryProperties

  if (dueDate) {
    entryProperties.periodName =
      payMethod && payMethod.startsWith('Cartão')
        ? generatePeriodName(addDays(new Date(dueDate), 14))
        : generatePeriodName(new Date(dueDate))
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

    deleteEmptyPeriods()

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

      deleteEmptyPeriods()

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
