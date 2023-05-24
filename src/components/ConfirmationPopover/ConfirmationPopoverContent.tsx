import React from 'react'
import { Button, IconStringList } from '../../module'
import PopoverHeader from '../PopoverHeader/PopoverHeader'
import { ConfigConfirmationItem } from './PopoverWithConfirmation'
import styles from './_confirmationPopover.module.scss'

type ConfirmationPopoverContentProps = Pick<
  ConfigConfirmationItem,
  'type' | 'confirmCallout' | 'header' | 'body' | 'confirmButtonText'
> & {
  /** The callout function for the Cancel button. */
  cancelCallout: () => void
}

const ConfirmationPopoverContent = ({
  type,
  header,
  body,
  cancelCallout,
  confirmCallout,
  confirmButtonText = 'Confirm',
}: ConfirmationPopoverContentProps): JSX.Element => {
  let icon: IconStringList = 'check'
  let buttonColor: 'primary-red' | 'primary-green' | 'primary-blue' =
    'primary-green'
  switch (type) {
    case 'red':
      icon = 'flag'
      buttonColor = 'primary-red'
      break
    case 'blue':
      icon = 'info'
      buttonColor = 'primary-blue'
      break
    default:
      break
  }
  return (
    <div className={styles.popoverWrapper}>
      <PopoverHeader headerText={header} styleType={type} icon={icon} />
      <div className={styles.popoverBody}>{body}</div>
      <div className={styles.popoverFooter}>
        <Button styleType='secondary' onClick={cancelCallout}>
          Cancel
        </Button>
        <Button styleType={buttonColor} onClick={confirmCallout}>
          {confirmButtonText}
        </Button>
      </div>
    </div>
  )
}

export default ConfirmationPopoverContent
