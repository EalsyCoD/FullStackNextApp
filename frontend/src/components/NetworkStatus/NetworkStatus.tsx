import { handleNetworkChange } from '@/helpers/NetworkCheck'
import React, { useEffect, ReactNode } from 'react'

interface NetworkStatusProps {
  children: ReactNode
}

export const NetworkStatus = ({ children }: NetworkStatusProps) => {
  const [hasNetwork, setHasNetwork] = React.useState(true)
  useEffect(() => {
    const checkNetworkStatus = () => {
      if (navigator.onLine) {
        if (!hasNetwork) {
          handleNetworkChange()
          setHasNetwork(true)
        }
      } else if (!navigator.onLine) {
        handleNetworkChange()
        setHasNetwork(false)
      }
    }

    const intervalId = setInterval(checkNetworkStatus, 10000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return <div>{children}</div>
}
