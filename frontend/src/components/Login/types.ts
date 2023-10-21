export interface FormValues {
  login: string
  password: string
}

export type FormValidates = {
  [key: string]: (value: string) => { error: string | null; isValid: boolean }
}

export interface FormErrors {
  login: string | null
  password: string | null
}
