'use client'

import { usePeriodDataStore } from '@/stores/usePeriodDataStore'

export function useCarouselData(variant: 'MONTH' | 'YEAR') {
  // const { yearsList } = useContext(PeriodsContext)

  const yearsList = usePeriodDataStore((state) => state.yearsList)
  const monthIndex = usePeriodDataStore((state) => state.monthIndex)
  const yearIndex = usePeriodDataStore((state) => state.yearIndex)
  const setMonth = usePeriodDataStore((state) => state.setMonth)
  const setYear = usePeriodDataStore((state) => state.setYear)

  const navButtonsItems =
    variant === 'YEAR'
      ? yearsList
      : [
          'JAN',
          'FEV',
          'MAR',
          'ABR',
          'MAI',
          'JUN',
          'JUL',
          'AGO',
          'SET',
          'OUT',
          'NOV',
          'DEZ',
        ]

  const index = variant === 'YEAR' ? yearIndex : monthIndex

  function setIndex(index: number) {
    if (variant === 'MONTH') {
      setMonth(String(index + 1).padStart(2, '0'))
    } else {
      setYear({
        year: yearsList![index],
        yearIndex: index,
      })
    }
  }

  const handlePrev = () => {
    const newIndex = index > 0 ? index - 1 : index
    setIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = index < navButtonsItems.length - 1 ? index + 1 : index
    setIndex(newIndex)
  }

  const inlineDynamicTransformCarouselStyle: { [key: string]: number } = {
    '--index': index,
  }

  return {
    handlePrev,
    handleNext,
    setIndex,
    index,
    navButtonsItems,
    inlineDynamicTransformCarouselStyle,
  }
}
