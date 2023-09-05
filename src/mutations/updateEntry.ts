import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { generateToast } from '../components/ui/generateToas'

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
  const { loadingToast, successToast, errorToast } = generateToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdateEntryProps) => updateEntryData(body),
    onMutate: () => {
      loadingToast()
    },
    onSuccess: () => {
      successToast('Dados gravados com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['periodData'] })
      queryClient.invalidateQueries({ queryKey: ['yearsList'] })
    },
    onError: () => {
      errorToast('Algo deu errado...')
    },
  })
}
