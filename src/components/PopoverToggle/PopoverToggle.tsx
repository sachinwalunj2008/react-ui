import React from 'react'
import { Icon, IconStringList } from '../../module'
import type { ControllerStateAndHelpers } from 'downshift'
import FormLabel from '../FormLabel/FormLabel'
import { TooltipProps } from '../Tooltip/Tooltip'

type ObjWithId = {
  [key in string | number]: unknown
} & {
  id: string | number
}

/**
 * @deprecated ...
 **/
const PopoverToggle = <ItemGeneric extends ObjWithId>({
  downshift,
  callout,
  optionKeyName,
  customClass = '',
  labelText,
  rightLabel,
  leftIcon,
  clickText,
  position,
  isError,
  hideCarat,
  disabled,
  defaultText,
  required,
  clickTextCustomClass,
  actionType = 'click',
  clickRender,
  labelTooltip,
}: PopoverToggleProps<ItemGeneric>): JSX.Element => (
  <div
    onClick={!disabled && actionType === 'click' ? callout : undefined}
    onMouseEnter={
      !disabled && actionType === 'hover' && !downshift.isOpen
        ? callout
        : undefined
    }
    className={`popover-toggle cursor-pointer ${customClass} ${
      isError ? 'error' : ''
    } ${downshift.isOpen ? 'focus' : ''} ${
      !downshift.isOpen &&
      downshift.selectedItem &&
      downshift.selectedItem.id > 0
        ? 'blur'
        : ''
    } ${disabled ? 'disabled' : ''}`}
  >
    {labelText && (
      <FormLabel
        label={labelText}
        rightLabel={rightLabel}
        required={required}
        active={downshift.isOpen}
        tooltip={labelTooltip}
      />
    )}

    <div
      className={`select-box flex ${
        clickTextCustomClass
          ? clickTextCustomClass
          : position === 'right'
          ? 'justify-content-end'
          : ''
      }`}
    >
      {leftIcon && (
        <span className={`left-icon`}>
          <Icon icon={leftIcon} size='20px' />
        </span>
      )}

      {clickRender ? (
        clickRender({ clickText, dsSelectedItem: downshift.selectedItem })
      ) : (
        <span className='selected-text'>
          {clickText
            ? clickText
            : downshift.selectedItem
            ? (downshift.selectedItem[optionKeyName] as unknown as string)
            : defaultText}
        </span>
      )}

      <span className={`carat ${downshift.isOpen ? 'up' : ''}`}>
        {hideCarat ? null : <Icon icon={'carat'} size='10px' />}
      </span>
    </div>
  </div>
)

export default PopoverToggle

interface PopoverToggleProps<ItemGeneric> {
  downshift: ControllerStateAndHelpers<ItemGeneric>
  callout: (event: React.SyntheticEvent<HTMLDivElement>) => void
  optionKeyName: string | number
  customClass?: string
  labelText?: string
  rightLabel?: React.ReactNode
  leftIcon?: IconStringList
  clickText?: React.ReactNode
  position?: 'left' | 'right' | 'middle'
  isError?: boolean
  hideCarat?: boolean
  disabled?: boolean
  defaultText?: string
  actionType?: 'click' | 'hover'
  clickTextCustomClass?: string
  clickRender?: ({
    clickText,
    dsSelectedItem,
  }: {
    clickText?: React.ReactNode
    dsSelectedItem: ItemGeneric | null
  }) => JSX.Element
  required?: boolean
  labelTooltip?: Omit<TooltipProps, 'children'>
}
