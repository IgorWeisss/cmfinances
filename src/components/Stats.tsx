import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

export function Stats() {
  return (
    <div
      className="relative bg-gradient-to-b from-blue-800 to-blue-900 flex flex-col
      items-center justify-between py-12 h-full w-full rounded-[1.25rem] overflow-hidden
      shadow-entry-box"
    >
      <div className="flex flex-col items-center justify-center gap-[0.1666rem] leading-none">
        <p className="text-xl text-gray-100">Total de entradas:</p>
        <p className="text-5xl font-bold text-green-500">R$ 4.000,00</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-[0.1666rem] leading-none">
        <p className="text-xl text-gray-100">Total de saídas:</p>
        <p className="text-5xl font-bold text-red-500">R$ 4.000,00</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-[0.1666rem] leading-none">
        <p className="text-xl text-gray-100">Lucro / Prejuízo do mês:</p>
        <p className="text-5xl font-bold text-gray-100">R$ 6.000,00</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-[0.1666rem] leading-none">
        <p className="text-xl text-gray-100 max-w-xs text-center">
          Receita acumulada nos 12 últimos meses:
        </p>
        <p className="text-5xl font-bold text-gray-100">R$ 150.000,00</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-[0.1666rem] leading-none">
        <p className="text-xl text-gray-100">Dinheiro disponível na conta:</p>
        <p className="text-5xl font-bold text-gray-100">R$ 3.500,00</p>
      </div>
      <Link
        href="inicio/resumo-anual"
        className="w-10 h-10 bg-gradient-to-b from-orange-500 to-orange-600
          hover:brightness-125 transition-all absolute right-0 bottom-0
          rounded-tl-[1.25rem] text-gray-100 flex items-center justify-center"
      >
        <MoreHorizontal size={20} />
      </Link>
    </div>
  )
}
