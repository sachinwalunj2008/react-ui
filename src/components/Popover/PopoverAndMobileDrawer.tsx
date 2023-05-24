import * as React from 'react'
import styles from './_popover-and-mobile-drawer.module.scss'
import { Tippy, SideDrawer, useMediaQuery, Button } from '../../module'
import type { TippyProps } from '@tippyjs/react'
const { useState, useCallback, createContext, useMemo, useContext } = React

type SideDrawerProps = React.ComponentPropsWithoutRef<typeof SideDrawer>

type PopoverAndMobileDrawerProps = {
  /** Passed directly to the Tippy component */
  tippyProps?: Omit<
    TippyProps,
    'children' | 'content' | 'interactive' | 'trigger'
  >
  /** Passed directly to the SideDrawer component */
  sideDrawerProps?: Omit<
    SideDrawerProps,
    'children' | 'isOpen' | 'closeCallout' | 'logoUrl'
  >
  /** What shows up in the popup or mobile drawer, depending on screen size */
  content: React.ReactNode
  /** Class name that will be added to the Button that opens the popover */
  toggleClassName?: string
  /** What users click on to cause the popup or mobile drawer to appear */
  children: React.ReactNode
}
/** Meant for interactive popups that use the SideDrawer on mobile. If you don't need something interactive, use Tooltip instead. */
export function PopoverAndMobileDrawer({
  tippyProps = {},
  sideDrawerProps = {},
  content,
  toggleClassName = '',
  children,
}: PopoverAndMobileDrawerProps): JSX.Element {
  const isMobileView = useMediaQuery({ type: 'max', breakpoint: 'md' })
  const [popupOrDrawerOpen, setPopupOrDrawerOpen] = useState(false)
  const togglePopoverOrDrawer = useCallback(
    () => setPopupOrDrawerOpen((prevState) => !prevState),
    []
  )
  const closePopoverOrDrawer = useCallback(
    () => setPopupOrDrawerOpen(false),
    []
  )

  const providerValue = useMemo<PopoverAndMobileDrawerContextValue>(() => {
    return {
      togglePopoverOrDrawer,
      closePopoverOrDrawer: () => setPopupOrDrawerOpen(false),
      openPopoverOrDrawer: () => setPopupOrDrawerOpen(true),
      isOpen: popupOrDrawerOpen,
    }
  }, [togglePopoverOrDrawer, popupOrDrawerOpen])

  return (
    <PopoverAndMobileDrawerContext.Provider value={providerValue}>
      {isMobileView ? (
        <div className={styles.flex}>
          <Button
            as='unstyled'
            className={toggleClassName}
            onClick={togglePopoverOrDrawer}
          >
            {children}
          </Button>
          <SideDrawer
            {...sideDrawerProps}
            children={content}
            isOpen={popupOrDrawerOpen}
            headerContent={sideDrawerProps.headerContent ?? ''}
            closeCallout={togglePopoverOrDrawer}
          />
        </div>
      ) : (
        <Tippy
          {...tippyProps}
          interactive={true}
          content={content}
          visible={popupOrDrawerOpen}
          onClickOutside={closePopoverOrDrawer}
          appendTo={tippyProps?.appendTo ? tippyProps?.appendTo : document.body}
        >
          <span className={styles.flex}>
            <Button as='unstyled' onClick={togglePopoverOrDrawer}>
              {children as TippyProps['children']}
            </Button>
          </span>
        </Tippy>
      )}
    </PopoverAndMobileDrawerContext.Provider>
  )
}

type PopoverAndMobileDrawerContextValue = {
  /** If open, will close the popover/drawer. If closed, will open the popover/drawer */
  togglePopoverOrDrawer: () => void
  /** Explicitly close, even if it's already closed */
  closePopoverOrDrawer: () => void
  /** Explicitly open, even if it's already open */
  openPopoverOrDrawer: () => void
  /** Current status of the popover/drawer */
  isOpen: boolean
}
const PopoverAndMobileDrawerContext =
  createContext<PopoverAndMobileDrawerContextValue>({
    togglePopoverOrDrawer: () => {
      throw new Error(
        `The 'usePopoverAndMobileDrawer() hook must be called in a child of PopoverAndMobileDrawer`
      )
    },
    closePopoverOrDrawer: () => {
      throw new Error(
        `The 'usePopoverAndMobileDrawer() hook must be called in a child of PopoverAndMobileDrawer`
      )
    },
    openPopoverOrDrawer: () => {
      throw new Error(
        `The 'usePopoverAndMobileDrawer() hook must be called in a child of PopoverAndMobileDrawer`
      )
    },
    isOpen: false,
  })

export function usePopoverAndMobileDrawer(): PopoverAndMobileDrawerContextValue {
  return useContext(PopoverAndMobileDrawerContext)
}
