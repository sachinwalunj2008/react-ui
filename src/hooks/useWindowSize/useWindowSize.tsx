import { useEffect, useState } from 'react'
import { debounce } from '../../services/HelperServiceTyped'

type WindowSizeType = {
  width: number | undefined
  height: number | undefined
}

export const useWindowSize = (): WindowSizeType => {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
      width: undefined,
      height: undefined,
    }),
    headerHeight = Number(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--header-height'
      )
    )

  useEffect(() => {
    // Handler to call on window resize with the
    const handleResize = debounce(() => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight - headerHeight,
      })
    }, 250)
    window.addEventListener('resize', handleResize)
    // Initial window size
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [headerHeight])

  return windowSize
}
