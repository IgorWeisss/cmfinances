'use client'
import { Dispatch, ReactNode, createContext, useReducer } from 'react'

interface EntryProviderProps {
  children: ReactNode
  yearsList: string[]
}

const initialState = {
  year: '',
  month: '',
  period: '',
}

type StateProps = typeof initialState

export enum REDUCER_ACTIONS {
  // eslint-disable-next-line no-unused-vars
  SET_YEAR = 'SET_YEAR',
  // eslint-disable-next-line no-unused-vars
  SET_MONTH = 'SET_MONTH',
}

interface ActionProps {
  type: REDUCER_ACTIONS
  payload?: string
}

const reducer = (state: StateProps, action: ActionProps): StateProps => {
  const { type, payload } = action
  switch (type) {
    case REDUCER_ACTIONS.SET_MONTH:
      return {
        ...state,
        month: payload ?? '',
        period: `${state.month}-${state.year}`,
      }
    case REDUCER_ACTIONS.SET_YEAR:
      return {
        ...state,
        year: payload ?? '',
        period: `${state.month}-${state.year}`,
      }
    default:
      return state
  }
}

interface EntrysContextType {
  state: typeof initialState
  dispatch: Dispatch<ActionProps>
  yearsList: string[]
}

export const EntrysContext = createContext({} as EntrysContextType)

export function EntryProvider({ children, yearsList }: EntryProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [year, setYearState] = useState('')
  // const [month, setMonthState] = useState('')

  // function setYear(year: string) {
  //   setYearState(year)
  // }

  // function setMonth(month: string) {
  //   setMonthState(month)
  // }

  return (
    <EntrysContext.Provider value={{ state, dispatch, yearsList }}>
      {children}
    </EntrysContext.Provider>
  )
}
