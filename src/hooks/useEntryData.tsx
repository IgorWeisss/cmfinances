'use client'

import { ExpenseEntry } from '@/components/ExpenseEntry'
import { IncomeEntry } from '@/components/IncomeEntry'
import { EntrysContext } from '@/contexts/EntrysContext'
import { getPeriodData } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { FileX, Frown, Loader2 } from 'lucide-react'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

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

interface useEntryDataTypes {
  formattedTotalValue: string
  paidStateFilter: string
  setPaidStateFilter: Dispatch<SetStateAction<string>>
  EntryContent: () => ReactNode
}

export function useEntryData(type: 'IN' | 'OUT'): useEntryDataTypes {
  const [paidStateFilter, setPaidStateFilter] = useState('all')
  const [isSelected, setIsSelected] = useState<null | number>(null)
  const { state } = useContext(EntrysContext)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['periodData', state.period],
    queryFn: () => getPeriodData(state.period),
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
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center text-gray-500">
          <Loader2 size={60} className="animate-spin" />
        </div>
      )
    }

    if (isError) {
      return (
        <div className="flex flex-col h-full items-center justify-center p-10 text-gray-500">
          <Frown size={60} className="" />
          <p className="text-4xl font-bold mt-6">Opa...</p>
          <p className="text-lg mt-2 font-bold text-center">
            Deu ruim na hora de buscar os dados do servidor...
          </p>
        </div>
      )
    }

    if (filteredData === null) {
      return (
        <div className="flex flex-col h-full items-center justify-center p-10 text-gray-500">
          <FileX size={60} className="" />
          <p className="text-4xl font-bold mt-6">Ops...</p>
          <p className="text-lg mt-2 font-bold">Não tem nada aqui ainda...</p>
        </div>
      )
    }

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
    formattedTotalValue,
    paidStateFilter,
    setPaidStateFilter,
    EntryContent,
  }
}
