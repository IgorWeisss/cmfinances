import { FileX, Frown, Loader2 } from 'lucide-react'

export function EmptyEntries() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-10 text-gray-500">
      <FileX size={60} className="" />
      <p className="text-4xl font-bold mt-6">Ops...</p>
      <p className="text-lg mt-2 font-bold">Não tem nada aqui ainda...</p>
    </div>
  )
}

export function ErrorEntries() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-10 text-gray-500">
      <Frown size={60} className="" />
      <p className="text-4xl font-bold mt-6">Opa...</p>
      <p className="text-lg mt-2 font-bold text-center">
        Deu ruim na hora de buscar os dados do servidor...
      </p>
    </div>
  )
}

export function LoadingEntries() {
  return (
    <div className="flex h-full items-center justify-center text-gray-500">
      <Loader2 size={60} className="animate-spin" />
    </div>
  )
}
