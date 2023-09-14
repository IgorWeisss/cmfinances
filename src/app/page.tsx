'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthLogin } from '@/mutations/useAuthLogin'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  password: z.string().min(1, { message: 'A senha é obrigatória' }),
})

export default function Login() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isSubmitDisabled = Object.keys(form.formState.errors).length !== 0

  const { mutate, isLoading, error } = useAuthLogin()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: (data) => {
        console.log(data)
        router.push('/inicio')
      },
    })
  }
  return (
    <div
      className="flex flex-col gap-8 items-center justify-center w-full h-screen bg-gradient-to-b from-blue-800
            to-blue-900"
    >
      <div className="flex items-center justify-center">
        <span className="text-orange-500 font-bold text-[3rem]">CM</span>
        <span className="text-gray-100 font-bold text-[3rem]">Finances</span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Digite suas credenciais para fazer login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="loginForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 items-center justify-center">
          <Button
            disabled={isSubmitDisabled || isLoading}
            type="submit"
            form="loginForm"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Entrar'}
          </Button>
          {error && axios.isAxiosError(error) ? (
            <p className="text-red-500">{error.response?.data}</p>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  )
}
