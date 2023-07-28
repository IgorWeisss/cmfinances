import * as Checkbox from '@radix-ui/react-checkbox'

import { AlertTriangle, Check, Edit, Trash2 } from 'lucide-react'

export function Entry() {
  return (
    <div className="">
      <div className="group relative overflow-hidden flex gap-6 px-6 py-4 rounded-xl">
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r
      from-emerald-500/25 opacity-0 group-hover:opacity-100 transition-opacity"
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-[0.125rem] bg-gradient-to-r
      via-emerald-500"
        ></div>
        <div className="z-10 flex flex-col gap-4 items-center justify-center">
          <div
            className="flex items-center justify-center bg-gradient-to-b from-cyan-500 
        to-cyan-600 h-12 w-12 rounded-full text-gray-100 font-bold text-base"
          >
            BOL
          </div>
          <p className="text-gray-100 ">08/07/2023</p>
          <div className="flex gap-2">
            <button title="Editar">
              <Edit
                size={24}
                className="text-emerald-500 hover:brightness-125 transition-all"
              />
            </button>
            <button title="Deletar">
              <Trash2
                size={24}
                className="text-emerald-500 hover:brightness-125 transition-all"
              />
            </button>
          </div>
        </div>
        <div className="z-10 flex flex-col gap-4 w-full">
          <p className="font-bold text-gray-100 text-lg">Caroline Mueller</p>
          <p className="text-gray-100">Entrada ensaio</p>
          <p className="font-bold text-green-500">R$ 100,00</p>
          <div className="flex gap-6">
            <p className="text-gray-100">Quitado?</p>
            <Checkbox.Root className="flex items-center text-emerald-500 justify-center w-8 h-8 border-2 border-emerald-500 hover:brightness-125 transition-all">
              <Checkbox.Indicator>
                <Check size={20} />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
        </div>
        <div className="z-10 flex items-center justify-end">
          <span title="Cliente sem cadastro">
            <AlertTriangle
              size={24}
              className="text-yellow-500 hover:brightness-125 transition-all"
            />
          </span>
        </div>
      </div>
    </div>
  )
}
