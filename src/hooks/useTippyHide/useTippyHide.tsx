import { throttle } from 'lodash'
import { useState, useEffect, useRef } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export interface TippyHideParams {
  tippyRef: React.MutableRefObject<Element | null>
  scrollSelector?: string
  // custom distance in pixels above which the tippy needs to disappear
  scrollDistance?: number
  scrollHorizontalDistance?: number
}

export const useTippyHide = ({
  tippyRef,
  scrollSelector,
  scrollDistance = 50,
  scrollHorizontalDistance = 100,
}: TippyHideParams): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [actionVisible, setActionVisible] = useState(false)
  const scrollableRef = useRef<Element | null>(null)

  useEffect(() => {
    let originalTippyRect: DOMRect | null,
      nextTippyRect: DOMRect | null | undefined,
      tippyMenu: Element | null

    const handleScroll = throttle(() => {
      nextTippyRect = tippyMenu?.getBoundingClientRect()
      if (
        originalTippyRect &&
        nextTippyRect &&
        (originalTippyRect?.top < nextTippyRect?.top - scrollDistance ||
          originalTippyRect?.top > nextTippyRect?.top + scrollDistance ||
          originalTippyRect?.left <
            nextTippyRect?.left - scrollHorizontalDistance ||
          originalTippyRect?.left >
            nextTippyRect?.left + scrollHorizontalDistance)
      ) {
        setActionVisible(false)
      }
    }, 50)

    // If a selector string is provided, search for it. If not, it will default to the scrollableRef passed in
    if (scrollSelector) {
      scrollableRef.current = document.body.querySelector(scrollSelector)
    }

    if (actionVisible) {
      tippyMenu = tippyRef.current
      if (tippyMenu) {
        // If scrollableRef is null w/o a selectorString, or the element was not found using the selector, it will default to window
        originalTippyRect = tippyMenu?.getBoundingClientRect()
        if (scrollableRef.current) {
          scrollableRef.current.addEventListener('scroll', handleScroll)
        } else {
          window.addEventListener('scroll', handleScroll, true)
        }
      }
    }

    return () => {
      scrollableRef.current?.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll, true)
      tippyMenu = null
      originalTippyRect = null
      nextTippyRect = null
    }
  }, [
    scrollableRef,
    tippyRef,
    actionVisible,
    scrollSelector,
    scrollDistance,
    scrollHorizontalDistance,
  ])

  return [actionVisible, setActionVisible]
}
