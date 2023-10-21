import { decodeJWT } from '@/helpers/decode-jwt'
import React, { createContext, useContext, ReactNode, useEffect } from 'react'

interface AuthContextType {
  usernameAuth: string
  token: string | null
  saveRefreshToken: (newToken: string) => void
  login: (newToken: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(null)
  const [usernameAuth, setUsernameAuth] = React.useState<string>('')

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    const decodedToken = decodeJWT(newToken)
    if (decodedToken) {
      setUsernameAuth(decodedToken.username)
    }
    setToken(newToken)
  }

  const logout = () => {
    setToken(null)
    setUsernameAuth('')
    localStorage.removeItem('decode')
    localStorage.removeItem('token')
  }

  const saveRefreshToken = (newTokenRefresh: string) => {
    setToken(newTokenRefresh)

    const decodedToken = decodeJWT(newTokenRefresh)
    if (decodedToken) {
      setUsernameAuth(decodedToken.username)
    }

    localStorage.setItem('decode', JSON.stringify(decodedToken))
    localStorage.setItem('token', newTokenRefresh)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      const decodedToken = decodeJWT(storedToken)
      if (decodedToken) {
        setUsernameAuth(decodedToken.username)
      }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ token, saveRefreshToken, login, logout, usernameAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
