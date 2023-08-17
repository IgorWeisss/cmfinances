'use client'

import { PeriodsContext } from '@/contexts/PeriodsContext'
import { useContext } from 'react'

export function useCarouselData(type: 'MONTH' | 'YEAR') {
  const {
    yearsList,
    contextState: { monthIndex, yearIndex },
    contextDispatch,
  } = useContext(PeriodsContext)

  // TODO: criar um useQuery pra fazer um fetch e buscar a lista de anos atualizada, usando yearsList como initialData

  const navButtonsItems =
    type === 'YEAR'
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

  const index = type === 'YEAR' ? yearIndex : monthIndex

  function setIndex(index: number) {
    if (type === 'MONTH') {
      contextDispatch({
        type: 'SET_MONTH',
        payload: String(index + 1).padStart(2, '0'),
      })
    } else {
      contextDispatch({
        type: 'SET_YEAR',
        payload: {
          year: yearsList[index],
          yearIndex: index,
        },
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
