import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export interface AuthLoginProps {
  email: string
  password: string
}

async function AuthLogin(body: AuthLoginProps) {
  const jsonBody = JSON.stringify(body)
  const { data } = await axios.post('/api/auth/login', jsonBody, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
      'Content-type': 'application/json',
    },
  })
  return data
}

export function useAuthLogin() {
  return useMutation({
    mutationFn: (body: AuthLoginProps) => AuthLogin(body),
  })
}
