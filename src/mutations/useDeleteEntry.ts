import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

async function deleteEntry(id: string) {
  const { data } = await axios.delete(`/api/entry?id=${id}`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  })
  return data
}

export function useDeleteEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['periodData'] })
      queryClient.invalidateQueries({ queryKey: ['yearsList'] })
    },
  })
}
