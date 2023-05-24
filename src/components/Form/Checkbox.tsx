import React, { useState } from 'react'
import { Icon, Button } from '../../module'
import { chartColors } from '../HeaderMetric/HeaderMetricGroup'
import styles from './_checkbox.module.scss'

export interface CheckboxProps<StateNameType extends number | string> {
  /** Label for the checkbox */
  label: string
  /** Determines whether the checkbox is checked */
  checked?: boolean
  /** Optional function on checkbox click */
  callout?: (stateName: StateNameType | undefined, check: boolean) => void
  /** Unique name for the checkbox */
  name?: string
  /** Name of the state for the checkbox. This would be defined in the component consuming this one. */
  stateName?: StateNameType
  /** Used to show an error state */
  error?: boolean
  /** Used to show a disabled state */
  disabled?: boolean
  /** Optional className that can be provided for styling */
  customClass?: string
  /** Optional className for the label */
  labelClass?: string
  /** Type of checkbox style */
  type?: 'checkbox' | 'radio'
  /** Size of the radio checkbox */
  radioSize?: string
  /** Option to hide the label */
  hideLabel?: boolean
  /** Potential colors that can be used for the checkbox */
  checkboxColor?: chartColors
}
const Checkbox = <StateNameType extends number | string>({
  name = '',
  checked,
  label,
  callout,
  customClass = '',
  stateName,
  type,
  disabled,
  error,
  radioSize,
  labelClass = '',
  hideLabel,
  checkboxColor = 'purple',
}: CheckboxProps<StateNameType>): JSX.Element => {
  const [isChecked, setIsCheck] = useState(false)
  const check = typeof checked === 'boolean' ? checked : isChecked

  const toggleChecked = () => {
    setIsCheck(!check)
    callout?.(stateName, !check)
  }

  const standardSize = radioSize ? radioSize : type === 'radio' ? '12' : '16'
  const styleCheckboxColor = {
    '--checkbox-color': `${
      checkboxColor.length !== 0 ? 'var(--' + checkboxColor + ')' : 'purple'
    }`,
  } as React.CSSProperties

  const style = {
    '--radio-size': `${standardSize}px`,
  } as React.CSSProperties

  return (
    <div
      className={`${styles.checkboxContainer} ${error ? styles.error : ''} ${
        check ? styles.checked : ''
      } ${disabled ? styles.disabled : ''}  ${customClass}`}
    >
      <input
        name={name}
        className={styles.hiddenCheckbox}
        type={type ? type : 'checkbox'}
        disabled={disabled}
      />
      <Button as='unstyled' onClick={toggleChecked} disabled={disabled}>
        <div
          className={`${styles.clickableContainer} ${type ? styles[type] : ''}`}
          style={styleCheckboxColor}
        >
          <div
            className={`${styles.styledCheckbox} ${type ? styles[type] : ''}`}
            style={Object.assign(style, styleCheckboxColor)}
          >
            {check && type !== 'radio' ? (
              <Icon
                icon='checkNoCircle'
                customClass={styles.iconWhite}
                size='10px'
              />
            ) : null}
          </div>
          <label
            className={`${styles.checkboxLabel} ${labelClass} ${
              hideLabel ? styles.hideLabel : ''
            }`}
          >
            {label}
          </label>
        </div>
      </Button>
    </div>
  )
}

export default Checkbox
