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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const formSchema = z.object({
  dueDate: z.date({
    required_error: 'A data de vencimento/pagamento é obrigatória',
  }),
  description: z
    .string()
    .min(1, { message: 'A descrição da entrada é obrigatória' }),
  client: z.string().min(1, { message: 'O nome do cliente é obrigatório' }),
  value: z
    .string()
    .refine((value) => value !== 'R$ 0,00' && value !== 'R$ 0,00', {
      message: 'O valor não pode ser R$ 0,00',
    }),
  paid: z.boolean(),
  payMethod: z.string({
    required_error: 'Escolha a forma de pagamento',
  }),
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

export function NewIncomeEntryDialog() {
  const open = useEntryDialogStore((state) => state.newEntryOpenState)
  const setOpen = useEntryDialogStore((state) => state.setNewEntryOpenState)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client: '',
      description: '',
      paid: false,
      value: formatCurrency('0'),
    },
  })

  const isSubmitDisabled = Object.keys(form.formState.errors).length !== 0

  const { mutate, isLoading } = usePostNewEntry()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newEntryData: PostNewEntryProps = {
      ...values,
      entryType: 'IN',
      // TODO: HARD-CODED userId!!! Change to dynamic after auth
      userId: '280eeb0c-915b-4495-8907-9fd6e8dcf561',
      value: parseFloat(values.value.replace(/\D/g, '')) / 100,
    }
    mutate(newEntryData, {
      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cadastrar nova entrada</AlertDialogTitle>
          <AlertDialogDescription>
            Complete os dados abaixo. Clique em Salvar quando tiver terminado.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            id="newIncomeEntryForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a descrição da entrada"
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
                      Entrada quitada
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a forma de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PIX">PIX</SelectItem>
                      <SelectItem value="Boleto">Boleto</SelectItem>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="Cartão (Crédito 1X)">
                        Cartão (Crédito 1X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 2X)">
                        Cartão (Crédito 2X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 3X)">
                        Cartão (Crédito 3X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 4X)">
                        Cartão (Crédito 4X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 5X)">
                        Cartão (Crédito 5X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 6X)">
                        Cartão (Crédito 6X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 7X)">
                        Cartão (Crédito 7X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 8X)">
                        Cartão (Crédito 8X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 9X)">
                        Cartão (Crédito 9X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 10X)">
                        Cartão (Crédito 10X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 11X)">
                        Cartão (Crédito 11X)
                      </SelectItem>
                      <SelectItem value="Cartão (Crédito 12X)">
                        Cartão (Crédito 12X)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
            form="newIncomeEntryForm"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Salvar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
