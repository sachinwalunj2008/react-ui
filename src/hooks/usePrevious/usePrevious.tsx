import { useEffect, useRef } from 'react'

export const usePrevious = (value: React.ReactNode): React.ReactNode => {
  const ref = useRef<React.ReactNode>()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
