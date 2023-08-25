'use client'

import { getYearsList } from '@/services/axios'
import { usePeriodDataStore } from '@/stores/usePeriodDataStore'
import { useQuery } from '@tanstack/react-query'
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

  const { data, isLoading, isError } = useQuery<string[]>({
    queryKey: ['yearsList'],
    queryFn: () => getYearsList(),
    initialData: yearsList,
  })

  useEffect(() => {
    if (data) {
      setYearsList(data)
    }
  }, [setYearsList, data])

  if (!isLoading && !isError) {
    return <>{children}</>
  }
}
