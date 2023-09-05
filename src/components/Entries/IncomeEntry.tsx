import { EntryData } from '@/queries/useFetchPeriodData'
import { useEntryDialogStore } from '@/stores/useEntryDialogStore'
import * as Checkbox from '@radix-ui/react-checkbox'
import { AlertTriangle, Check, Edit, Trash2 } from 'lucide-react'
import { UpdateIncomeEntryDialog } from './UpdateIncomeEntryDialog'
import { useIncomeEntryData } from './hooks/useIncomeEntryData'

interface IncomeEntryProps {
  entryData: EntryData
  isSelected: boolean
  handleSelectItem: () => void
}

export function IncomeEntry({
  entryData,
  isSelected,
  handleSelectItem,
}: IncomeEntryProps) {
  const updateEntryData = useEntryDialogStore(
    (state) => state.updateEntryDialog.data,
  )

  const shouldRenderUpdateDialog = updateEntryData?.id === entryData.id

  const { client, clientId, description, dueDate, paid, payMethod, value } =
    entryData

  const {
    formattedDueDate,
    formattedValue,
    payMethodStyle,
    separatorColor,
    setUpdateEntryData,
  } = useIncomeEntryData({
    clientId,
    dueDate,
    isSelected,
    payMethod,
    value,
  })

  return (
    <div>
      {shouldRenderUpdateDialog && (
        <UpdateIncomeEntryDialog data={updateEntryData} />
      )}
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
          ${separatorColor}`}
        ></div>
        <div className="z-10 flex flex-col gap-4 items-center justify-center">
          {payMethodStyle && (
            <div
              title={payMethod!}
              className={`flex items-center justify-center bg-gradient-to-b
              ${payMethodStyle.colors} h-12 w-12 rounded-full text-gray-100 
              font-bold text-base`}
            >
              {payMethodStyle.short}
            </div>
          )}
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
