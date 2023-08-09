'use client'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Plus } from 'lucide-react'

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

interface EntryBoxProps {
  type: 'IN' | 'OUT'
}

export function EntryBox({ type }: EntryBoxProps) {
  const {
    formattedTotalValue,
    paidStateFilter,
    setPaidStateFilter,
    EntryContent,
  } = useEntryData(type)

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
        <EntryContent />
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
