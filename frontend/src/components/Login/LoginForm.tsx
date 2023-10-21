import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Input } from '@/components/ui'
import { validatePassword, validateUsername } from '@/helpers/Validations'
import { useAuth } from '@/Context/AuthProvider'
import { toast } from 'react-toastify'
import router from 'next/router'
import { authenticateUser } from '@/pages/api/Api'

interface FormValues {
  login: string
  password: string
}

interface FormErrors {
  login: string | null
  password: string | null
}

export const LoginForm = () => {
  const { login } = useAuth()
  const [formValues, setFormValues] = useState<FormValues>({
    login: '',
    password: '',
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({
    login: null,
    password: null,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })

    if (name === 'login') {
      const error = validateUsername(value)
      setFormErrors({ ...formErrors, login: error.error })
    } else if (name === 'password') {
      const error = validatePassword(value)
      setFormErrors({ ...formErrors, password: error.error })
    }
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newFormErrors: FormErrors = {
      login: null,
      password: null,
    }

    if (!formValues.login) {
      newFormErrors.login = 'Username is required'
    }
    if (!formValues.password) {
      newFormErrors.password = 'Password is required'
    }

    setFormErrors(newFormErrors)

    if (newFormErrors.login || newFormErrors.password) {
      return
    }

    const result = await authenticateUser(
      formValues.login,
      formValues.password,
      login,
    )

    if (result.success) {
      toast.success(result.message)
      router.push(`/dashboard`)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <Input
          name="login"
          value={formValues.login}
          onChange={handleInputChange}
          placeholder="Enter your username"
          className="w-full p-2 border rounded"
        />
        {formErrors.login && (
          <div className="text-red-500">{formErrors.login}</div>
        )}
      </div>
      <div className="mb-4">
        <Input
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          type="password"
          placeholder="Enter your password"
          className="w-full p-2 border rounded"
        />
        {formErrors.password && (
          <div className="text-red-500">{formErrors.password}</div>
        )}
      </div>
      <div className="mb-4">
        <Button
          type="submit"
          className="w-full p-2 bg-input text-white rounded hover-bg-blue-700"
        >
          Log in
        </Button>
      </div>
    </form>
  )
}
