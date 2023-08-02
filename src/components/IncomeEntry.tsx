import * as Checkbox from '@radix-ui/react-checkbox'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { AlertTriangle, Check, Edit, Trash2 } from 'lucide-react'

interface IncomeEntryProps {
  entryData: {
    id: string
    createdAt: string
    updatedAt: string
    dueDate: string
    description: string
    client: string
    clientId: string | null
    value: string
    payMethod: string
    paid: boolean
    entryType: string
    userId: string
    periodName: string
  }
  isSelected: boolean
  handleSelectItem: () => void
}

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

export function IncomeEntry({
  entryData: { client, clientId, description, dueDate, paid, payMethod, value },
  isSelected,
  handleSelectItem,
}: IncomeEntryProps) {
  const formattedDueDate = format(new Date(dueDate), "dd'/'MM'/'yyyy", {
    locale: ptBR,
  })

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value))

  const payMethodStyle = payMethodStyleTemplates[payMethod]

  const separatorColor = () => {
    if (!isSelected) {
      return 'via-gray-600'
    }
    if (!clientId) {
      return 'via-yellow-500'
    }
    return 'via-emerald-500'
  }

  return (
    <div className="">
      <div
        className="relative overflow-hidden flex gap-6 px-6 py-4 rounded-xl"
        onClick={handleSelectItem}
      >
        <div
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r
      ${
        clientId ? 'from-emerald-500/25' : 'from-yellow-500/25 opacity-100'
      } transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}
        ></div>
        <div
          className={`absolute top-0 left-0 w-full h-[0.125rem] bg-gradient-to-r
          ${separatorColor()}`}
        ></div>
        <div className="z-10 flex flex-col gap-4 items-center justify-center">
          <div
            title={payMethod}
            className={`flex items-center justify-center bg-gradient-to-b ${payMethodStyle.colors} h-12 w-12 rounded-full text-gray-100 font-bold text-base`}
          >
            {payMethodStyle.short}
          </div>
          <p className="text-gray-100 ">{formattedDueDate}</p>
          <div className={`flex gap-2 ${!isSelected && 'hidden'}`}>
            <button title="Editar">
              <Edit
                size={24}
                className={`${
                  clientId ? 'text-emerald-500' : 'text-yellow-500'
                } hover:brightness-125 transition-all`}
              />
            </button>
            <button title="Deletar">
              <Trash2
                size={24}
                className={`${
                  clientId ? 'text-emerald-500' : 'text-yellow-500'
                } hover:brightness-125 transition-all`}
              />
            </button>
          </div>
        </div>
        <div className="z-10 flex flex-col gap-4 w-full">
          <p className="font-bold text-gray-100 text-lg">{client}</p>
          <p className="text-gray-100">{description}</p>
          <p className="font-bold text-lg text-green-500">{formattedValue}</p>
          <div className="flex gap-6">
            <p className="text-gray-100">Quitado?</p>
            <Checkbox.Root
              checked={paid}
              className={`flex items-center ${
                clientId
                  ? 'text-emerald-500 border-emerald-500'
                  : 'text-yellow-500 border-yellow-500'
              } justify-center w-8 h-8 border-2 hover:brightness-125 transition-all`}
            >
              <Checkbox.Indicator>
                <Check size={20} />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
        </div>
        {!clientId && (
          <div className="z-10 flex items-center justify-end">
            <span title="Cliente sem cadastro">
              <AlertTriangle
                size={24}
                className="text-yellow-500 hover:brightness-125 transition-all"
              />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
