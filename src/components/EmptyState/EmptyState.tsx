import React from 'react'
import { Button } from '../Button/Button'
import Icon, { IconStringList } from '../Icons/Icon'
import styles from './_empty-state.module.scss'

type ButtonProps = React.ComponentProps<typeof Button>

export type EmptyStateProps = {
  /** Text to display in bold. */
  primaryText: string
  /** Optional secondary text beneath `primaryText`. */
  secondaryText?: string
  /** Optional icon to display at the top. */
  icon?: IconStringList
  /** Optional button to display at bottom. */
  buttonProps?: ButtonProps
  /** Controls whether to show or hide the light gray background. Shows by default. */
  background?: boolean
}

const EmptyState = ({
  primaryText,
  secondaryText,
  icon,
  buttonProps,
  background = true,
}: EmptyStateProps): JSX.Element => {
  return (
    <div
      className={`${background ? styles.background : ''} ${styles.widthFull}`}
    >
      <div className={styles.content}>
        {icon && (
          <Icon icon={icon} size='50px' customClass={styles.iconStyle} />
        )}
        <div className={styles.primaryText}>{primaryText}</div>
        {secondaryText && (
          <div className={styles.secondaryText}>{secondaryText}</div>
        )}
        {!!buttonProps && <Button {...buttonProps} styleType='primary-green' />}
      </div>
    </div>
  )
}

export default EmptyState
