import React, { useState } from 'react'
import {
  ToastContent,
  Icon,
  Button,
  Tippy,
  ConfirmationPopoverContent,
} from '../../module'
import { ConfigConfirmationItem } from '../ConfirmationPopover/PopoverWithConfirmation'
import { ToastContentProps } from '../Toast/ToastContent'
import styles from './_alert.module.scss'

export type AlertTypes = 'success' | 'error' | 'warning' | 'info'

type BaseAlertProps = ToastContentProps & {
  /** Optional class can be added */
  customClass?: string
}

type AlertPropsWithoutCloseButton = BaseAlertProps & {
  close?: never
}

type AlertPropsWithCloseButton = BaseAlertProps & {
  close: {
    /** Close `Alert` function. */
    callout: () => void
    /** Hide or show the close button. */
    show: boolean
    /** Optionally change the behavior for the close button. If set to `confirmation`, then a confirmation will appear when the close button is clicked. */
    confirmation?: ConfigConfirmationItem
  }
}

type AlertProps = AlertPropsWithoutCloseButton | AlertPropsWithCloseButton

const Alert = ({
  customClass = '',
  close,
  ...rest
}: AlertProps): JSX.Element => {
  const [showTippyPopover, setShowTippyPopover] = useState(false),
    { type } = rest

  const alertClassName = styles[`alert--${type}`]

  let iconColor = 'green'
  if (rest.type === 'error') iconColor = 'red'
  if (rest.type === 'info') iconColor = 'blue'
  if (rest.type === 'warning') iconColor = 'dark-yellow'

  const confirm = (close: () => void, callout?: () => void) => {
    close()
    callout?.()
  }

  const closePopover = () => {
    setShowTippyPopover(false)
  }

  const closeIcon = (
    <Icon
      icon='x'
      size='12px'
      customClass={`svg-${iconColor} ${styles.closeButton}`}
    />
  )

  const arrowClass = `${close?.confirmation?.type}Arrow`

  return (
    <div className={`${styles.alert} ${alertClassName} ${customClass}`}>
      <ToastContent {...rest} />
      {close?.show &&
        (close.confirmation ? (
          <Tippy
            placement='bottom'
            className={`${styles.confirmationContainer} ${styles[arrowClass]}`}
            interactive={true}
            duration={[300, 0]}
            appendTo={document.body}
            content={
              <ConfirmationPopoverContent
                body={close.confirmation.body}
                header={close.confirmation.header}
                type={close.confirmation.type ?? 'green'}
                cancelCallout={closePopover}
                confirmCallout={() =>
                  confirm(closePopover, close.confirmation?.confirmCallout)
                }
                confirmButtonText={close.confirmation.confirmButtonText}
              />
            }
            visible={showTippyPopover}
            onClickOutside={() => {
              setShowTippyPopover(false)
            }}
          >
            <span>
              <Button as='unstyled' onClick={() => setShowTippyPopover(true)}>
                {closeIcon}
              </Button>
            </span>
          </Tippy>
        ) : (
          <Button as='unstyled' onClick={close.callout}>
            {closeIcon}
          </Button>
        ))}
    </div>
  )
}

export default Alert
