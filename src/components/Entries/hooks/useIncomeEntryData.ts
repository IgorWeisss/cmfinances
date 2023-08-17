import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface useIncomeEntryDataProps {
  dueDate: string
  value: string
  payMethod: string | null
  clientId: string | null
  isSelected: boolean
}

export function useIncomeEntryData({
  clientId,
  dueDate,
  isSelected,
  payMethod,
  value,
}: useIncomeEntryDataProps) {
  const payMethodStyleTemplates: {
    [key: string]: { short: string; colors: string }
  } = {
    PIX: {
      short: 'PIX',
      colors: 'from-orange-500 to-orange-600',
    },
    Boleto: {
      short: 'BOL',
      colors: 'from-cyan-500 to-cyan-600',
    },
    Dinheiro: {
      short: 'DIN',
      colors: 'from-lime-500 to-lime-600',
    },
    'Cartão (Crédito 1X)': {
      short: 'C1',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 2X)': {
      short: 'C2',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 3X)': {
      short: 'C3',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 4X)': {
      short: 'C4',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 5X)': {
      short: 'C5',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 6X)': {
      short: 'C6',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 7X)': {
      short: 'C7',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 8X)': {
      short: 'C8',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 9X)': {
      short: 'C9',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 10X)': {
      short: 'C10',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 11X)': {
      short: 'C11',
      colors: 'from-purple-500 to-purple-600',
    },
    'Cartão (Crédito 12X)': {
      short: 'C12',
      colors: 'from-purple-500 to-purple-600',
    },
  }

  const formattedDueDate = format(new Date(dueDate), "dd'/'MM'/'yyyy", {
    locale: ptBR,
  })

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value))

  const payMethodStyle = payMethod && payMethodStyleTemplates[payMethod]

  function getSeparatorColor() {
    if (!isSelected) {
      return 'via-gray-600'
    }
    if (!clientId) {
      return 'via-yellow-500'
    }
    return 'via-emerald-500'
  }

  const separatorColor = getSeparatorColor()

  return {
    formattedDueDate,
    formattedValue,
    payMethodStyle,
    separatorColor,
  }
}
