import { handleNetworkChange } from '@/helpers/network-check'
import React, { useEffect, ReactNode } from 'react'

interface NetworkStatusProps {
  children: ReactNode
}

export const NetworkStatus = ({ children }: NetworkStatusProps) => {
  const [hasNetwork, setHasNetwork] = React.useState(true)
  const [notificationShown, setNotificationShown] = React.useState(false)

  useEffect(() => {
    const checkNetworkStatus = () => {
      if (navigator.onLine) {
        if (!hasNetwork) {
          setNotificationShown(false)
          handleNetworkChange()
          setHasNetwork(true)
        }
      } else if (!navigator.onLine && !notificationShown) {
        setNotificationShown(true)
        handleNetworkChange()
        setHasNetwork(false)
      }
    }

    const intervalId = setInterval(checkNetworkStatus, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [notificationShown]) 

  return <div>{children}</div>
}
