import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface useExpenseEntryDataProps {
  dueDate: string
  value: string
}

export function useExpenseEntryData({
  dueDate,
  value,
}: useExpenseEntryDataProps) {
  const formattedDueDate = format(new Date(dueDate), "dd'/'MM'/'yyyy", {
    locale: ptBR,
  })

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value))

  return {
    formattedDueDate,
    formattedValue,
  }
}
