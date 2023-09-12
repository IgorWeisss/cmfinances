import { useEntryDialogStore } from '@/stores/useEntryDialogStore'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface useExpenseEntryDataProps {
  id: string
  dueDate: string
  value: string
}

export function useExpenseEntryData({
  id,
  dueDate,
  value,
}: useExpenseEntryDataProps) {
  const formattedDueDate = format(new Date(dueDate), "dd'/'MM'/'yyyy", {
    locale: ptBR,
  })

  const setUpdateEntryData = useEntryDialogStore(
    (state) => state.setUpdateExpensesEntryData,
  )

  const updateEntryData = useEntryDialogStore(
    (state) => state.updateExpensesEntryData.data,
  )

  const shouldRenderUpdateDialog = updateEntryData?.id === id

  const setDeleteEntryData = useEntryDialogStore(
    (state) => state.setDeleteEntryData,
  )

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value))

  return {
    formattedDueDate,
    formattedValue,
    updateEntryData,
    shouldRenderUpdateDialog,
    setUpdateEntryData,
    setDeleteEntryData,
  }
}
