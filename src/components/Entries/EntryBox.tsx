'use client'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { ChevronDown, Frown, Loader2, Plus } from 'lucide-react'

import { useState } from 'react'
import { EntryContent } from './EntryContent'
import { NewExpensesEntryDialog } from './NewExpensesEntryDialog'
import { NewIncomeEntryDialog } from './NewIncomeEntryDialog'
import { useEntryBoxData } from './hooks/useEntryBoxData'

const toggleGroupItemClasses = `data-[state=on]:bg-gradient-to-b data-[state=on]:from-orange-500
  data-[state=on]:to-orange-600 data-[state=on]:text-gray-100 rounded-[1.25rem]
  text-sm px-8 py-3 text-gray-600 hover:shadow-filter-box transition-all`

interface ExtryBoxProps {
  variant: 'IN' | 'OUT'
}

export function EntryBox({ variant }: ExtryBoxProps) {
  const [accordionState, setAccordionState] = useState<boolean | string>(false)
  const {
    title,
    color,
    formattedTotalValue,
    paidStateFilter,
    isLoading,
    isError,
    filteredData,
    setPaidStateFilter,
    setDialogOpenState,
  } = useEntryBoxData(variant)
  const anchorHref =
    accordionState === 'animateUp' || accordionState === true
      ? `#`
      : `#${title}`

  if (isLoading) {
    return (
      <div
        data-accordion={accordionState}
        className="group relative bg-gradient-to-b from-blue-800 h-fit to-blue-900 w-full
      rounded-[1.25rem] shadow-entry-box"
      >
        <header className="flex flex-col bg-gray-100 relative rounded-t-[1.25rem] group-data-[accordion=true]:rounded-[1.25rem] lg:rounded-[1.25rem]">
          <h2 className="p-4 text-gray-600 font-bold text-xl">Caregando...</h2>
          <div className="rounded-[1.25rem] shadow-filter-box flex justify-between">
            <div className={toggleGroupItemClasses}>Todas</div>
            <div className={toggleGroupItemClasses}>Quitadas</div>
            <div className={toggleGroupItemClasses}>Em aberto</div>
          </div>
        </header>
        <div
          className="hidden group-data-[accordion=true]:flex group-data-[accordion=true]:h-box-content
        lg:flex lg:h-box-content items-center justify-center text-gray-500"
        >
          <Loader2 size={60} className="animate-spin" />
        </div>
        <footer className="flex flex-col items-center justify-center py-2 gap-2 rounded-b-[1.25rem] bg-gray-100 w-full">
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
          className="relative bg-gradient-to-b from-blue-800 to-blue-900 h-container w-full
      rounded-[1.25rem] shadow-entry-box"
        >
          <div className="flex flex-col h-full items-center justify-center p-10 text-gray-500">
            <Frown size={60} className="" />
            <p className="text-4xl font-bold mt-6">Vish...</p>
            <p className="text-lg mt-2 font-bold text-center">
              Deu ruim na hora de buscar os dados do servidor...
            </p>
          </div>
        </div>
      )

    return <></>
  }

  return (
    <div
      data-accordion={accordionState}
      className="group relative bg-gradient-to-b from-blue-800 h-fit to-blue-900 w-full
      rounded-[1.25rem] shadow-entry-box"
    >
      <div id={title} className="absolute -top-[8.5rem]"></div>
      {variant === 'IN' ? <NewIncomeEntryDialog /> : <NewExpensesEntryDialog />}
      <header
        className="flex flex-col bg-gray-100 relative lg:group-data-[accordion=animateUp]:animate-none 
        lg:group-data-[accordion=animateDown]:animate-none group-data-[accordion=false]:rounded-t-[1.25rem] group-data-[accordion=true]:rounded-[1.25rem] lg:rounded-[1.25rem]
        group-data-[accordion=animateDown]:animate-accordion-round group-data-[accordion=animateUp]:animate-accordion-sharp"
      >
        <h2 className="p-4 text-gray-600 font-bold text-xl">{title}</h2>
        <button
          className="absolute w-10 h-10 bg-gradient-to-b from-orange-500 to-orange-600
          hover:brightness-125 transition-all right-0 top-0
          rounded-bl-[1.25rem] rounded-tr-[1.25rem] text-gray-100 flex items-center justify-center z-40"
          onClick={() => {
            setDialogOpenState(true)
          }}
        >
          <Plus size={20} />
        </button>
        <div className="absolute inset-0 p-4 w-full h-fit flex items-center justify-center lg:hidden">
          <a
            href={anchorHref}
            className="outline-none flex items-center text-gray-600 justify-center hover:brightness-125 transition-all"
            onClick={() => {
              setAccordionState((state) => {
                if (state) {
                  setTimeout(() => {
                    setAccordionState(false)
                  }, 200)
                  return 'animateUp'
                } else {
                  setTimeout(() => {
                    setAccordionState(true)
                  }, 200)
                  return 'animateDown'
                }
              })
            }}
          >
            <ChevronDown
              className="transition-transform duration-200 group-data-[accordion=animateDown]:rotate-180 group-data-[accordion=true]:rotate-180"
              size={20}
            />
          </a>
        </div>
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
      <div
        className="flex-col flex group-data-[accordion=false]:h-0 group-data-[accordion=true]:h-box-content lg:group-data-[accordion=animateDown]:animate-none lg:group-data-[accordion=animateUp]:animate-none lg:group-data-[accordion=true]:h-box-content lg:group-data-[accordion=false]:h-box-content
        group-data-[accordion=animateDown]:animate-accordion-down group-data-[accordion=animateUp]:animate-accordion-up
        overflow-y-auto overscroll-contain box-scroll"
      >
        <EntryContent filteredData={filteredData} variant={variant} />
      </div>
      <footer className="flex flex-col items-center justify-center py-2 gap-2 rounded-b-[1.25rem] bg-gray-100 w-full">
        <span className="text-gray-600 text-base leading-none">Total:</span>
        <span className={` font-bold text-2xl leading-none ${color}`}>
          {formattedTotalValue}
        </span>
      </footer>
    </div>
  )
}
