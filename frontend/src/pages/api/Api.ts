import { apiConstant } from '@/shared/constants/api.constant'
import axios from 'axios'

/**
 * Refreshes the access token.
 *
 * @param {string} token - The current access token.
 * @returns {Promise<boolean>} - A promise that resolves to true if token refresh is successful, otherwise false.
 */

export const refreshAccessToken = async (
  token: string,
  saveStorage: (newToken: string) => void,
) => {
  try {
    const response = await axios.post(`${apiConstant.api}/refresh-token`, {
      token,
    })
    if (response.status === 200) {
      const data = response.data
      const newToken = data.token
      saveStorage(newToken)
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

/**
 * Authenticates a user by their username and password.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<{ success: boolean, message: string, username?: string }>} - A promise that resolves to an object containing authentication result.
 */

export const authenticateUser = async (
  username: string,
  password: string,
  saveStorage: (newToken: string) => void,
) => {
  try {
    const response = await axios.post(`${apiConstant.api}/login`, {
      username,
      password,
    })

    if (response.status === 200) {
      const data = response.data
      const token = data.token

      saveStorage(token)
      return { success: true, message: 'Successful authorization', username }
    } else {
      return { success: false, message: 'Authentication Error' }
    }
  } catch (error) {
    console.error(error)
    return { success: false, message: `Error during authentication: ${error}` }
  }
}
