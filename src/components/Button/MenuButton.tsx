import React, { useCallback, useState, useRef } from 'react'
import { Icon, Tippy, Button, useMediaQuery, Tooltip } from '../../module'
import styles from './_button.module.scss'
import { TippyProps } from '@tippyjs/react'
import type { LinkProps } from 'react-router-dom'
import { TippyHideParams, useTippyHide } from '../../hooks'
import { TooltipProps } from '../Tooltip/Tooltip'

type MenuButtonBaseProps = {
  /** Display element in popover for action portion of button; receives a `close` prop */
  actionPopoverElement: (close: { close: () => void }) => React.ReactNode
  /** Overall color of the button (default: secondary) */
  styleType?:
    | 'primary-green'
    | 'primary-blue'
    | 'primary-red'
    | 'secondary'
    | 'text-red'
    | 'text-blue'
  /** Optional className for the action button popover */
  actionButtonClassName?: string
  /** Text to display on main button */
  mainButtonText: string
  /** Position of the tippy popover */
  tippyPlacement?: TippyProps['placement']
  /** Selector for the element this button is scrollable on */
  scrollSelector?: TippyHideParams['scrollSelector']
  /** This is the distance (in px) needed to hide the Tippy popover when scrolling */
  scrollDistance?: TippyHideParams['scrollDistance']
  /** Function that is called on blur of MenuButton */
  onClickOutside?: () => void
  /** Optional className for the action tippy container popover */
  mainButtonPopoverClassName?: string
  /** Optional prop for disabling main tippy button */
  disabledMainButton?: boolean
  /** Optional prop for disabling secondary action tippy button */
  disabledActionButton?: boolean
  /* Optional props for showing tooltip when main menu button disabled*/
  mainButtonTooltip?: Omit<TooltipProps, 'children'>
}

type MenuButtonMainButtonTippy = MenuButtonBaseProps & {
  /** Display element in popover for main portion of button; receives a `close` prop */
  children: (close: { close: () => void }) => React.ReactNode
  mainButtonAction?: never
  mainButtonType: 'popover'
  mainButtonLink?: never
  mainButtonExternalLink?: never
}

type MenuButtonMainButtonAction = MenuButtonBaseProps & {
  children?: never
  /** Callback function to execute if main button is clicked (only use if no popover element is provided) */
  mainButtonAction: () => void
  /** Type of button to expect for the main button */
  mainButtonType?: 'button'
  mainButtonLink?: never
  mainButtonExternalLink?: never
}

type MenuButtonMainButtonLink = MenuButtonBaseProps & {
  children?: never
  mainButtonAction?: never
  /** Type of button to expect for the main button */
  mainButtonType: 'link'
  /** Internal link for the main button */
  mainButtonLink: LinkProps['to']
  mainButtonExternalLink?: never
}

type MenuButtonMainButtonExternalLink = MenuButtonBaseProps & {
  children?: never
  mainButtonAction?: never
  /** Type of button to expect for the main button */
  mainButtonType: 'externalLink'
  mainButtonLink?: never
  /** External link for the main button */
  mainButtonExternalLink: JSX.IntrinsicElements['a']['href']
}

type MenuButtonProps =
  | MenuButtonMainButtonTippy
  | MenuButtonMainButtonAction
  | MenuButtonMainButtonLink
  | MenuButtonMainButtonExternalLink

const MenuButton = ({
  actionPopoverElement,
  styleType = 'secondary',
  mainButtonText,
  tippyPlacement = 'bottom',
  children,
  mainButtonAction,
  mainButtonType = 'button',
  mainButtonLink,
  mainButtonExternalLink,
  actionButtonClassName = '',
  scrollSelector = '.sticky-table',
  scrollDistance,
  disabledMainButton,
  disabledActionButton,
  onClickOutside,
  mainButtonPopoverClassName = '',
  mainButtonTooltip,
}: MenuButtonProps): JSX.Element => {
  // TIPPY REF
  const tippyRef = useRef(null)

  // ACTION BUTTON COMPONENT
  const [actionVisible, setActionVisible] = useTippyHide({
      tippyRef,
      scrollSelector: scrollSelector,
      scrollDistance: scrollDistance,
    }),
    showActionContent = useCallback(
      () => setActionVisible(true),
      [setActionVisible]
    ),
    handleOutSideClick = () => {
      onClickOutside?.()
      hideActionContent()
    },
    hideActionContent = useCallback(
      () => setActionVisible(false),
      [setActionVisible]
    ),
    actionButtonClasses = `${styles.flexItemsCenter} ${styles.justifyContentCenter} ${styles[styleType]} ${styles.leftHalf}`

  // MAIN BUTTON COMPONENT
  const [mainVisible, setMainVisible] = useState(false),
    showMainContent = useCallback(() => setMainVisible(true), []),
    hideMainContent = useCallback(() => setMainVisible(false), [])

  const handleClick = () => {
    if (children) {
      mainVisible ? hideMainContent() : showMainContent()
    } else {
      mainButtonAction?.()
    }
  }

  const renderComponentWithTooltip = (children: React.ReactNode) => (
    <Tooltip
      tooltipContent={mainButtonTooltip?.tooltipContent}
      position={
        mainButtonTooltip?.position ? mainButtonTooltip?.position : 'bottom'
      }
    >
      {children}
    </Tooltip>
  )

  // Mobile Media Query for tippy width
  const screenIsMdMin = useMediaQuery({ type: 'min', breakpoint: 'md' })
  return (
    <div className={styles.flex} ref={tippyRef}>
      {/* ACTION BUTTON */}
      <Tippy
        content={actionPopoverElement({ close: hideActionContent })}
        interactive
        placement={tippyPlacement}
        maxWidth={screenIsMdMin ? '400px' : 'calc(100vw - 32px)'}
        onClickOutside={handleOutSideClick}
        visible={actionVisible}
        duration={[0, 0]}
        appendTo={document.body}
        className={actionButtonClassName}
      >
        <button
          disabled={disabledActionButton}
          className={actionButtonClasses}
          onClick={actionVisible ? hideActionContent : showActionContent}
        >
          <Icon icon='options' />
        </button>
      </Tippy>

      {/* MAIN BUTTON */}
      {mainButtonType === 'button' && (
        <>
          {disabledMainButton && mainButtonTooltip ? (
            renderComponentWithTooltip(
              <Button
                as={mainButtonType}
                styleType={styleType}
                type='button'
                className={`${styles.rightHalf} ${
                  mainButtonTooltip ? styles.disabled : ''
                }`}
              >
                {mainButtonText}
              </Button>
            )
          ) : (
            <Button
              as={mainButtonType}
              disabled={disabledMainButton}
              onClick={handleClick}
              styleType={styleType}
              type='button'
              className={styles.rightHalf}
            >
              {mainButtonText}
            </Button>
          )}
        </>
      )}
      {mainButtonType === 'link' && (
        <>
          {mainButtonTooltip && disabledMainButton ? (
            renderComponentWithTooltip(
              <Button
                as={mainButtonType}
                to={''}
                styleType={styleType}
                className={`${styles.rightHalf} ${
                  disabledMainButton ? styles.disabled : ''
                }`}
              >
                {mainButtonText}
              </Button>
            )
          ) : (
            <Button
              as={mainButtonType}
              to={mainButtonLink ?? ''}
              styleType={styleType}
              className={styles.rightHalf}
            >
              {mainButtonText}
            </Button>
          )}
        </>
      )}
      {mainButtonType === 'externalLink' && (
        <>
          {mainButtonTooltip && disabledMainButton ? (
            renderComponentWithTooltip(
              <Button
                as={mainButtonType}
                href={''}
                styleType={styleType}
                className={`${styles.rightHalf} ${
                  disabledMainButton ? styles.disabled : ''
                }`}
              >
                {mainButtonText}
              </Button>
            )
          ) : (
            <Button
              as={mainButtonType}
              href={mainButtonExternalLink}
              styleType={styleType}
              className={styles.rightHalf}
            >
              {mainButtonText}
            </Button>
          )}
        </>
      )}
      {mainButtonType === 'popover' && children && (
        <Tippy
          content={children({ close: hideMainContent })}
          interactive
          placement={tippyPlacement}
          maxWidth={screenIsMdMin ? '400px' : 'calc(100vw - 32px)'}
          onClickOutside={hideMainContent}
          visible={mainVisible}
          duration={[null, 0]}
          appendTo={document.body}
          className={mainButtonPopoverClassName}
        >
          <span>
            {mainButtonTooltip && disabledMainButton ? (
              renderComponentWithTooltip(
                <Button
                  as='button'
                  styleType={styleType}
                  type='button'
                  className={`${styles.rightHalf} ${
                    disabledMainButton ? styles.disabled : ''
                  }`}
                >
                  {mainButtonText}
                </Button>
              )
            ) : (
              <Button
                disabled={disabledMainButton}
                as='button'
                onClick={handleClick}
                styleType={styleType}
                type='button'
                className={styles.rightHalf}
              >
                {mainButtonText}
              </Button>
            )}
          </span>
        </Tippy>
      )}
    </div>
  )
}

export default MenuButton
