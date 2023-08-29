import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface EntryData {
  id: string
  createdAt: string
  updatedAt: string
  dueDate: string
  description: string
  client: string | null
  clientId: string | null
  value: string
  payMethod: string | null
  paid: boolean
  entryType: string
  userId: string
  periodName: string
}

export interface DataReturnType {
  id: string
  name: string
  _count: {
    entries: number
  }
  entries: EntryData[]
}

async function getPeriodData(period: string) {
  const { data } = await axios.get<DataReturnType>(`/api/period/${period}`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  })
  return data
}

export function useFetchPeriodData(period: string) {
  return useQuery({
    queryKey: ['periodData', period],
    queryFn: () => getPeriodData(period),
  })
}
