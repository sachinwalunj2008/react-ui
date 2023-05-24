import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Heading1 } from '../../module'
import type { Actions, ControllerStateAndHelpers } from 'downshift'

/**
 * @deprecated This component should be deprecated with `Popover` and we should use `PopoverAndMobileDrawer`
 **/
const PopoverMenu = <ItemGeneric,>(
  props: PopoverMenuProps<ItemGeneric>
): JSX.Element => {
  const isCancelled = useRef(false)
  const { customStyles = {} } = props
  const windowWidth = window.innerWidth
  const offset = useCallback(() => {
    if (
      !isCancelled.current &&
      !props.stationary &&
      windowWidth >= 768 &&
      props.parent &&
      props.parent.current
    ) {
      const parent =
        props.parent.current._rootNode.getBoundingClientRect().bottom
      const numberCheck =
        props.offset && !isNaN(props.offset) ? props.offset : 350
      return window.innerHeight - parent <= numberCheck
    } else {
      return false
    }
  }, [props.offset, props.parent, props.stationary, windowWidth])

  const [openDirection, setOpenDirection] = useState(offset())
  const [popHeight, setPopHeight] = useState<number>()

  const pop = useRef<HTMLUListElement>(null)
  const extraItem = useRef<HTMLDivElement>(null)
  const open = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      open.current = true
    }, 100)
    const changeDirectionOnScroll = () => {
      !isCancelled.current && setOpenDirection(offset())
    }
    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 27:
          props.closeMenu()
          break
        default:
          break
      }
    }
    window.addEventListener('scroll', changeDirectionOnScroll, true)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('scroll', changeDirectionOnScroll, true)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [offset, props])

  useEffect(() => {
    return () => {
      isCancelled.current = true
    }
  }, [])

  useEffect(() => {
    const extra = extraItem.current
      ? extraItem.current.getBoundingClientRect().height
      : 0
    !isCancelled.current &&
      setPopHeight((pop.current?.getBoundingClientRect().height ?? 0) + extra)
  }, [props.children])

  const {
    children,
    downshift,
    customClass,
    position,
    optionKeyName = '',
    verticalDisplay,
    stationary,
    selectAllItem,
    selectAllPrefix,
    selectAllSuffix,
    hasLabel,
    direction,
    dropdownClassName = '',
    mobilePopover,
    animationType,
    fullWidth,
    unsetHeight,
    top,
  } = props

  const selectAllText = {
    id: 0,
    [optionKeyName]: props.selectAllItem
      ? props.selectAllItem
      : 'Select All Brands',
  }
  const showTop = useCallback(() => {
    return !stationary && windowWidth >= 768 && openDirection
  }, [stationary, windowWidth, openDirection])

  const outerStyles = {
    '--dropdownHeight': `-${popHeight}px`,
    ...((!showTop() || direction === 'down') && { top: `${top}px` }),
    ...customStyles,
  } as React.CSSProperties

  return (
    <div
      className={`dropdown-box animated ${
        animationType ? animationType : 'fadeInDown'
      } ${position || 'left'} ${verticalDisplay || ''}  ${
        !direction ? (showTop() ? 'top' : 'down') : direction
      } ${customClass || ''} ${mobilePopover ? 'mobile-popover ' : ''}${
        open.current ? 'open' : ''
      } ${hasLabel ? 'with-label' : ''} ${selectAllItem ? 'extraItem' : ''}${
        fullWidth ? ' full-width' : ''
      }`}
      style={outerStyles}
      ref={props?.setRef}
    >
      <div className={`${fullWidth ? ' full-width' : ''}`}>
        <ul
          className={`dropdown ${dropdownClassName}${
            unsetHeight ? ' unset-height' : ''
          }`}
          ref={pop}
        >
          {children}
        </ul>
        {(customClass === 'company' || selectAllItem) && (
          <div
            {...(downshift
              ? downshift.getItemProps({
                  // @ts-expect-error selectAllText may not be an Item. I don't know enough about downshift to fix this at the moment
                  item: selectAllText,
                  className: `dropdown-item highlighted cursor-pointer ${
                    selectAllText[optionKeyName] ===
                    (downshift?.selectedItem as Record<string, unknown>)[
                      optionKeyName
                    ]
                      ? 'selected'
                      : ''
                  }${fullWidth ? ' full-width' : ''}`,
                })
              : {})}
            ref={extraItem}
          >
            {selectAllText[optionKeyName] ===
            (downshift?.selectedItem as Record<string, unknown>)?.[
              optionKeyName
            ] ? (
              <Heading1
                text={`${selectAllPrefix || ''}${selectAllText[optionKeyName]}${
                  selectAllSuffix || ''
                }`}
              />
            ) : (
              `${selectAllPrefix || ''}${selectAllText[optionKeyName]}${
                selectAllSuffix || ''
              }`
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PopoverMenu

type PopoverMenuProps<ItemGeneric> = {
  children: React.ReactNode
  downshift?: ControllerStateAndHelpers<ItemGeneric>
  customClass?: string
  customStyles?: Record<string, unknown>
  position?: 'left' | 'right' | 'middle'
  selectAllItem?: string
  verticalDisplay?: 'up' | 'down'
  direction?: 'top' | 'down'
  animationType?: string
  fullWidth?: boolean
  unsetHeight?: boolean
  top?: number
  stationary?: boolean
  closeMenu: Actions<ItemGeneric>['closeMenu']
  // the typing for 'parent' is whatever a ref passed to <Downshift> is. And that doesn't have a type (as far as I can tell). So for now, use 'any' :(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent?: React.RefObject<any>
  offset?: number
  optionKeyName?: string
  selectAllPrefix?: string
  selectAllSuffix?: string
  hasLabel?: boolean
  dropdownClassName?: string
  mobilePopover?: boolean
  setRef?: React.RefCallback<HTMLDivElement>
}
