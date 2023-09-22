'use client'

import { useFetchUserData } from '@/queries/useFetchUserData'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { User2 } from 'lucide-react'

export function Avatar() {
  const { data } = useFetchUserData()

  if (data) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex items-center justify-center bg-gradient-to-b
          from-gray-400 to-gray-500 h-8 w-8 rounded-full text-gray-100 
          font-bold text-base mr-4 hover:brightness-125 transition-all`}
        >
          <User2 size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{data.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <a href="/api/auth/logout">
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </a>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}
