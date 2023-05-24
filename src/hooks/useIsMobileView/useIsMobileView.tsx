import { useMediaQuery } from '../responsiveHooks'

export const useIsMobileView = (): boolean =>
  useMediaQuery({ type: 'max', breakpoint: 'md' })
