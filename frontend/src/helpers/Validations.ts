/**
 * Validation result.
 * @typedef {object} ValidationResult
 * @property {string | null} error - An error message or null if there are no errors.
 */

export type ValidationResult = {
  error: string | null // Строка с сообщением об ошибке или null, если ошибки нет
  isValid: boolean // Булевое значение, указывающее, прошла валидация успешно или нет
}

/**
 * Validates the username.
 *
 * @param {string} username - The username to be validated.
 * @returns {ValidationResult} - The validation result.
 */

export function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { error: 'Username required', isValid: false }
  }

  if (username.length < 6) {
    return {
      error: 'Username must contain at least 6 characters',
      isValid: false,
    }
  }
  return { error: null, isValid: true }
}

/**
 * Validates the password.
 *
 * @param {string} password - The password to be validated.
 * @returns {ValidationResult} - The validation result.
 */

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { error: 'Password required', isValid: false }
  }

  if (password.length < 6) {
    return {
      error: 'Password must contain at least 6 characters',
      isValid: false,
    }
  }

  return { error: null, isValid: true }
}
