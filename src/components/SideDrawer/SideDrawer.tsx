import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as ReactDOM from 'react-dom'
import styles from './_side-drawer.module.scss'
import {
  useMediaQuery,
  PopoverHeader,
  Stepper,
  useWindowSize,
} from '../../module'
import { StepperProps } from '../Stepper/Stepper'
const { createPortal } = ReactDOM

type SideDrawerWithText = SideDrawerBase & {
  /** The text to be rendered within the header. */
  headerContent: string
  logoUrl?: never
}

type SideDrawerWithLogo = SideDrawerBase & {
  headerContent?: never
  /** Optional logo to be passed in place of `headerContent` */
  logoUrl: string
}

type SideDrawerBase = {
  /** The content to be rendered within the component. */
  children: React.ReactNode | (({ height }: { height: number }) => JSX.Element)
  /** The open state of SideDrawer. */
  isOpen: boolean
  /** Callout function to close the SideDrawer. */
  closeCallout: React.MouseEventHandler<HTMLButtonElement> & (() => void)
  /** Optional className for the SideDrawer container */
  containerClassName?: string
  /** Optional className for the content */
  contentClassName?: string
  /** The content to be rendered within the footer. */
  footerContent?: React.ReactNode
  /** Optionally render SideDrawer in a mobile view only. */
  onlyMobile?: boolean
  /** Size of the drawer */
  size?: 'sm' | 'lg'
  /** Optionally add the `Stepper` component. */
  stepperProps?: StepperProps
  /** Optionally remove the gradient from the `SideDrawer`. This is useful when the background of the content is something other than white. */
  noGradient?: boolean
}

type SideDrawerProps = SideDrawerWithText | SideDrawerWithLogo

export function SideDrawer({
  children,
  closeCallout,
  containerClassName = '',
  contentClassName = '',
  footerContent,
  headerContent,
  logoUrl,
  isOpen,
  onlyMobile,
  size = 'sm',
  stepperProps,
  noGradient,
}: SideDrawerProps): React.ReactPortal | null {
  const [contentHeight, setContentHeight] = useState('auto')

  if (typeof isOpen !== 'boolean') {
    throw new Error('SideDrawer needs isOpen as a boolean')
  }
  if (!closeCallout || typeof closeCallout !== 'function') {
    throw new Error(
      !closeCallout
        ? "'closeCallout' method is required for SideDrawer to work properly"
        : "'closeCallout' must be a function"
    )
  }

  const screenLargerThanMd = useMediaQuery({ type: 'min', breakpoint: 'md' }),
    hide = screenLargerThanMd && onlyMobile,
    sectionRef = useRef<HTMLDivElement>(null),
    sectionContentRef = useRef<HTMLDivElement>(null),
    footerRef = useRef<HTMLInputElement>(null),
    openDrawer = useRef(false),
    pageDimensions = useWindowSize()
  const sectionContentHeight = useMemo(
    () => sectionContentRef.current?.clientHeight ?? 0,
    //We want to run this effect when the page dimenstions change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageDimensions]
  )

  const handleOutsideClick = React.useMemo(
    () => (event: MouseEvent) => {
      if (sectionRef?.current) {
        const sideDrawerRect = sectionRef.current.getBoundingClientRect()
        const clickPoint = { x: event.clientX, y: event.clientY }

        if (!rectContains(clickPoint, sideDrawerRect) && openDrawer.current) {
          closeCallout()
          openDrawer.current = false // reset openDrawer ref as SideDrawer will be removed from screen
        }
      }
    },
    [closeCallout]
  )

  useEffect(() => {
    setTimeout(() => (openDrawer.current = isOpen)) // wait for SideDrawer to be rendered on screen
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [handleOutsideClick])

  useLayoutEffect(() => {
    if (sectionRef.current) {
      const sectionEl = sectionRef.current

      function transitionStart(evt: TransitionEvent) {
        // we need to make sure we only pay attention to transition events that the section element fires and nothing from the children
        if (evt.target === sectionEl) {
          sectionEl.dataset.drawerState = 'transitioning'
        }
      }

      function transitionEnd(evt?: TransitionEvent) {
        // evt could be undefined, in the case below where we call it manually.
        // otherwise, on all events, we need to make sure we only pay attention to transition events that the section element fires, and nothing from the children
        if (!evt || evt.target === sectionEl) {
          if (sectionEl.dataset.drawerEndStatus === 'open') {
            sectionEl.dataset.drawerState = 'open'
          } else {
            sectionEl.dataset.drawerState = 'closed'
          }
        }
      }

      sectionEl.addEventListener('transitionstart', transitionStart)
      sectionEl.addEventListener('transitionend', transitionEnd)

      // execute one time to set the initial data-drawer-state
      transitionEnd()

      return () => {
        sectionEl.removeEventListener('transitionstart', transitionStart)
        sectionEl.removeEventListener('transitionend', transitionEnd)
      }
    }
  }, [])

  useLayoutEffect(() => {
    const headerHeight = 49, // 49px accounts for the height of `PopoverHeader`
      footerHeight = footerRef.current ? footerRef.current.clientHeight + 1 : 0, // 1px accounts for the border of the footer
      heightToSubtract =
        headerHeight +
        footerHeight +
        16 +
        (stepperProps ? 56 /** Height of the Stepper */ : 0),
      height = `calc(100vh - ${heightToSubtract}px)`
    setContentHeight(height)
  }, [stepperProps])

  // when onlyMobile, we won't use this at all on > md devices
  if (hide) return null

  return createPortal(
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ''} animated`}
      />
      <section
        className={`${styles.container} ${styles[size]} ${containerClassName}`}
        ref={sectionRef}
        tabIndex={isOpen ? 0 : -1}
        data-drawer-end-status={isOpen ? 'open' : 'closed'}
      >
        <PopoverHeader
          {...(logoUrl ? { logoUrl } : { headerText: headerContent ?? '' })}
          closeCallout={closeCallout}
          noBorderRadius
        />
        {stepperProps ? <Stepper {...stepperProps} /> : null}
        <div
          className={`${styles.content} ${contentClassName}`}
          style={{ height: contentHeight }}
          ref={sectionContentRef}
        >
          {!noGradient ? (
            <div
              className={styles.topGradient}
              style={{
                top: stepperProps
                  ? 105 /** Height of header and Stepper combined */
                  : 49 /** Height of header */,
              }}
            />
          ) : null}
          {typeof children === 'function'
            ? children({
                height: sectionContentHeight ? sectionContentHeight - 34 : 0, // 34px accounts for the padding of the content and border widths
              })
            : children}
          {!noGradient ? <div className={styles.bottomGradient} /> : null}
        </div>
        {footerContent && (
          <div className={styles.footer} ref={footerRef}>
            {footerContent}
          </div>
        )}
      </section>
    </>,
    document.querySelector('body') as HTMLBodyElement
  )
}

type Point = {
  x: number
  y: number
}

type Rect = {
  x: number
  y: number
  width: number
  height: number
}

const rectContains = (point: Point, rect: Rect): boolean => {
  return (
    rect.x <= point.x &&
    point.x <= rect.x + rect.width &&
    rect.y <= point.y &&
    point.y <= rect.y + rect.height
  )
}
