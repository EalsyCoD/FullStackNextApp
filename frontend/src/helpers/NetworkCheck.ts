import { toast } from 'react-toastify'

/**
 * Handles changes in the network connection status and displays a toast message.
 * @function
 * @returns {void}
 *
 * When the function is called, it checks the network connection status using `navigator.onLine`.
 * If the connection is restored (online), it displays a success toast message.
 * If the connection is lost (offline), it displays an error toast message.
 *
 * @example
 * // To handle network changes, call this function.
 * handleNetworkChange();
 */

export function handleNetworkChange() {
  if (navigator.onLine) {
    toast.success('Internet connection has been restored!')
  } else {
    toast.error('Internet connection lost!')
  }
}
