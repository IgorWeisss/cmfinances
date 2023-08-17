'use client'
import { Dispatch, ReactNode, createContext, useReducer } from 'react'

interface PeriodProviderProps {
  children: ReactNode
  yearsList: string[]
}

interface StateProps {
  yearIndex: number
  year: string
  monthIndex: number
  month: string
  period: string
}

interface SetYearAction {
  type: 'SET_YEAR'
  payload: {
    yearIndex: number
    year: string
  }
}

interface SetMonthAction {
  type: 'SET_MONTH'
  payload: string
}

type ActionProps = SetYearAction | SetMonthAction

const reducer = (state: StateProps, action: ActionProps): StateProps => {
  const { type, payload } = action
  switch (type) {
    case 'SET_MONTH':
      return {
        ...state,
        monthIndex: Number(payload) - 1,
        month: payload,
        period: `${payload}-${state.year}`,
      }
    case 'SET_YEAR':
      return {
        ...state,
        yearIndex: payload.yearIndex,
        year: payload.year,
        period: `${state.month}-${payload.year}`,
      }
    default:
      return state
  }
}

interface PeriodsContextType {
  contextState: StateProps
  contextDispatch: Dispatch<ActionProps>
  yearsList: string[]
}

export const PeriodsContext = createContext({} as PeriodsContextType)

export function PeriodProvider({ children, yearsList }: PeriodProviderProps) {
  const indexOfActualYear = yearsList.indexOf(
    new Date().getFullYear().toString(),
  )

  const initialYearIndex =
    indexOfActualYear === -1 ? yearsList.length - 1 : indexOfActualYear

  const initialYear = yearsList[initialYearIndex]

  const initialMonthIndex = new Date().getMonth()

  const initialMonth = String(initialMonthIndex + 1).padStart(2, '0')

  const initialState = {
    yearIndex: initialYearIndex,
    year: initialYear,
    monthIndex: initialMonthIndex,
    month: initialMonth,
    period: `${initialMonth}-${initialYear}`,
  }

  const [contextState, contextDispatch] = useReducer(reducer, initialState)

  return (
    <PeriodsContext.Provider
      value={{ contextState, contextDispatch, yearsList }}
    >
      {children}
    </PeriodsContext.Provider>
  )
}
