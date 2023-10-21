/**
 * Validation result.
 * @typedef {object} ValidationResult
 * @property {string | null} error - An error message or null if there are no errors.
 */

interface ValidationResult {
  error: string | null
}

/**
 * Validates the username.
 *
 * @param {string} username - The username to be validated.
 * @returns {ValidationResult} - The validation result.
 */

export function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { error: 'Username required' }
  }

  if (username.length < 6) {
    return { error: 'Login must contain at least 6 characters' }
  }

  return { error: null }
}

/**
 * Validates the password.
 *
 * @param {string} password - The password to be validated.
 * @returns {ValidationResult} - The validation result.
 */

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { error: 'Password required' }
  }

  if (password.length < 6) {
    return { error: 'Password must contain at least 6 characters' }
  }

  return { error: null }
}
