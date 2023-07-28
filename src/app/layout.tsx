import { ReactNode } from 'react'
import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'CMFinances',
  description: 'Sistema desenvolvido por Igor Weiss',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <div className="bg-zinc-900 flex flex-col">{children}</div>
      </body>
    </html>
  )
}
