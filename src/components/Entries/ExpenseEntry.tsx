import * as Checkbox from '@radix-ui/react-checkbox'

import { Check, Edit, Trash2 } from 'lucide-react'
import { EntryData } from '@/queries/useFetchPeriodData'
import { useExpenseEntryData } from './hooks/useExpenseEntryData'
import { UpdateExpensesEntryDialog } from './UpdateExpensesEntryDialog'

interface ExpenseEntryProps {
  entryData: EntryData
  isSelected: boolean
  handleSelectItem: () => void
}

export function ExpenseEntry({
  entryData,
  isSelected,
  handleSelectItem,
}: ExpenseEntryProps) {
  const { id, description, dueDate, paid, value } = entryData

  const {
    formattedDueDate,
    formattedValue,
    updateEntryData,
    shouldRenderUpdateDialog,
    setUpdateEntryData,
    setDeleteEntryData,
  } = useExpenseEntryData({
    id,
    dueDate,
    value,
  })

  return (
    <div className="">
      {shouldRenderUpdateDialog && (
        <UpdateExpensesEntryDialog data={updateEntryData!} />
      )}
      <div
        className="relative overflow-hidden flex gap-6 px-6 py-4 rounded-xl"
        onClick={handleSelectItem}
      >
        <div
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r
          from-emerald-500/25 transition-opacity ${
            isSelected ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`absolute top-0 left-0 w-full h-[0.125rem] bg-gradient-to-r
          ${isSelected ? 'via-emerald-500' : 'via-gray-600'}`}
        ></div>
        <div className="z-10 flex flex-col gap-4 items-center justify-center">
          <p className="text-gray-100 ">{formattedDueDate}</p>
          <div className={`flex gap-2 ${!isSelected && 'hidden'}`}>
            <button
              title="Editar"
              onClick={() => {
                setUpdateEntryData(entryData)
              }}
            >
              <Edit
                size={24}
                className={`text-emerald-500 hover:brightness-125 transition-all`}
              />
            </button>
            <button
              title="Deletar"
              onClick={() => {
                setDeleteEntryData(id)
              }}
            >
              <Trash2
                size={24}
                className={`text-emerald-500 hover:brightness-125 transition-all`}
              />
            </button>
          </div>
        </div>
        <div className="z-10 flex flex-col gap-4 w-full">
          <p className="font-bold text-gray-100 text-lg">{description}</p>
          <p className="font-bold text-lg text-red-500">{formattedValue}</p>
          <div className="flex gap-6">
            <p className="text-gray-100">Quitado?</p>
            <Checkbox.Root
              checked={paid}
              className={`flex items-center cursor-default text-emerald-500 border-emerald-500 justify-center w-8 h-8 border-2 transition-all`}
            >
              <Checkbox.Indicator>
                <Check size={20} />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
        </div>
      </div>
    </div>
  )
}
