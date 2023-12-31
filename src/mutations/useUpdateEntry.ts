import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export interface UpdateEntryProps {
  id: string
  dueDate?: Date
  description?: string
  client?: string
  value?: number
  payMethod?: string
  paid?: boolean
  periodName?: string
}

async function updateEntryData(body: UpdateEntryProps) {
  const jsonBody = JSON.stringify(body)
  const { data } = await axios.put('/api/entry', jsonBody, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
      'Content-type': 'application/json',
    },
  })
  return data
}

export function useUpdateEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdateEntryProps) => updateEntryData(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['periodData'] })
      queryClient.invalidateQueries({ queryKey: ['yearsList'] })
    },
  })
}
