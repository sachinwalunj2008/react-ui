import { RefObject, useEffect, useRef } from 'react'

export const useSearchBarFocus = (
  isOpen: boolean
): RefObject<HTMLInputElement> => {
  const searchBarRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && searchBarRef.current) {
      searchBarRef.current?.focus()
    }
  }, [isOpen])

  return searchBarRef
}
