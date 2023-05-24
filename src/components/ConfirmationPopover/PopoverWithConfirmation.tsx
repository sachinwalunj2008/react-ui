import { TippyProps } from '@tippyjs/react'
import React, { useState } from 'react'
import {
  Tippy,
  MenuButton,
  ConfirmationPopoverContent,
  useMediaQuery,
  Button,
} from '../../module'

import styles from './_confirmationPopover.module.scss'

export type ConfigConfirmationItem = {
  /** The type of confirmation. This will set the color and the icon of the confirmation. */
  type: 'green' | 'red' | 'blue'
  /** The text that will appear in the header. */
  header: string
  /** The text that will appear in the body. */
  body: string
  /** The text that will appear for the Confirmation button. By default, it will say `Confirm`. */
  confirmButtonText?: string
  /** The callout function for the Confirmation button. */
  confirmCallout: () => void
}

export type OptionItem = {
  /** The name of this confirmation option. This is used to show and hide each confirmation. */
  name: string
  /** The configuration object of the confirmation popover. */
  confirmation?: ConfigConfirmationItem
  /** The displayed action items that take in the `Show` callback to implement a confirmation popover. */
  children?: (show: { show: (name: string) => void }) => React.ReactNode
}

type PopoverWithConfirmationPropsBase = Pick<MenuButtonProps, 'styleType'> & {
  /** The config array of action options */
  options: OptionItem[]
  /** Check to see if this is a menuButton or Tippy button. */
  isMenuButton?: boolean
}

type MenuButtonProps = React.ComponentProps<typeof MenuButton>

type MenuButtonWithConfirmation = PopoverWithConfirmationPropsBase & {
  /** Object of additional MenuButton props needed. */
  menuButtonProps: Omit<MenuButtonProps, 'actionPopoverElement'>
  buttonContent?: never
  tippyProps?: never
}

type TippyWithConfirmation = PopoverWithConfirmationPropsBase & {
  menuButtonProps?: never
  /** The text that will appear on the main button. */
  buttonContent: React.ReactNode
  /** Optional remaining Tippy props object. */
  tippyProps?: Omit<
    TippyProps,
    'visible' | 'children' | 'interactive' | 'content'
  >
}

type PopoverWithConfirmationProps =
  | MenuButtonWithConfirmation
  | TippyWithConfirmation

const PopoverWithConfirmation = ({
  menuButtonProps,
  isMenuButton = false,
  buttonContent,
  styleType = 'secondary',
  tippyProps,
  options,
}: PopoverWithConfirmationProps): JSX.Element => {
  const [showConfirmation, setShowConfirmation] = useState(''),
    [showTippyPopover, setShowTippyPopover] = useState(false),
    screenIsMdMin = useMediaQuery({ type: 'min', breakpoint: 'md' })

  const cancel = () => {
    setShowConfirmation('')
    setShowTippyPopover(false)
  }

  const show = (name: string) => {
    setShowConfirmation(name)
  }

  const closePopover = () => {
    setShowTippyPopover(false)
  }

  const confirm = (close: () => void, callout?: () => void) => {
    close()
    callout?.()
    setShowConfirmation('')
  }

  const openConfirmation =
    options.length > 1
      ? options?.find((option) => {
          return option.name === showConfirmation
        })
      : options[0]

  const tippyPlacement = tippyProps?.placement ?? 'left',
    menuButtonTippyPlacement = menuButtonProps?.tippyPlacement ?? 'left'

  return (
    <div>
      {isMenuButton ? (
        <MenuButton
          {...(menuButtonProps as MenuButtonProps)}
          tippyPlacement={screenIsMdMin ? menuButtonTippyPlacement : 'bottom'}
          actionButtonClassName={`${styles.noPadding} ${
            showConfirmation && !screenIsMdMin
              ? styles[`${openConfirmation?.confirmation?.type}Arrow`]
              : ''
          } ${
            menuButtonProps?.actionButtonClassName
              ? menuButtonProps?.actionButtonClassName
              : ''
          }`}
          styleType={styleType}
          actionPopoverElement={({ close }) => (
            <PopoverContent
              options={options}
              showConfirmation={showConfirmation}
              confirm={confirm}
              show={show}
              close={close}
              cancel={cancel}
            />
          )}
          onClickOutside={cancel}
        />
      ) : (
        <Tippy
          {...tippyProps}
          placement={screenIsMdMin ? tippyPlacement : 'bottom'}
          className={`${styles.noPadding} ${
            showConfirmation && !screenIsMdMin
              ? styles[`${openConfirmation?.confirmation?.type}Arrow`]
              : ''
          } ${tippyProps?.className ? tippyProps?.className : ''}`}
          interactive={true}
          appendTo={document.body}
          duration={tippyProps?.duration ?? [300, 0]}
          content={
            options.length === 1 ? (
              <ConfirmationPopoverContent
                body={options[0]?.confirmation?.body ?? ''}
                header={options[0]?.confirmation?.header ?? ''}
                type={options[0]?.confirmation?.type ?? 'green'}
                cancelCallout={cancel}
                confirmCallout={() =>
                  confirm(
                    closePopover,
                    options[0]?.confirmation?.confirmCallout
                  )
                }
                confirmButtonText={options[0]?.confirmation?.confirmButtonText}
              />
            ) : (
              <PopoverContent
                options={options}
                showConfirmation={showConfirmation}
                confirm={confirm}
                show={show}
                close={closePopover}
                cancel={cancel}
              />
            )
          }
          visible={showTippyPopover}
          onClickOutside={() => {
            setShowTippyPopover(false)
            setShowConfirmation('')
          }}
        >
          <span>
            <Button
              styleType={styleType}
              onClick={() => {
                options.length === 1 &&
                  show(options[0]?.confirmation?.type ?? 'green')
                setShowTippyPopover(true)
              }}
            >
              {buttonContent as TippyProps['children']}
            </Button>
          </span>
        </Tippy>
      )}
    </div>
  )
}

export default PopoverWithConfirmation

type PopoverContentProps = {
  showConfirmation: string
  options: OptionItem[]
  confirm: (close: () => void, callout?: () => void) => void
  show: (name: string) => void
  cancel: () => void
  close: () => void
}

const PopoverContent = ({
  showConfirmation,
  options,
  show,
  cancel,
  confirm,
  close,
}: PopoverContentProps) => {
  return (
    <div
      className={`${
        showConfirmation === '' ? styles.popoverOptionsWrapper : ''
      }`}
    >
      {options.map((option) => (
        <div key={`${option.name}-option`}>
          {option?.confirmation ? (
            showConfirmation === option.name ? (
              <ConfirmationPopoverContent
                body={option.confirmation.body}
                header={option.confirmation.header}
                type={option.confirmation.type}
                cancelCallout={cancel}
                confirmCallout={() =>
                  confirm(close, option.confirmation?.confirmCallout)
                }
                confirmButtonText={option.confirmation?.confirmButtonText}
              />
            ) : (
              <div>
                {showConfirmation === '' && option.children?.({ show })}
              </div>
            )
          ) : (
            showConfirmation === '' && (
              <div onClick={close}>{option.children?.({ show })}</div>
            )
          )}
        </div>
      ))}
    </div>
  )
}
