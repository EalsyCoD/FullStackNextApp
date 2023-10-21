import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { data } from '@/shared/mocks/mock-data'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-provider'
import { refreshAccessToken } from '@/pages/api/Api'
import { toast } from 'react-toastify'
import { ModeToggle } from '../mode-toggle'
import { NestedTable } from '../nested-table'

export const DashboardComponent = () => {
  const { token, logout, saveRefreshToken, usernameAuth } = useAuth()

  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const [lastTokenRefreshTime, setLastTokenRefreshTime] = useState<
    number | null
  >(null)

  const refreshToken = async () => {
    if (token) {
      const success = await refreshAccessToken(token, saveRefreshToken)
      if (!success) {
        router.push('/')
        toast.error('The token has expired. Please re-authenticate.')
      }
    } else {
      console.error('No token.')
    }
  }

  const sendRequestToServer = async () => {
    const currentTime = new Date().getTime()
    const decodeToken = localStorage.getItem('decode')

    if (decodeToken) {
      const decodedToken = JSON.parse(decodeToken)

      if (
        !lastTokenRefreshTime ||
        currentTime - lastTokenRefreshTime >= decodedToken.exp
      ) {
        await refreshToken()
        setLastTokenRefreshTime(currentTime)
      }
    }
  }

  useEffect(() => {
    sendRequestToServer()
  }, [])

  return (
    <div className="bg-bg min-h-screen">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="ml-4 mr-4">
              <ModeToggle />
            </div>
            <h1 className="text-2xl font-bold">
              Welcome to the page Dashboard!
            </h1>
          </div>
          <Button
            className="bg-red-500 text-white hover-bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-lg ml-4">Hello, {usernameAuth || 'null'}</p>
      </div>

      <div className="p-4">
        <NestedTable data={data} />
      </div>
    </div>
  )
}
