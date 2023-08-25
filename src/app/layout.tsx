import './globals.css'

import { ReactNode } from 'react'

import { Poppins } from 'next/font/google'

import QueryProvider from '@/contexts/QueryProvider'
import { YearsListProvider } from '@/contexts/yearsListProvider'
import { getYearsListFromServer } from '@/services/getYearsListFromServer'

const poppins = Poppins({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'CMFinances',
  description: 'Sistema desenvolvido por Igor Weiss',
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const yearsList = await getYearsListFromServer()

  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} bg-zinc-900 flex flex-col`}>
        <QueryProvider>
          <YearsListProvider yearsList={yearsList}>
            {children}
          </YearsListProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
