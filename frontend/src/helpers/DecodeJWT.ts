interface DecodedToken {
  username: string
  exp: number
}

/**
 * Decodes a JSON Web Token (JWT) and extracts the username and expiration timestamp.
 *
 * @param {string} token - The JWT to be decoded.
 * @returns {DecodedToken} An object containing the decoded username and expiration timestamp.
 *
 */

export function decodeJWT(token: string): DecodedToken {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  const decoded = JSON.parse(atob(base64))

  const { username, exp } = decoded

  return { username, exp }
}
