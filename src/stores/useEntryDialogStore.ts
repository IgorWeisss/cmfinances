import { EntryData } from '@/queries/useFetchPeriodData'
import { create } from 'zustand'

interface Store {
  updateIncomeEntryData: {
    openState: boolean
    data: EntryData | null
  }
  updateExpensesEntryData: {
    openState: boolean
    data: EntryData | null
  }
  newIncomeEntryOpenState: boolean
  newExpensesEntryOpenState: boolean
  deleteEntryData: {
    openState: boolean
    id: string | null
  }
  setUpdateIncomeEntryData: (data: EntryData | null) => void
  setUpdateExpensesEntryData: (data: EntryData | null) => void
  setNewIncomeEntryOpenState: (openState: boolean) => void
  setNewExpensesEntryOpenState: (openState: boolean) => void
  setDeleteEntryData: (id: string | null) => void
}

export const useEntryDialogStore = create<Store>()((set) => ({
  updateIncomeEntryData: {
    openState: false,
    data: null,
  },
  updateExpensesEntryData: {
    openState: false,
    data: null,
  },
  newIncomeEntryOpenState: false,
  newExpensesEntryOpenState: false,
  deleteEntryData: {
    openState: false,
    id: null,
  },
  setUpdateIncomeEntryData: (data) => {
    set((state) => ({
      ...state,
      updateIncomeEntryData: {
        data,
        openState: !state.updateIncomeEntryData.openState,
      },
    }))
  },
  setUpdateExpensesEntryData: (data) => {
    set((state) => ({
      ...state,
      updateExpensesEntryData: {
        data,
        openState: !state.updateExpensesEntryData.openState,
      },
    }))
  },
  setNewIncomeEntryOpenState: (openState) => {
    set((state) => ({
      ...state,
      newIncomeEntryOpenState: openState,
    }))
  },
  setNewExpensesEntryOpenState: (openState) => {
    set((state) => ({
      ...state,
      newExpensesEntryOpenState: openState,
    }))
  },
  setDeleteEntryData: (id) => {
    set((state) => ({
      ...state,
      deleteEntryData: {
        id,
        openState: !state.deleteEntryData.openState,
      },
    }))
  },
}))
