import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export interface PostNewEntryProps {
  description: string
  dueDate: Date
  entryType: 'IN' | 'OUT'
  paid: boolean
  value: number
  userId: string
  client?: string
  payMethod?: string
}

async function updateEntryData(body: PostNewEntryProps) {
  const jsonBody = JSON.stringify(body)
  const { data } = await axios.post('/api/entry', jsonBody, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
      'Content-type': 'application/json',
    },
  })
  return data
}

export function usePostNewEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: PostNewEntryProps) => updateEntryData(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['periodData'] })
      queryClient.invalidateQueries({ queryKey: ['yearsList'] })
    },
  })
}
