import type { AppProps } from 'next/app'
import React from 'react'

import '@/styles/globals.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '@/Context/AuthProvider'
import { ErrorBoundary, ThemeProvider, NetworkStatus } from '@/components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ErrorBoundary>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <NetworkStatus>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Component {...pageProps} />
            </ThemeProvider>
          </AuthProvider>
        </NetworkStatus>
      </ErrorBoundary>
    </div>
  )
}
