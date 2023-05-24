import React from 'react'
import { Icon, Tooltip } from '../../module'
import { TooltipProps } from '../Tooltip/Tooltip'
import styles from './_form-label.module.scss'

type FormLabelProps = {
  label: React.ReactNode
  rightLabel?: React.ReactNode
  tooltip?: Omit<TooltipProps, 'children'>
  required?: boolean
  active?: boolean
  error?: boolean
  id?: string
}

const FormLabel = ({
  label,
  rightLabel,
  tooltip,
  required,
  active,
  error,
  id,
}: FormLabelProps): JSX.Element => {
  return (
    <label
      className={`${styles.label} ${active ? styles.active : ''} ${
        error ? styles.error : ''
      }`.trim()}
      htmlFor={id}
    >
      <div className={styles.labelContainer}>
        <span>
          {label}
          {required && <span className={styles.requiredAsterisk}>*</span>}
        </span>
        {tooltip && (
          <Tooltip position='right' {...tooltip}>
            <Icon icon='info' customClass={styles.infoIcon} size='14px' />
          </Tooltip>
        )}
      </div>
      {rightLabel && <div className={styles.rightLabel}>{rightLabel}</div>}
    </label>
  )
}

export default FormLabel
