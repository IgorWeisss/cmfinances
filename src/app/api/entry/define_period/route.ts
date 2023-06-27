import { prisma } from '@/lib/prisma'
import { Entry } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

async function resolvePeriod(entry: Entry) {
  const { dueDate, id } = entry
  const day = dueDate.getDate()
  const month = dueDate.getMonth() + 1
  const year = dueDate.getFullYear()
  const period =
    day < 6
      ? `${(month - 1).toString().padStart(2, '0')}-${year}`
      : `${month.toString().padStart(2, '0')}-${year}`

  const hasPeriod = await prisma.period.findFirst({
    where: {
      name: period,
    },
  })

  let periodName = hasPeriod?.name

  if (!hasPeriod) {
    const newPeriod = await prisma.period.create({
      data: {
        name: period,
      },
    })
    periodName = newPeriod.name
  }

  try {
    await prisma.entry.update({
      where: {
        id,
      },
      data: {
        periodName,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get('origin')

  try {
    const entries = await prisma.entry.findMany({
      take: 50,
      skip: 550,
      orderBy: {
        createdAt: 'desc',
      },
    })

    entries.forEach(async (entry, index) => {
      await resolvePeriod(entry)
      console.log(`${index + 1} de ${entries.length}`)
    })

    await prisma.$disconnect()
    console.log('OK')

    return NextResponse.json('OK', {
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
