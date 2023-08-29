'use client'

import { useFetchYearsList } from '@/queries/useFetchYearsList'
import { usePeriodDataStore } from '@/stores/usePeriodDataStore'
import { ReactNode, useEffect } from 'react'

interface PeriodProviderProps {
  children: ReactNode
  yearsList: string[]
}

export function YearsListProvider({
  children,
  yearsList,
}: PeriodProviderProps) {
  const setYearsList = usePeriodDataStore((state) => state.setYearsList)

  const { data, isLoading, isError } = useFetchYearsList(yearsList)

  useEffect(() => {
    if (data) {
      setYearsList(data)
    }
  }, [setYearsList, data])

  if (!isLoading && !isError) {
    return <>{children}</>
  }
}
