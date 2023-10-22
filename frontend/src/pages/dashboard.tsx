import React, { useEffect } from 'react'
import AuthGuard from '@/guards/auth-guard'
import { useAuth } from '@/context/auth-provider'
import { DashboardComponent } from '@/components'

const Dashboard = () => {
  const { login } = useAuth()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      login(storedToken)
    }
  }, [])

  return (
    <div className="bg-bg min-h-screen">
      <AuthGuard>
        <DashboardComponent />
      </AuthGuard>
    </div>
  )
}

export default Dashboard
