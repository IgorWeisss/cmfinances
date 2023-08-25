import { prisma } from './prisma'

export async function getYearsListFromServer() {
  const periods = await prisma.period.findMany({
    select: {
      name: true,
    },
  })
  return periods
    .reduce<string[]>((acc, cur) => {
      const year = cur.name.slice(3)
      if (acc.indexOf(year) === -1) {
        acc.push(year)
      }
      return acc
    }, [])
    .sort()
}
