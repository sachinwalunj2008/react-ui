import React from 'react'
import { Button, PopoverWithConfirmation } from '../../module'
import { ButtonProps } from '../Button/Button'
import styles from './_form-buttons.module.scss'

type FormButtonProps = {
  /** Required callout for each button */
  onClick: React.MouseEventHandler<HTMLButtonElement>
  /** Optionally disable a button */
  disabled?: ButtonProps['disabled']
  /** Optionally pass in children for a button */
  children?: React.ReactNode
}

// don't need an onclick for the save button if we are using popover with confirmation
type SaveButtonWithConfirmationProps = Omit<FormButtonProps, 'onClick'> & {
  popoverWithConfirmationProps: Omit<
    PopoverWithConfirmationProps,
    'styleType' | 'menuButtonProps'
  >
  // Using all props available for this component except for styleType and menuButtonProps
  // because we want styleType to remain 'primary-green' and to keep the save button a single button
}

type SaveButtonWithoutConfirmationProps = FormButtonProps & {
  popoverWithConfirmationProps?: never
}

type SaveButtonProps =
  | SaveButtonWithoutConfirmationProps
  | SaveButtonWithConfirmationProps

type PopoverWithConfirmationProps = React.ComponentProps<
  typeof PopoverWithConfirmation
>

type FormButtonsProps = {
  /** Cancel button props */
  cancelButtonProps: FormButtonProps
  /** Save button props */
  saveButtonProps: SaveButtonProps
  /** Reset button props */
  resetButtonProps?: FormButtonProps
}

const FormButtons = ({
  cancelButtonProps,
  saveButtonProps,
  resetButtonProps,
}: FormButtonsProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {resetButtonProps ? (
        <Button styleType='text-blue' {...resetButtonProps}>
          {resetButtonProps.children ?? 'Reset'}
        </Button>
      ) : (
        <div />
      )}
      <div className={styles.rightButtons}>
        <Button {...cancelButtonProps}>
          {cancelButtonProps.children ?? 'Cancel'}
        </Button>
        {saveButtonProps?.popoverWithConfirmationProps ? (
          <PopoverWithConfirmation
            {...saveButtonProps?.popoverWithConfirmationProps}
            styleType='primary-green'
            buttonContent={saveButtonProps.children ?? 'Save'}
          />
        ) : (
          <Button
            {...saveButtonProps}
            styleType='primary-green'
            disabled={saveButtonProps.disabled}
          >
            {saveButtonProps.children ?? 'Save'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default FormButtons
