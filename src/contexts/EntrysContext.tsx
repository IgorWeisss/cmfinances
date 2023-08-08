'use client'
import { ReactNode, createContext, useState } from 'react'

interface EntrysContextType {
  year: string
  yearsList: string[]
  setYear: (year: string) => void
  month: string
  setMonth: (month: string) => void
  initialData: string
}

interface EntryProviderProps {
  children: ReactNode
  yearsList: string[]
  initialData: string
}

export const EntrysContext = createContext({} as EntrysContextType)

export function EntryProvider({
  children,
  yearsList,
  initialData,
}: EntryProviderProps) {
  const [year, setYearState] = useState('')
  const [month, setMonthState] = useState('')

  function setYear(year: string) {
    setYearState(year)
  }

  function setMonth(month: string) {
    setMonthState(month)
  }

  return (
    <EntrysContext.Provider
      value={{ year, setYear, month, setMonth, yearsList, initialData }}
    >
      {children}
    </EntrysContext.Provider>
  )
}
