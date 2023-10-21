import React, { useEffect } from 'react'
import AuthGuard from '@/Guards/AuthGuard'
import { useAuth } from '@/Context/AuthProvider'
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
