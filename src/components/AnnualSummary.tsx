'use client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function AnnualSummary() {
  return (
    <div
      className="relative bg-gradient-to-b from-blue-800 to-blue-900 flex flex-col
      items-center justify-between py-12 h-full w-full rounded-[1.25rem] overflow-hidden
      shadow-entry-box"
    >
      <Link
        href="/inicio"
        className="w-10 h-10 bg-gradient-to-b from-orange-500 to-orange-600
          hover:brightness-125 transition-all absolute left-0 top-0
          rounded-br-[1.25rem] text-gray-100 flex items-center justify-center"
      >
        <ArrowLeft size={20} />
      </Link>
    </div>
  )
}
