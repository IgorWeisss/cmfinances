import { EntryData } from '@/components/EntryBox'

function filterDataByEntryType(data: string, type: string) {
  const parsedData: EntryData[] = JSON.parse(data).entries
  const filteredData = parsedData.filter((entry) => entry.entryType === type)
  return filteredData.length > 0 ? filteredData : null
}

function filterDataByPaidState(data: EntryData[], filter: string) {
  switch (filter) {
    case 'paid': {
      const filteredData = data.filter((entry) => entry.paid === true)
      return filteredData.length > 0 ? filteredData : null
    }

    case 'unpaid': {
      const filteredData = data.filter((entry) => entry.paid === false)
      return filteredData.length > 0 ? filteredData : null
    }

    default:
      return data
  }
}

interface useEntryDataProps {
  initialData: string
  type: 'IN' | 'OUT'
  filter: string
}

export function useEntryData({ initialData, type, filter }: useEntryDataProps) {
  const entries = JSON.parse(initialData)
  if (entries === null) {
    return {
      filteredData: null,
      formattedTotalValue: 'R$ 0,00',
    }
  }

  const filteredDataByEntryType = filterDataByEntryType(initialData, type)
  if (filteredDataByEntryType === null) {
    return {
      filteredData: null,
      formattedTotalValue: 'R$ 0,00',
    }
  }
  const filteredDataByPaidState = filterDataByPaidState(
    filteredDataByEntryType,
    filter,
  )
  if (filteredDataByPaidState === null) {
    return {
      filteredData: null,
      formattedTotalValue: 'R$ 0,00',
    }
  }

  const totalValue = filteredDataByPaidState.reduce(
    (acc, cur) => acc + Number(cur.value),
    0,
  )

  const formattedTotalValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalValue)

  return {
    filteredData: filteredDataByPaidState,
    formattedTotalValue,
  }
}
