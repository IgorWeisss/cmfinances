import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Edit } from 'lucide-react'

export function UpdateIncomeEntry({
  accentColor,
}: {
  accentColor: string | null
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button title="Editar">
          <Edit
            size={24}
            className={`${
              accentColor ? 'text-emerald-500' : 'text-yellow-500'
            } hover:brightness-125 transition-all`}
          />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar registro</AlertDialogTitle>
          <AlertDialogDescription>
            Faça as alterações que deseja abaixo. Clique em Salvar quando tiver
            terminado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* TODO: Develop form here */}
        <div className="w-40 h-40 bg-red-500 text-gray-100">
          AUEHUAEHUAHEUAE
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Salvar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
