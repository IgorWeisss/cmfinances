'use client'
import { useContext, useState } from 'react'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { FileX, Plus } from 'lucide-react'

import { IncomeEntry } from './IncomeEntry'
import { ExpenseEntry } from './ExpenseEntry'
import { EntrysContext } from '@/contexts/EntrysContext'
import { useEntryData } from '@/hooks/useEntryData'

const toggleGroupItemClasses = `data-[state=on]:bg-gradient-to-b data-[state=on]:from-orange-500
  data-[state=on]:to-orange-600 data-[state=on]:text-gray-100 rounded-[1.25rem]
  text-sm px-8 py-3 text-gray-600 hover:shadow-filter-box transition-all`

const EntryBoxVariants = {
  IN: {
    title: 'Entradas',
    color: 'text-green-500',
  },
  OUT: {
    title: 'Saídas',
    color: 'text-red-500',
  },
}

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

interface EntryBoxProps {
  type: 'IN' | 'OUT'
}

export function EntryBox({ type }: EntryBoxProps) {
  const [paidStateFilter, setPaidStateFilter] = useState('all')
  const [isSelected, setIsSelected] = useState<null | number>(null)
  const { initialData } = useContext(EntrysContext)

  const { filteredData, formattedTotalValue } = useEntryData({
    initialData,
    type,
    filter: paidStateFilter,
  })

  const variantProps = EntryBoxVariants[type]

  return (
    <div
      className="relative bg-gradient-to-b from-blue-800 to-blue-900 h-full w-full
      rounded-[1.25rem] overflow-hidden shadow-entry-box"
    >
      <header className="flex flex-col bg-gray-100 relative rounded-[1.25rem]">
        <h2 className="p-4 text-gray-600 font-bold text-xl">
          {variantProps.title}
        </h2>
        <button
          className="w-10 h-10 bg-gradient-to-b from-orange-500 to-orange-600
          hover:brightness-125 transition-all absolute right-0 top-0
          rounded-bl-[1.25rem] text-gray-100 flex items-center justify-center"
        >
          <Plus size={20} />
        </button>
        <ToggleGroup.Root
          type="single"
          value={paidStateFilter}
          onValueChange={(value) => {
            if (value) setPaidStateFilter(value)
          }}
          className="rounded-[1.25rem] shadow-filter-box flex justify-between"
        >
          <ToggleGroup.Item className={toggleGroupItemClasses} value="all">
            Todas
          </ToggleGroup.Item>
          <ToggleGroup.Item className={toggleGroupItemClasses} value="paid">
            Quitadas
          </ToggleGroup.Item>
          <ToggleGroup.Item className={toggleGroupItemClasses} value="unpaid">
            Em aberto
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </header>
      <div className="flex flex-col h-box-content overflow-y-auto overscroll-contain box-scroll">
        {filteredData === null ? (
          <div className="flex flex-col h-full items-center justify-center p-10 text-gray-500">
            <FileX size={60} className="" />
            <p className="text-4xl font-bold mt-6">Ops...</p>
            <p className="text-lg mt-2 font-bold">Não tem nada aqui ainda...</p>
          </div>
        ) : (
          (type === 'IN' &&
            filteredData.map((entry, index) => (
              <IncomeEntry
                isSelected={isSelected === index}
                handleSelectItem={() => setIsSelected(index)}
                entryData={entry}
                key={entry.id}
              />
            ))) ||
          (type === 'OUT' &&
            filteredData.map((entry, index) => (
              <ExpenseEntry
                isSelected={isSelected === index}
                handleSelectItem={() => setIsSelected(index)}
                entryData={entry}
                key={entry.id}
              />
            )))
        )}
      </div>
      <footer className="flex flex-col items-center justify-center py-2 gap-2 bg-gray-100 absolute bottom-0 w-full">
        <span className="text-gray-600 text-base leading-none">Total:</span>
        <span
          className={` font-bold text-2xl leading-none ${variantProps.color}`}
        >
          {formattedTotalValue}
        </span>
      </footer>
    </div>
  )
}
