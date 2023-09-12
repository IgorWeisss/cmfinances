import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { PostNewEntryProps, usePostNewEntry } from '@/mutations/usePostNewEntry'
import { useEntryDialogStore } from '@/stores/useEntryDialogStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Popover } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarDays, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Checkbox } from '../ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { PopoverContent, PopoverTrigger } from '../ui/popover'
import { generateToast } from '../ui/generateToast'

const formSchema = z.object({
  dueDate: z.date({
    required_error: 'A data de vencimento/pagamento é obrigatória',
  }),
  description: z
    .string()
    .min(1, { message: 'A descrição da saída é obrigatória' }),
  value: z
    .string()
    .refine((value) => value !== 'R$ 0,00' && value !== 'R$ 0,00', {
      message: 'O valor não pode ser R$ 0,00',
    }),
  paid: z.boolean(),
})

function formatCurrency(value: string) {
  if (value === '' || value === 'R$ ') return 'R$ 0,00'
  const noDigit = value.replace(/\D/g, '')
  const newValue = parseFloat(noDigit) / 100
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(newValue)
}

export function NewExpensesEntryDialog() {
  const open = useEntryDialogStore((state) => state.newExpensesEntryOpenState)
  const setOpen = useEntryDialogStore(
    (state) => state.setNewExpensesEntryOpenState,
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      paid: false,
      value: formatCurrency('0'),
    },
  })

  const isSubmitDisabled = Object.keys(form.formState.errors).length !== 0

  const { mutate, isLoading } = usePostNewEntry()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { loadingToast, successToast, errorToast } = generateToast()
    const toastId = String(new Date())
    loadingToast(toastId)
    const newEntryData: PostNewEntryProps = {
      ...values,
      entryType: 'OUT',
      // TODO: HARD-CODED userId!!! Change to dynamic after auth
      userId: '280eeb0c-915b-4495-8907-9fd6e8dcf561',
      value: parseFloat(values.value.replace(/\D/g, '')) / 100,
    }
    mutate(newEntryData, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
        successToast(toastId, 'Saída gravada com sucesso')
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
          <AlertDialogTitle>Cadastrar nova saída</AlertDialogTitle>
          <AlertDialogDescription>
            Complete os dados abaixo. Clique em Salvar quando tiver terminado.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            id="newExpensesEntryForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a descrição da saída"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o valor"
                      {...field}
                      onChange={(e) => {
                        e.target.value = formatCurrency(e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quitado?</FormLabel>
                  <div className="flex flex-row items-start text-center space-x-3 space-y-0 rounded-md px-3 py-2 border border-gray-200">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-lg mt-0 leading-none">
                      Saída quitada
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de vencimento/pagamento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full px-3 py-2 h-10 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ptBR })
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false)
              form.reset()
            }}
          >
            Cancelar
          </AlertDialogCancel>
          <Button
            disabled={isSubmitDisabled || isLoading}
            type="submit"
            form="newExpensesEntryForm"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Salvar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
