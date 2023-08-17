'use client'

import { PeriodsContext } from '@/contexts/PeriodsContext'
import { useContext, useEffect, useState } from 'react'

export function useCarouselData(type: 'MONTH' | 'YEAR') {
  const { yearsList, contextDispatch } = useContext(PeriodsContext)

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

  const initialIndex =
    type === 'YEAR'
      ? yearsList.indexOf(new Date().getFullYear().toString())
      : new Date().getMonth()

  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    function updateContextValues() {
      if (type === 'MONTH') {
        contextDispatch({
          type: 'SET_MONTH',
          payload: String(index + 1).padStart(2, '0'),
        })
      } else {
        contextDispatch({
          type: 'SET_YEAR',
          payload: yearsList[index],
        })
      }
    }

    updateContextValues()
  }, [contextDispatch, index, type, yearsList])

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

  return {
    handlePrev,
    handleNext,
    setIndex,
    index,
    navButtonsItems,
    inlineDynamicStyle,
  }
}
