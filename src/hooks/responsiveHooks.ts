import { useState, useEffect, useMemo } from 'react'

type UseMediaQueryProps = {
  type: 'min' | 'max' | 'exact'
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

export function useMediaQuery({
  type,
  breakpoint,
}: UseMediaQueryProps): boolean {
  // prop validation
  if (!type || !(type === 'min' || type === 'max' || type === 'exact')) {
    throw new Error(
      'useMediaQuery needs a type of either "min", "max", or "exact'
    )
  }
  if (
    !breakpoint ||
    !(
      breakpoint === 'xs' ||
      breakpoint === 'sm' ||
      breakpoint === 'md' ||
      breakpoint === 'lg' ||
      breakpoint === 'xl' ||
      breakpoint === 'xxl'
    )
  ) {
    throw new Error(
      'useMediaQuery needs a breakpoint of either "xs", "sm", "md", "lg", "xl", or "xxl"'
    )
  }

  const mqList = useMemo(
    () => window.matchMedia(getMediaQueryString({ type, breakpoint })),
    [type, breakpoint]
  )
  const [isActive, setIsActive] = useState(mqList.matches)

  useEffect(() => {
    function changeListener(evt: MediaQueryListEvent) {
      setIsActive(evt.matches)
    }

    mqList.addEventListener('change', changeListener)

    return () => {
      mqList.removeEventListener('change', changeListener)
    }
  }, [mqList, setIsActive])

  return isActive
}

export function useGetExactMediaQuery(): UseMediaQueryProps['breakpoint'] {
  const screenIsXs = useMediaQuery({ type: 'exact', breakpoint: 'xs' })
  const screenIsSm = useMediaQuery({ type: 'exact', breakpoint: 'sm' })
  const screenIsMd = useMediaQuery({ type: 'exact', breakpoint: 'md' })
  const screenIsLg = useMediaQuery({ type: 'exact', breakpoint: 'lg' })
  const screenIsXl = useMediaQuery({ type: 'exact', breakpoint: 'xl' })
  const screenIsXxl = useMediaQuery({ type: 'exact', breakpoint: 'xxl' })

  if (screenIsXs) return 'xs'
  if (screenIsSm) return 'sm'
  if (screenIsMd) return 'md'
  if (screenIsLg) return 'lg'
  if (screenIsXl) return 'xl'
  if (screenIsXxl) return 'xxl'
  throw new Error('Could not determine the exact media query')
}

function getMediaQueryString({ type, breakpoint }: UseMediaQueryProps): string {
  if (type === 'min') {
    return getMinMediaQuery(breakpoint)
  } else if (type === 'max') {
    return getMaxMediaQueryMinus1(breakpoint)
  } else {
    return getExactMediaQuery(breakpoint)
  }
}

function getMediaQueryBreakpointInPx(
  breakpoint: UseMediaQueryProps['breakpoint']
): string {
  // use the CSS vars by default so that it's easier to update, but if they're not loaded on the page yet (due to timing issues with loading the CSS) fallback to the hardcoded variables.
  return (
    getComputedStyle(document.body)
      .getPropertyValue(`--breakpoint-${breakpoint}`)
      .trim() || breakpointsToSizes[breakpoint]
  )
}

function getMinMediaQuery(
  breakpoint: UseMediaQueryProps['breakpoint']
): string {
  return `(min-width: ${getMediaQueryBreakpointInPx(breakpoint)})`
}

// we subtract one on the max because if we want to have a media query for something like 'useMediaQuery({type: 'max', breakpoint: 'md'})
// then the resulting media query should look like (max-width: 767px) which is one minus md's breakpoint of 768px
// if it were without the minus1, e.g. (max-width: 768px), then the media query would apply at the md breakpoint which is usually not intended
function getMaxMediaQueryMinus1(
  breakpoint: UseMediaQueryProps['breakpoint']
): string {
  return `(max-width: ${
    parseInt(getMediaQueryBreakpointInPx(breakpoint)) - 1
  }px)`
}

function getExactMediaQuery(breakpoint: UseMediaQueryProps['breakpoint']) {
  const nextUp = nextBreakpointUp[breakpoint]
  if (nextUp) {
    return `${getMinMediaQuery(breakpoint)} and ${getMaxMediaQueryMinus1(
      nextUp
    )}`
  } else {
    // only hits this case in 'xxl' breakpoints, where there is no max
    return getMinMediaQuery(breakpoint)
  }
}

type NextBreakpointUp = {
  xs: 'sm'
  sm: 'md'
  md: 'lg'
  lg: 'xl'
  xl: 'xxl'
  xxl: null
}
const nextBreakpointUp: NextBreakpointUp = {
  xs: 'sm',
  sm: 'md',
  md: 'lg',
  lg: 'xl',
  xl: 'xxl',
  xxl: null,
}

type BreakpointsToSizes = {
  xs: '0'
  sm: '576px'
  md: '768px'
  lg: '992px'
  xl: '1200px'
  xxl: '1680px'
}
// if you change these sizes, then you also need to update _variables.scss too!
const breakpointsToSizes: BreakpointsToSizes = {
  xs: '0',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1680px',
}
