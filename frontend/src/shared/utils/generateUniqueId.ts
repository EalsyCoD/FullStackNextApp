/**
 * Generates a unique identifier as a string.
 *
 * @function
 * @returns {string} A unique identifier as a string.
 */

export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9)
}
