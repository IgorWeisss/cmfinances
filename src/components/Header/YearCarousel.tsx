'use client'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCarouselData } from './hooks/useCarouselData'

export function YearCarousel() {
  const {
    handleNext,
    handlePrev,
    setIndex,
    index,
    navButtonsItems,
    inlineDynamicStyle,
  } = useCarouselData('YEAR')

  return (
    <div className="flex w-full">
      <button
        className={`text-gray-600 cursor-not-allowed transition-colors ${
          index > 0 && 'text-orange-500 cursor-pointer hover:brightness-125'
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
          {navButtonsItems.map((item, index) => (
            <ToggleGroup.Item
              key={item}
              className="flex flex-none items-center w-1/3 justify-center data-[state=on]:text-gray-100 hover:brightness-125 px-3 transition-all"
              value={index.toString()}
            >
              {item}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
      <button
        className={`text-gray-600 cursor-not-allowed transition-colors ${
          index < navButtonsItems.length - 1 &&
          'text-orange-500 cursor-pointer hover:brightness-125'
        }`}
        onClick={handleNext}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
