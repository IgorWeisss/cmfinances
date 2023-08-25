'use client'

import { useState } from 'react'
import { getPeriodData } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'

import { usePeriodDataStore } from '@/stores/usePeriodDataStore'

export interface EntryData {
  id: string
  createdAt: string
  updatedAt: string
  dueDate: string
  description: string
  client: string | null
  clientId: string | null
  value: string
  payMethod: string | null
  paid: boolean
  entryType: string
  userId: string
  periodName: string
}

export function useEntryBoxData(variant: 'IN' | 'OUT') {
  const [paidStateFilter, setPaidStateFilter] = useState('all')

  const title = variant === 'IN' ? 'Entradas' : 'Saídas'
  let color = variant === 'IN' ? 'text-green-500' : 'text-red-500'

  const period = usePeriodDataStore((state) => state.period)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['periodData', period],
    queryFn: () => getPeriodData(period),
  })

  if (isLoading) {
    return { isLoading }
  }

  if (isError) {
    return { isError }
  }

  function applyFilters(data: EntryData[]): EntryData[] | null {
    const filteredDataByEntryType = data.filter(
      (entry) => entry.entryType === variant,
    )

    if (paidStateFilter !== 'all') {
      const filterValue = paidStateFilter === 'paid'
      const filteredDataByPaidState = filteredDataByEntryType.filter(
        (entry) => entry.paid === filterValue,
      )
      return filteredDataByPaidState.length > 0 ? filteredDataByPaidState : null
    }
    return filteredDataByEntryType.length > 0 ? filteredDataByEntryType : null
  }

  const filteredData: EntryData[] | null = !data
    ? null
    : applyFilters(data.entries)

  const totalValue =
    filteredData === null
      ? 0
      : filteredData.reduce((acc, cur) => acc + Number(cur.value), 0)

  const formattedTotalValue =
    totalValue === 0
      ? '---'
      : new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(totalValue)

  if (formattedTotalValue === '---') color = 'text-gray-600'

  return {
    title,
    color,
    formattedTotalValue,
    paidStateFilter,
    filteredData,
    setPaidStateFilter,
  }
}
