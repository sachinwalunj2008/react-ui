import React, { createContext, useEffect, useState } from 'react'

export interface Toggle {
  application: string
  enabled: boolean
  key: string
  name: string
}

interface ToggleProviderContextValue {
  toggles: Toggle[] | undefined
}

export const ToggleProviderContext = createContext<ToggleProviderContextValue>({
  toggles: [],
})

interface ToggleProviderProps {
  children: React.ReactNode
  distributionKey: string
  environment: 'development' | 'staging' | 'production'
  errorCallback?: (error: string | Record<string, unknown>) => void
  finishedLoadingCallback?: (isLoaded: boolean) => void
}

const ToggleProvider = ({
  children,
  distributionKey,
  environment,
  errorCallback,
  finishedLoadingCallback,
}: ToggleProviderProps): JSX.Element => {
  const [togglesFromCDN, setTogglesFromCDN] = useState<Toggle[]>()

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    fetch(`/toggle/cdn/${distributionKey}/${environment}`, { signal })
      .then((response) => response.json())
      .then((responseJson) => {
        setTogglesFromCDN(responseJson)
      })
      .catch((error) => {
        if (error?.name === 'AbortError') return
        console.error({ error })
        if (errorCallback) {
          errorCallback(error)
        }
        setTogglesFromCDN([])
      })
      .finally(() => finishedLoadingCallback?.(true))
    return () => {
      controller.abort()
    }
  }, [distributionKey, environment, errorCallback, finishedLoadingCallback])

  return (
    <ToggleProviderContext.Provider
      value={{
        toggles: togglesFromCDN,
      }}
    >
      {children}
    </ToggleProviderContext.Provider>
  )
}

export default ToggleProvider
