'use client'
import { Dispatch, ReactNode, createContext, useReducer } from 'react'

interface PeriodProviderProps {
  children: ReactNode
  yearsList: string[]
}

const initialState = {
  year: '',
  month: '',
  period: '',
}

type StateProps = typeof initialState

interface ActionProps {
  type: 'SET_YEAR' | 'SET_MONTH'
  payload?: string
}

const reducer = (state: StateProps, action: ActionProps): StateProps => {
  const { type, payload } = action
  switch (type) {
    case 'SET_MONTH':
      return {
        ...state,
        month: payload ?? '',
        period: `${payload}-${state.year}`,
      }
    case 'SET_YEAR':
      return {
        ...state,
        year: payload ?? '',
        period: `${state.month}-${payload}`,
      }
    default:
      return state
  }
}

interface PeriodsContextType {
  contextState: typeof initialState
  contextDispatch: Dispatch<ActionProps>
  yearsList: string[]
}

export const PeriodsContext = createContext({} as PeriodsContextType)

export function PeriodProvider({ children, yearsList }: PeriodProviderProps) {
  const [contextState, contextDispatch] = useReducer(reducer, initialState)

  return (
    <PeriodsContext.Provider
      value={{ contextState, contextDispatch, yearsList }}
    >
      {children}
    </PeriodsContext.Provider>
  )
}
