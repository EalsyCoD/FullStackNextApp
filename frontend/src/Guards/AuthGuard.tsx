import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-provider'

interface AuthGuardProps {
  children: ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter()
  const { token } = useAuth()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
  }, [token, router])

  return token ? children : null
}

export default AuthGuard
