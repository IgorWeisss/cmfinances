import { EntryData } from '@/queries/useFetchPeriodData'
import { create } from 'zustand'

interface Store {
  updateEntryDialog: {
    openState: boolean
    data: EntryData | null
  }
  setUpdateEntryData: (data: EntryData | null) => void
}

export const useEntryDialogStore = create<Store>()((set) => ({
  updateEntryDialog: {
    openState: false,
    data: null,
  },
  setUpdateEntryData: (data) => {
    set((state) => ({
      ...state,
      updateEntryDialog: {
        data,
        openState: !state.updateEntryDialog.openState,
      },
    }))
  },
}))
