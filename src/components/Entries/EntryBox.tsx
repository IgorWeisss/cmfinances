'use client'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { AlertTriangle, Frown, Loader2, Plus } from 'lucide-react'

import { useEntryBoxData } from './hooks/useEntryBoxData'
import { EntryContent } from './EntryContent'
import { useEntryDialogStore } from '@/stores/useEntryDialogStore'
import { NewIncomeEntryDialog } from './NewIncomeEntryDialog'

const toggleGroupItemClasses = `data-[state=on]:bg-gradient-to-b data-[state=on]:from-orange-500
  data-[state=on]:to-orange-600 data-[state=on]:text-gray-100 rounded-[1.25rem]
  text-sm px-8 py-3 text-gray-600 hover:shadow-filter-box transition-all`

interface ExtryBoxProps {
  variant: 'IN' | 'OUT'
}

export function EntryBox({ variant }: ExtryBoxProps) {
  const {
    title,
    color,
    formattedTotalValue,
    paidStateFilter,
    isLoading,
    isError,
    filteredData,
    setPaidStateFilter,
  } = useEntryBoxData(variant)

  const setOpenState = useEntryDialogStore(
    (state) => state.setNewEntryOpenState,
  )

  if (isLoading) {
    return (
      <div
        className="relative bg-gradient-to-b from-blue-800 to-blue-900 h-full w-full
      rounded-[1.25rem] overflow-hidden shadow-entry-box"
      >
        <header className="flex flex-col bg-gray-100 absolute top-0 w-full rounded-[1.25rem]">
          <h2 className="p-4 text-gray-600 font-bold text-xl">Carregando...</h2>
          <div className="rounded-[1.25rem] shadow-filter-box flex justify-between">
            <div className={toggleGroupItemClasses}>Todas</div>
            <div className={toggleGroupItemClasses}>Quitadas</div>
            <div className={toggleGroupItemClasses}>Em aberto</div>
          </div>
        </header>
        <div className="flex h-full items-center justify-center text-gray-500">
          <Loader2 size={60} className="animate-spin" />
        </div>
        <footer className="flex flex-col items-center justify-center py-2 gap-2 bg-gray-100 absolute bottom-0 w-full">
          <span className="text-gray-600 text-base leading-none">Total:</span>
          <span className={` font-bold text-2xl leading-none text-gray-600`}>
            ---
          </span>
        </footer>
      </div>
    )
  }

  if (isError) {
    if (variant === 'IN')
      return (
        <div
          className="relative bg-gradient-to-b from-blue-800 to-blue-900 h-full w-full
      rounded-[1.25rem] overflow-hidden shadow-entry-box"
        >
          <div className="flex flex-col h-full items-center justify-center p-10 text-gray-500">
            <AlertTriangle size={60} className="" />
            <p className="text-4xl font-bold mt-6">Opa...</p>
            <p className="text-lg mt-2 font-bold text-center">
              Deu ruim na hora de buscar os dados do servidor...
            </p>
          </div>
        </div>
      )

    return (
      <div
        className="relative bg-gradient-to-b from-blue-800 to-blue-900 h-full w-full
      rounded-[1.25rem] overflow-hidden shadow-entry-box"
      >
        <div className="flex flex-col h-full items-center justify-center p-10 text-gray-500">
          <Frown size={60} className="" />
          <p className="text-4xl font-bold mt-6">Sinto muito...</p>
          <p className="text-lg mt-2 font-bold text-center">
            Isso é muito chato...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative bg-gradient-to-b from-blue-800 to-blue-900 h-full w-full
      rounded-[1.25rem] overflow-hidden shadow-entry-box"
    >
      {variant === 'IN' ? <NewIncomeEntryDialog /> : null}
      <header className="flex flex-col bg-gray-100 relative rounded-[1.25rem]">
        <h2 className="p-4 text-gray-600 font-bold text-xl">{title}</h2>
        <button
          className="w-10 h-10 bg-gradient-to-b from-orange-500 to-orange-600
          hover:brightness-125 transition-all absolute right-0 top-0
          rounded-bl-[1.25rem] text-gray-100 flex items-center justify-center"
          onClick={() => {
            setOpenState(true)
          }}
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
        <EntryContent filteredData={filteredData} variant={variant} />
      </div>
      <footer className="flex flex-col items-center justify-center py-2 gap-2 bg-gray-100 absolute bottom-0 w-full">
        <span className="text-gray-600 text-base leading-none">Total:</span>
        <span className={` font-bold text-2xl leading-none ${color}`}>
          {formattedTotalValue}
        </span>
      </footer>
    </div>
  )
}
