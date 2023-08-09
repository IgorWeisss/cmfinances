import { ReactNode } from 'react'

import './globals.css'
import { Poppins } from 'next/font/google'

import { EntryProvider } from '@/contexts/EntrysContext'
import { getYearsList } from '@/lib/getYearsList'
import QueryProvider from '@/contexts/QueryProvider'

const poppins = Poppins({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'CMFinances',
  description: 'Sistema desenvolvido por Igor Weiss',
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const yearsList = await getYearsList()

  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} bg-zinc-900 flex flex-col`}>
        <QueryProvider>
          <EntryProvider yearsList={yearsList}>{children}</EntryProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
