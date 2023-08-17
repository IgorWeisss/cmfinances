'use client'

import React, { useContext, useState } from 'react'
import { getPeriodData } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

import { PeriodsContext } from '@/contexts/PeriodsContext'

import {
  EmptyEntries,
  ErrorEntries,
  LoadingEntries,
} from '../EntryAlternateStates'
import { IncomeEntry } from '../IncomeEntry'
import { ExpenseEntry } from '../ExpenseEntry'

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

export function useEntryBoxData(type: 'IN' | 'OUT') {
  const [paidStateFilter, setPaidStateFilter] = useState('all')
  const [isSelected, setIsSelected] = useState<null | number>(null)

  const title = type === 'IN' ? 'Entradas' : 'Saídas'
  const color = type === 'IN' ? 'text-green-500' : 'text-red-500'

  const {
    contextState: { period },
  } = useContext(PeriodsContext)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['periodData', period],
    queryFn: () => getPeriodData(period),
  })

  function applyFilters(data: EntryData[]): EntryData[] | null {
    const filteredDataByEntryType = data.filter(
      (entry) => entry.entryType === type,
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

  const formattedTotalValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalValue)

  function EntryContent() {
    if (isLoading) return <LoadingEntries />

    if (isError) return <ErrorEntries />

    if (filteredData === null) return <EmptyEntries />

    const EntryVariant = type === 'IN' ? IncomeEntry : ExpenseEntry

    return filteredData.map((entry, index) => (
      <EntryVariant
        isSelected={isSelected === index}
        handleSelectItem={() => setIsSelected(index)}
        entryData={entry}
        key={entry.id}
      />
    ))
  }

  return {
    title,
    color,
    formattedTotalValue,
    paidStateFilter,
    setPaidStateFilter,
    EntryContent,
  }
}
