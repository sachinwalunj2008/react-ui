import * as React from 'react'
import Tippy, { TippyProps } from '@tippyjs/react'
import { SideDrawer, useMediaQuery, useTippyHide, Button } from '../../module'
import { TippyHideParams } from '../../hooks'
import styles from './_tooltip.module.scss'

const { useState, useEffect, useRef } = React

export type TooltipProps = {
  /** The element that you need to hover to show the tooltip. */
  children: React.ReactNode
  /** The content inside of the tooltip. */
  tooltipContent: React.ReactNode
  /** The position of the tooltip. */
  position?: TippyProps['placement']
  /** Optional className for the tooltip. */
  customClass?: string
  /** Optional Tippy props to be passed into the tooltip. */
  extraProps?: Omit<TippyProps, 'placement'>
  /** Optional prop to restrict the max width of the tooltip. */
  maxWidth?: string
  /** Optional prop to show the `SideDrawer` when in a mobile view. */
  useSideDrawerForMobile?: boolean
  /** An optional selector to be passed in - this is needed if you need to dynamically close the tooltip when scrolling by using `useTippyHide`. */
  scrollSelector?: TippyHideParams['scrollSelector']
  /** An optional number to be passed in - this is needed if you need to dynamically close the tooltip when scrolling by using `useTippyHide`. */
  scrollDistance?: TippyHideParams['scrollDistance']
}
const Tooltip = ({
  children,
  tooltipContent,
  position = 'right',
  customClass = '',
  extraProps,
  maxWidth = '300px',
  useSideDrawerForMobile = false,
  scrollSelector,
  scrollDistance,
}: TooltipProps): JSX.Element => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const screenLargerThanMd = useMediaQuery({ type: 'min', breakpoint: 'md' })
  const tippyRef = React.useRef(null),
    timeoutRef = useRef<number>(),
    [toolTipVisible, setToolTipVisible] = useTippyHide({
      tippyRef,
      scrollSelector: scrollSelector,
      scrollDistance: scrollDistance,
    })

  useEffect(
    () => () => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
    },
    []
  )

  const showToolTip = React.useCallback(() => {
      timeoutRef.current = window.setTimeout(() => {
        setToolTipVisible(true)
      }, 100)
    }, [setToolTipVisible]),
    hideToolTip = React.useCallback(() => {
      clearTimeout(timeoutRef.current)
      setToolTipVisible(false)
    }, [setToolTipVisible])

  if (useSideDrawerForMobile && !screenLargerThanMd) {
    return (
      <>
        <Button as='unstyled' onClick={() => setMobileDrawerOpen(true)}>
          {children}
        </Button>
        <SideDrawer
          isOpen={mobileDrawerOpen}
          closeCallout={() => setMobileDrawerOpen(false)}
          headerContent=''
          onlyMobile
        >
          {tooltipContent}
        </SideDrawer>
      </>
    )
  } else {
    return (
      <Tippy
        ref={tippyRef}
        placement={position}
        content={tooltipContent}
        className={customClass}
        maxWidth={maxWidth}
        visible={toolTipVisible}
        appendTo={document.body}
        duration={[null, 0]}
        {...extraProps}
      >
        <div
          onMouseEnter={showToolTip}
          onMouseLeave={hideToolTip}
          className={styles.tippyClass}
        >
          {children}
        </div>
      </Tippy>
    )
  }
}

export default Tooltip
