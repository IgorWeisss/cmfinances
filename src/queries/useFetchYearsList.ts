import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export async function getYearsList() {
  const { data } = await axios.get<string[]>(`/api/yearsList`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  })
  return data
}

export function useFetchYearsList(initialData: string[]) {
  return useQuery({
    queryKey: ['yearsList'],
    queryFn: () => getYearsList(),
    initialData,
  })
}
