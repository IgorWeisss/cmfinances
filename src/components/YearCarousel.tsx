'use client'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const years = [
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
  '2031',
  '2032',
  '2033',
  '2034',
  '2035',
]

const toggleGroupClasses =
  'flex flex-none items-center w-1/3 justify-center data-[state=on]:text-gray-100 hover:brightness-125 px-3 transition-all'

export function YearCarousel() {
  const navButtonsItems = years

  const initialIndex = navButtonsItems.indexOf(
    new Date().getFullYear().toString(),
  )
  const [index, setIndex] = useState(initialIndex)

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex < navButtonsItems.length - 1 ? prevIndex + 1 : prevIndex,
    )
  }

  const inlineDynamicStyle: { [key: string]: number } = {
    '--index': index,
  }

  return (
    <div className="flex w-full">
      <button
        className={`text-gray-600 transition-colors ${
          index > 0 && 'text-orange-500 hover:brightness-125'
        }`}
        onClick={handlePrev}
      >
        <ChevronLeft />
      </button>
      <div className="my-auto overflow-hidden w-[14rem]">
        <ToggleGroup.Root
          type="single"
          value={String(index)}
          onValueChange={(value) => {
            if (value) setIndex(Number(value))
          }}
          className="flex transition-transform carousel-transform items-center justify-start
          font-bold sm:text-xl text-gray-600"
          style={inlineDynamicStyle}
        >
          {navButtonsItems.map((item) => (
            <ToggleGroup.Item
              key={item}
              className={toggleGroupClasses}
              value={navButtonsItems.indexOf(item).toString()}
            >
              {item}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
      <button
        className={`text-gray-600 transition-colors ${
          index < navButtonsItems.length - 1 &&
          'text-orange-500 hover:brightness-125'
        }`}
        onClick={handleNext}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
