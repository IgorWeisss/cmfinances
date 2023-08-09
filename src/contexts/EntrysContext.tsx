'use client'
import { ReactNode, createContext, useState } from 'react'

interface EntrysContextType {
  year: string
  yearsList: string[]
  setYear: (year: string) => void
  month: string
  setMonth: (month: string) => void
  period: string
}

interface EntryProviderProps {
  children: ReactNode
  yearsList: string[]
}

export const EntrysContext = createContext({} as EntrysContextType)

export function EntryProvider({ children, yearsList }: EntryProviderProps) {
  const [year, setYearState] = useState('')
  const [month, setMonthState] = useState('')
  const period = `${month}-${year}`

  function setYear(year: string) {
    setYearState(year)
  }

  function setMonth(month: string) {
    setMonthState(month)
  }

  return (
    <EntrysContext.Provider
      value={{ year, setYear, month, setMonth, yearsList, period }}
    >
      {children}
    </EntrysContext.Provider>
  )
}
