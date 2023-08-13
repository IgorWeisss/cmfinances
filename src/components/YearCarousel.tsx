'use client'
import { EntrysContext, REDUCER_ACTIONS } from '@/contexts/EntrysContext'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'

const toggleGroupClasses =
  'flex flex-none items-center w-1/3 justify-center data-[state=on]:text-gray-100 hover:brightness-125 px-3 transition-all'

export function YearCarousel() {
  const { yearsList, dispatch } = useContext(EntrysContext)
  const initialIndex = yearsList.indexOf(new Date().getFullYear().toString())
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    dispatch({ type: REDUCER_ACTIONS.SET_YEAR, payload: yearsList[index] })
  }, [index, dispatch, yearsList])

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex < yearsList.length - 1 ? prevIndex + 1 : prevIndex,
    )
  }

  const inlineDynamicStyle: { [key: string]: number } = {
    '--index': index,
  }

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
          {yearsList.map((item) => (
            <ToggleGroup.Item
              key={item}
              className={toggleGroupClasses}
              value={yearsList.indexOf(item).toString()}
            >
              {item}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
      <button
        className={`text-gray-600 cursor-not-allowed transition-colors ${
          index < yearsList.length - 1 &&
          'text-orange-500 cursor-pointer hover:brightness-125'
        }`}
        onClick={handleNext}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
