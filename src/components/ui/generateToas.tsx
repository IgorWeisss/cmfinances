import { toast } from 'react-toastify'

export function generateToast() {
  const toastId = String(new Date())

  const loadingToast = () =>
    toast.loading(
      <div className="ml-2 text-lg text-zinc-900">
        <p className="text-lg font-bold text-zinc-900">Aguarde...</p>
        <p className="text-lg opacity-90">Gravando dados...</p>
      </div>,
      {
        autoClose: false,
        toastId,
      },
    )

  const successToast = (successMsg: string) =>
    toast.update(toastId, {
      render: (
        <div className="ml-2 text-lg text-zinc-900">
          <p className="text-lg font-bold text-zinc-900">OK</p>
          <p className="text-lg opacity-90">{successMsg}</p>
        </div>
      ),
      type: 'success',
      isLoading: false,
      autoClose: 3000,
      hideProgressBar: false,
    })

  const errorToast = (errorMsg: string) =>
    toast.update(toastId, {
      render: (
        <div className="ml-2 text-lg text-zinc-900">
          <p className="text-lg font-bold text-zinc-900">Oh não...</p>
          <p className="text-lg opacity-90">{errorMsg}</p>
        </div>
      ),
      type: 'error',
      isLoading: false,
      autoClose: 3000,
      hideProgressBar: false,
    })

  return {
    loadingToast,
    successToast,
    errorToast,
  }
}
