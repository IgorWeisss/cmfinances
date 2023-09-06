import { EntryData } from '@/queries/useFetchPeriodData'
import { create } from 'zustand'

interface Store {
  updateEntryData: {
    openState: boolean
    data: EntryData | null
  }
  newEntryOpenState: boolean
  setUpdateEntryData: (data: EntryData | null) => void
  setNewEntryOpenState: (openState: boolean) => void
}

export const useEntryDialogStore = create<Store>()((set) => ({
  updateEntryData: {
    openState: false,
    data: null,
  },
  newEntryOpenState: false,
  setUpdateEntryData: (data) => {
    set((state) => ({
      ...state,
      updateEntryData: {
        data,
        openState: !state.updateEntryData.openState,
      },
    }))
  },
  setNewEntryOpenState: (openState) => {
    set((state) => ({
      ...state,
      newEntryOpenState: openState,
    }))
  },
}))
