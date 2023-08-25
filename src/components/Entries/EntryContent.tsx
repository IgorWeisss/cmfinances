'use client'

import { FileX } from 'lucide-react'
import { useState } from 'react'
import { IncomeEntry } from './IncomeEntry'
import { ExpenseEntry } from './ExpenseEntry'
import { EntryData } from './hooks/useEntryBoxData'

interface EntryContentProps {
  filteredData: EntryData[] | null
  variant: 'IN' | 'OUT'
}

export function EntryContent({ filteredData, variant }: EntryContentProps) {
  const [isSelected, setIsSelected] = useState<null | number>(null)

  if (filteredData === null)
    return (
      <div className="flex flex-col h-full items-center justify-center p-10 text-gray-500">
        <FileX size={60} className="" />
        <p className="text-4xl font-bold mt-6">Ops...</p>
        <p className="text-lg mt-2 font-bold">Não tem nada aqui ainda...</p>
      </div>
    )

  const EntryVariant = variant === 'IN' ? IncomeEntry : ExpenseEntry

  return filteredData.map((entry, index) => (
    <EntryVariant
      isSelected={isSelected === index}
      handleSelectItem={() => setIsSelected(index)}
      entryData={entry}
      key={entry.id}
    />
  ))
}
