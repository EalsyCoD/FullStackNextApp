import React from 'react'

import { LoginForm } from './LoginForm'
import { ModeToggle } from '../ModeToogle'

export const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-bg">
      <div className="absolute top-4 left-4">
        <ModeToggle />
      </div>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold text-input text-center mb-4">
          Authorization
        </h2>
        <LoginForm />
      </div>
    </div>
  )
}
