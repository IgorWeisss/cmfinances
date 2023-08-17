'use client'
import { Dispatch, ReactNode, createContext, useReducer } from 'react'

interface PeriodProviderProps {
  children: ReactNode
  yearsList: string[]
}

interface StateProps {
  year: string
  month: string
  period: string
}

interface ActionProps {
  type: 'SET_YEAR' | 'SET_MONTH'
  payload: string
}

const reducer = (state: StateProps, action: ActionProps): StateProps => {
  const { type, payload } = action
  switch (type) {
    case 'SET_MONTH':
      return {
        ...state,
        month: payload,
        period: `${payload}-${state.year}`,
      }
    case 'SET_YEAR':
      return {
        ...state,
        year: payload,
        period: `${state.month}-${payload}`,
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
  const initialYear =
    indexOfActualYear === -1
      ? yearsList[yearsList.length - 1]
      : yearsList[indexOfActualYear]

  const initialMonth = String(new Date().getMonth() + 1).padStart(2, '0')

  const initialState = {
    year: initialYear,
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
