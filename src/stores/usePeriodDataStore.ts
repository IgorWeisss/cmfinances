import { create } from 'zustand'

interface Store {
  yearsList: string[]
  yearIndex: number
  year: string
  monthIndex: number
  month: string
  period: string
  setYearsList: (yearsList: string[]) => void
  setMonth: (month: string) => void
  setYear: ({ yearIndex, year }: { yearIndex: number; year: string }) => void
}

const initialYear = String(new Date().getFullYear())

const initialMonthIndex = new Date().getMonth()

const initialMonth = String(initialMonthIndex + 1).padStart(2, '0')

export const usePeriodDataStore = create<Store>()((set) => ({
  yearsList: [],
  yearIndex: 0,
  year: initialYear,
  monthIndex: initialMonthIndex,
  month: initialMonth,
  period: `${initialMonth}-${initialYear}`,

  setYearsList: (yearsList) => {
    const indexOfActualYear = yearsList.indexOf(
      new Date().getFullYear().toString(),
    )

    const yearIndex =
      indexOfActualYear === -1 ? yearsList.length - 1 : indexOfActualYear
    set((state) => ({ ...state, yearsList, yearIndex }))
  },

  setMonth: (month) => {
    set((state) => ({
      ...state,
      monthIndex: Number(month) - 1,
      month,
      period: `${month}-${state.year}`,
    }))
  },

  setYear: ({ yearIndex, year }) => {
    set((state) => ({
      ...state,
      yearIndex,
      year,
      period: `${state.month}-${year}`,
    }))
  },
}))
