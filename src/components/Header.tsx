'use client'
import { useState } from 'react'

import * as ToggleGroup from '@radix-ui/react-toggle-group'

const toggleGroupMonthClasses =
  'data-[state=on]:text-gray-100 hover:brightness-125 transition-all'

interface HeaderProps {
  navButtonsType: 'month' | 'year'
  navButtonsItems: string[]
}

export function Header({ navButtonsType, navButtonsItems }: HeaderProps) {
  const actualMont = new Date().getMonth().toString()
  const [month, setMonth] = useState(actualMont)

  return (
    <header className="w-full bg-gradient-to-b from-blue-800 to-blue-900 px-12 py-5 flex justify-between">
      <nav className="flex items-center justify-center">
        {navButtonsType === 'month' && (
          <ToggleGroup.Root
            type="single"
            value={month}
            onValueChange={(value) => {
              if (value) setMonth(value)
            }}
            className="flex items-center justify-center gap-6 font-bold text-xl text-gray-600"
          >
            {navButtonsItems.map((month, index) => (
              <ToggleGroup.Item
                key={month}
                className={toggleGroupMonthClasses}
                value={index.toString()}
              >
                {month}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        )}
        {navButtonsType === 'year' && <div></div>}
      </nav>
      <div>
        <span className="text-orange-500 font-bold text-[2rem]">CM</span>
        <span className="text-gray-100 font-bold text-[2rem]">Finances</span>
      </div>
    </header>
  )
}
