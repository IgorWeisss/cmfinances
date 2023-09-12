import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
// import { generateToast } from '../components/ui/generateToast'

async function deleteEntry(id: string) {
  const { data } = await axios.delete(`/api/entry?id=${id}`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  })
  return data
}

export function useDeleteEntry() {
  // const { loadingToast, successToast, errorToast } = generateToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteEntry(id),
    // onMutate: () => {
    //   loadingToast()
    // },
    onSuccess: () => {
      // successToast('Registro excluído com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['periodData'] })
      queryClient.invalidateQueries({ queryKey: ['yearsList'] })
    },
    // onError: () => {
    //   errorToast('Algo deu errado...')
    // },
  })
}
