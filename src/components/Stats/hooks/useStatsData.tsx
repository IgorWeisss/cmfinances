'use client'

import { EntryData } from '@/components/Entries/hooks/useEntryBoxData'
import { getPeriodData } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'
import { usePeriodDataStore } from '@/stores/usePeriodDataStore'

interface DataReturnType {
  id: string
  name: string
  _count: {
    entries: number
  }
  entries: EntryData[]
}

function formatValueToCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function getTotalIncome(data: DataReturnType | null) {
  if (!data)
    return {
      title: 'Total de entradas:',
      value: 0,
      color: 'text-gray-100',
    }

  const filteredEntries = data.entries.filter(
    (entry) => entry.entryType === 'IN',
  )

  const reducedValue = filteredEntries.reduce((acc, cur) => {
    return acc + Number(cur.value)
  }, 0)

  const color = reducedValue === 0 ? 'text-gray-100' : 'text-green-500'

  return {
    title: 'Total de entradas:',
    value: reducedValue,
    color,
  }
}

function getTotalExpenses(data: DataReturnType | null) {
  if (!data)
    return {
      title: 'Total de saídas:',
      value: 0,
      color: 'text-gray-100',
    }

  const filteredEntries = data.entries.filter(
    (entry) => entry.entryType === 'OUT',
  )

  const reducedValue = filteredEntries.reduce((acc, cur) => {
    return acc + Number(cur.value)
  }, 0)

  const color = reducedValue === 0 ? 'text-gray-100' : 'text-red-500'

  return {
    title: 'Total de saídas:',
    value: reducedValue,
    color,
  }
}

interface getTotalProfitProps {
  title: string
  value: number
  color: string
}

function getTotalProfit(
  totalIncome: getTotalProfitProps,
  totalExpenses: getTotalProfitProps,
) {
  const totalProfit = totalIncome.value - totalExpenses.value

  let color

  switch (true) {
    case totalProfit === 0:
      color = 'text-gray-100'
      break
    case totalProfit < 0:
      color = 'text-red-500'
      break
    default:
      color = 'text-green-500'
  }

  return {
    title: 'Lucro / Prejuízo do mês:',
    value: totalProfit,
    color,
  }
}

// TODO Desenvolver esse método

function getLastYearAccumulatedIncome(data: DataReturnType | null) {
  return {
    title: 'Receita acumulada nos 12 últimos meses:',
    value: 0,
    color: 'text-gray-100',
  }
}

function getAvailableMoney(data: DataReturnType | null) {
  if (!data)
    return {
      title: 'Dinheiro disponível na conta:',
      value: 0,
      color: 'text-gray-100',
    }

  const filteredPaidIncome = data.entries.filter(
    (entry) => entry.entryType === 'IN' && entry.paid,
  )

  const reducedPaidIncome = filteredPaidIncome.reduce((acc, cur) => {
    return acc + Number(cur.value)
  }, 0)

  const filteredPaidExpenses = data.entries.filter(
    (entry) => entry.entryType === 'OUT' && entry.paid,
  )

  const reducedPaidExpenses = filteredPaidExpenses.reduce((acc, cur) => {
    return acc + Number(cur.value)
  }, 0)

  const availableMoney = reducedPaidIncome - reducedPaidExpenses

  let color

  switch (true) {
    case availableMoney === 0:
      color = 'text-gray-100'
      break
    case availableMoney < 0:
      color = 'text-red-500'
      break
    default:
      color = 'text-green-500'
  }

  return {
    title: 'Dinheiro disponível na conta:',
    value: availableMoney,
    color,
  }
}

export function useStatsData() {
  const period = usePeriodDataStore((state) => state.period)

  const { data, isLoading, isError } = useQuery<DataReturnType | null>({
    queryKey: ['periodData', period],
    queryFn: () => getPeriodData(period),
  })

  if (isLoading) {
    return { isLoading }
  }

  if (isError) {
    return { isError }
  }

  const totalIncome = getTotalIncome(data)
  const totalExpenses = getTotalExpenses(data)
  const totalProfit = getTotalProfit(totalIncome, totalExpenses)
  const lastYearAccumulatedIncome = getLastYearAccumulatedIncome(data)
  const availableMoney = getAvailableMoney(data)

  const rawData = [
    totalIncome,
    totalExpenses,
    totalProfit,
    lastYearAccumulatedIncome,
    availableMoney,
  ]

  const formatedData = rawData.map((stat) => {
    const formatedValue =
      stat.value !== 0 ? formatValueToCurrency(stat.value) : '---'
    return { ...stat, value: formatedValue }
  })

  return {
    formatedData,
  }
}
