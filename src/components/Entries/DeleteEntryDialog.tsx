'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDeleteEntry } from '@/mutations/useDeleteEntry'
import { useEntryDialogStore } from '@/stores/useEntryDialogStore'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { generateToast } from '../ui/generateToast'

export function DeleteEntryDialog() {
  const open = useEntryDialogStore((state) => state.deleteEntryData.openState)
  const id = useEntryDialogStore((state) => state.deleteEntryData.id)
  const setOpen = useEntryDialogStore((state) => state.setDeleteEntryData)

  const { mutate, isLoading } = useDeleteEntry()

  async function onSubmit() {
    const { loadingToast, successToast, errorToast } = generateToast()
    const toastId = String(new Date())
    loadingToast(toastId)
    mutate(id!, {
      onSuccess: () => {
        setOpen(null)
        successToast(toastId, 'Registro excluído com sucesso')
      },
      onError: () => {
        errorToast(toastId, 'Ops... Algo deu errado...')
      },
    })
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir registro</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esse registro?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(null)
            }}
          >
            Cancelar
          </AlertDialogCancel>
          <Button
            variant={'destructive'}
            disabled={isLoading}
            type="button"
            onClick={onSubmit}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Excluir'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
