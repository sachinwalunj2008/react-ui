import React, { useRef, useEffect } from 'react'
import { PopoverMenu } from '../../module'
import Downshift, { ControllerStateAndHelpers } from 'downshift'
import PopoverToggle from '../PopoverToggle/PopoverToggle'

/** @deprecated Use PopoverAndMobileDrawer */
const Popover = <ItemGeneric,>(
  props: PopoverProps<ItemGeneric>
): JSX.Element => {
  const {
      customClass,
      customStyles,
      labelText,
      leftIcon,
      children,
      clickText,
      hideCarat,
      position,
      defaultIsOpen,
      disabled,
      offset,
      callout,
      stationary,
      conveyIsOpen,
      onOpen,
      onClose,
      onToggle,
      actionType = 'click',
      direction,
      dropdownClassName = '',
      clickRender,
      fullWidth = false,
      unsetHeight = false,
      mobilePopover,
      animationType,
      top,
      isTextInputOnFocus = false,
    } = props,
    popRef = useRef(null),
    timeoutRef = useRef<number>()

  const closeWithAnimation = (closeMenu: () => void) => {
    const menu = document.querySelector('.dropdown-box')
    menu?.classList.remove('slideInRight')
    menu?.classList.add('slideOutRight')
    timeoutRef.current = window.setTimeout(() => {
      closeMenu()
    }, 500)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    //@ts-expect-error React 18 issue?
    <Downshift
      initialIsOpen={defaultIsOpen}
      ref={popRef}
      stateReducer={(state, changes) => {
        conveyIsOpen?.(!!changes.isOpen)
        if (
          !changes.isOpen &&
          callout &&
          changes.type === '__autocomplete_mouseup__'
        ) {
          callout()
        }
        if (changes.isOpen && !state.isOpen) {
          onOpen?.()
          onToggle?.(changes.isOpen)
        } else if (!changes.isOpen && state.isOpen) {
          onClose?.()
          onToggle?.(!!changes.isOpen)
        }
        return changes
      }}
    >
      {(ds) => {
        if (isTextInputOnFocus) {
          ds.isOpen = true
        }
        return (
          <div className={`popover${fullWidth ? ' full-width' : ''}`}>
            <PopoverToggle
              position={position}
              clickText={clickText}
              labelText={labelText}
              leftIcon={leftIcon}
              customClass={customClass}
              hideCarat={hideCarat || false}
              downshift={ds}
              // @ts-expect-error I don't know how to reconcile the differences here between what PopoverToggle does with callout and how DS handles it.
              callout={ds.toggleMenu}
              disabled={disabled}
              actionType={actionType}
              clickRender={clickRender}
            />
            {ds.isOpen && (
              <PopoverMenu
                position={position}
                customClass={customClass}
                customStyles={customStyles}
                parent={popRef}
                offset={offset}
                top={top}
                stationary={stationary}
                direction={direction}
                closeMenu={ds.closeMenu}
                dropdownClassName={dropdownClassName}
                fullWidth={fullWidth}
                unsetHeight={unsetHeight}
                mobilePopover={mobilePopover}
                animationType={animationType}
              >
                {children(ds.closeMenu, ds.toggleMenu, (closeMenu) => {
                  closeWithAnimation(closeMenu)
                })}
              </PopoverMenu>
            )}
          </div>
        )
      }}
    </Downshift>
  )
}

export default Popover

// the vast majority of this component's props come from the props it just directly passes to the children components
// so to make things more robust, I set as many props as I could to the type of the children, so if the children are ever updated, the update propagates to this component's props as well
type PopoverMenuProps = React.ComponentProps<typeof PopoverMenu>
type PopoverToggleProps = React.ComponentProps<typeof PopoverToggle>

type PopoverProps<ItemGeneric> = {
  customClass?: PopoverMenuProps['customClass'] &
    PopoverToggleProps['customClass']
  customStyles?: PopoverMenuProps['customStyles']
  labelText?: PopoverToggleProps['labelText']
  leftIcon?: PopoverToggleProps['leftIcon']
  clickText?: PopoverToggleProps['clickText']
  clickRender?: PopoverToggleProps['clickRender']
  hideCarat?: PopoverToggleProps['hideCarat']
  children: (
    closeMenu: ControllerStateAndHelpers<ItemGeneric>['closeMenu'],
    toggleMenu: ControllerStateAndHelpers<ItemGeneric>['toggleMenu'],
    param3: (closeMenu: () => void) => void
  ) => React.ReactNode
  position?: PopoverMenuProps['position'] & PopoverToggleProps['position']
  actionType?: PopoverToggleProps['actionType']
  disabled?: PopoverToggleProps['disabled']
  offset?: PopoverMenuProps['offset']
  callout?: () => void
  onOpen?: () => void
  onClose?: () => void
  onToggle?: (isOpen: boolean) => void
  stationary?: PopoverMenuProps['stationary']
  conveyIsOpen?: (isOpen: boolean) => void
  direction?: PopoverMenuProps['direction']
  fullWidth?: PopoverMenuProps['fullWidth']
  unsetHeight?: PopoverMenuProps['unsetHeight']
  top?: PopoverMenuProps['top']
  isTextInputOnFocus?: boolean
  dropdownClassName?: PopoverMenuProps['dropdownClassName']
  defaultIsOpen?: boolean
  mobilePopover?: PopoverMenuProps['mobilePopover']
  animationType?: PopoverMenuProps['animationType']
}
