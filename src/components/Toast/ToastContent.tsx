import React from 'react'
import { Icon, IconStringList, Button, useMediaQuery } from '../../module'
import { ButtonProps } from '../Button/Button'
import { ToastTypes } from './Toast'
import styles from './_toast-content.module.scss'

export type ToastContentProps = {
  /** The content displayed inside of the component */
  text: React.ReactNode
  /** Determines the style of the component */
  type: ToastTypes
  /** Optional array of buttons to be added to the right of the main content. The maximum number of buttons is 2. */
  buttons?: [ButtonProps, ButtonProps?]
}

const ToastContent = ({
  text,
  type,
  buttons,
}: ToastContentProps): JSX.Element => {
  const isMobile = useMediaQuery({ type: 'max', breakpoint: 'sm' })

  let icon: IconStringList = 'check'
  let iconColor = styles.iconGreen
  switch (type) {
    case 'error':
      icon = 'flag'
      iconColor = styles.iconRed
      break
    case 'info':
      icon = 'info'
      iconColor = styles.iconBlue
      break
    case 'warning':
      icon = 'info'
      iconColor = styles.iconDarkYellow
      break
    default:
      break
  }

  return (
    <div className={styles.container}>
      <div className={styles.textAndIconContainer}>
        <Icon
          icon={icon}
          size='16px'
          customClass={`${iconColor} ${styles.iconStyles}`}
        />
        <span className={styles.text}>{text}</span>
      </div>
      {!!buttons && (
        <div
          className={styles.buttonsContainer}
          // The buttons need to align with the text above, not the icon. This 23px represent the space on the left in order to align the buttons with the text.
          style={{ marginLeft: isMobile ? '23px' : 0 }}
        >
          {buttons.map((button) => (
            <Button
              {...button}
              key={button?.children?.toString()}
              className={`${styles.button} ${styles[type]} ${button?.className}`}
            >
              {button?.children}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ToastContent
