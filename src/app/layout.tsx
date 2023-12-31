import './globals.css'

import { ReactNode } from 'react'

import { Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'

import QueryProvider from '@/contexts/QueryProvider'
import { YearsListProvider } from '@/contexts/yearsListProvider'
import { getYearsListFromServer } from '@/services/getYearsListFromServer'
import { ToastContainer } from 'react-toastify'
import { Metadata } from 'next'

const poppins = Poppins({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CMFinances',
  description: 'Sistema desenvolvido por Igor Weiss',
  themeColor: '#1A2B40',
  other: {
    'mobile-web-app-capable': 'yes',
  },
  manifest: '/manifest.webmanifest',
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const yearsList = await getYearsListFromServer()

  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} bg-zinc-900 flex flex-col`}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <QueryProvider>
          <YearsListProvider yearsList={yearsList}>
            {children}
          </YearsListProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
