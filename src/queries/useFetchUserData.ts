import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface UserData {
  userName: string
  userId: string
  userEmail: string
}

export async function getUserData() {
  const { data } = await axios.get<UserData>(`/api/auth/login`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  })
  return data
}

export function useFetchUserData() {
  const router = useRouter()
  return useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData(),
    onError: () => {
      router.push('/')
    },
    retry: false,
  })
}
