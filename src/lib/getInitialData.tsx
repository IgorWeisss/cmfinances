import { prisma } from './prisma'

export async function getInitialData() {
  const actualMonth = (new Date().getMonth() + 1).toString().padStart(2, '0')
  const actualYear = new Date().getFullYear().toString()
  const period = `${actualMonth}-${actualYear}`

  const periodData = await prisma.period.findUnique({
    where: {
      name: period,
    },
    include: {
      _count: true,
      entries: true,
    },
  })

  const initialData = JSON.stringify(periodData)

  return initialData
}
