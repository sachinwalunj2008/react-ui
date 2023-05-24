import React from 'react'
import { PopoverMenu } from '../../module'
import { ControllerStateAndHelpers } from 'downshift'
import PopoverToggle from '../PopoverToggle/PopoverToggle'
/** @deprecated Use PopoverAndMobileDrawer */
declare const Popover: <ItemGeneric>(
  props: PopoverProps<ItemGeneric>
) => JSX.Element
export default Popover
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
