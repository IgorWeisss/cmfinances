'use client'

import { useState } from 'react'

import { usePeriodDataStore } from '@/stores/usePeriodDataStore'
import { EntryData, useFetchPeriodData } from '@/queries/useFetchPeriodData'

export function useEntryBoxData(variant: 'IN' | 'OUT') {
  // TODO: Rearrange states in a new Zustand Store
  // TODO: Extract filteredData to somewhere else to avoid prop drilling

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

  const [paidStateFilter, setPaidStateFilter] = useState('all')

  const period = usePeriodDataStore((state) => state.period)

  const { data, isLoading, isError } = useFetchPeriodData(period)

  if (isLoading) {
    return { isLoading }
  }

  if (isError) {
    return { isError }
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

  let color = variant === 'IN' ? 'text-green-500' : 'text-red-500'

  if (formattedTotalValue === '---') color = 'text-gray-600'

  return {
    title: variant === 'IN' ? 'Entradas' : 'Saídas',
    color,
    formattedTotalValue,
    paidStateFilter,
    filteredData,
    setPaidStateFilter,
  }
}
