import { useState, useEffect, MutableRefObject } from 'react'

export function useShowElement<T extends Element | null>(
  /** Ref that is assigned to a JSX element */
  ref: MutableRefObject<T>,
  /** How much of the ref element is shown before the observer is triggered. For example: 0.2 */
  threshold?: number
): boolean {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting)
      },
      {
        threshold: threshold ?? 0,
      }
    )
    const refCopy = ref.current
    if (refCopy) {
      observer.observe(refCopy)
    }
    return () => {
      if (refCopy) {
        observer.unobserve(refCopy)
      }
    }
  }, [ref, threshold])
  return isIntersecting
}
