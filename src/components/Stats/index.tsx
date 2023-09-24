'use client'

import { Loader2, MoreHorizontal, ThumbsDown } from 'lucide-react'
import Link from 'next/link'
import { useStatsData } from './hooks/useStatsData'

export function Stats() {
  const { isLoading, isError, formatedData } = useStatsData()

  if (isLoading)
    return (
      <div
        className="relative bg-gradient-to-b from-blue-800 to-blue-900 flex flex-col
      items-center justify-between py-12 h-container w-full rounded-[1.25rem]
      shadow-entry-box"
      >
        <div className="flex h-full items-center justify-center text-gray-500">
          <Loader2 size={60} className="animate-spin" />
        </div>
      </div>
    )

  if (isError)
    return (
      <div
        className="relative bg-gradient-to-b from-blue-800 to-blue-900 flex flex-col
    items-center justify-between py-12 h-container w-full rounded-[1.25rem]
    shadow-entry-box"
      >
        <div className="flex flex-col h-full items-center justify-center p-10 text-gray-500">
          <ThumbsDown size={60} className="" />
          <p className="text-4xl font-bold mt-6">Eita...</p>
          <p className="text-lg mt-2 font-bold text-center">
            Algo de errado não está certo aqui...
          </p>
        </div>
      </div>
    )

  return (
    <div
      className="relative bg-gradient-to-b from-blue-800 to-blue-900 flex flex-col
      items-center justify-between py-12 h-container w-full rounded-[1.25rem]
      shadow-entry-box"
    >
      {formatedData.map((stat, index) => (
        <div
          key={`${stat.value}${stat.color}${index}`}
          className="flex flex-col items-center justify-center gap-[0.1666rem] leading-none"
        >
          <p className="text-xl text-gray-100 max-w-xs text-center">
            {stat.title}
          </p>
          <p className={`text-5xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
      <Link
        href="inicio/resumo-anual"
        className="w-10 h-10 bg-gradient-to-b from-orange-500 to-orange-600
          hover:brightness-125 transition-all absolute right-0 bottom-0
          rounded-tl-[1.25rem] rounded-br-[1.25rem] text-gray-100 flex items-center justify-center"
      >
        <MoreHorizontal size={20} />
      </Link>
    </div>
  )
}
