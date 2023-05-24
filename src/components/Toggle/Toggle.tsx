import React from 'react'
import RS, { ReactSwitchProps } from 'react-switch'
import styles from './_toggle.module.scss'

type ToggleProps = {
  /** Checked value of the Switch - boolean */
  checked: ReactSwitchProps['checked']
  /** Disabled state of the Switch - boolean */
  disabled?: ReactSwitchProps['disabled']
  /** function to be executed when the checked status change */
  callout: ReactSwitchProps['onChange']
  /** Optional class for the Switch */
  className?: string
  /** Set as an attribute to the embedded checkbox. This is useful for the associated label, which can point to the id in its htmlFor attribute. */
  customId?: ReactSwitchProps['id']
}

const Toggle = ({
  checked,
  callout,
  className = '',
  customId = '',
  disabled,
}: ToggleProps): JSX.Element => {
  return (
    //@ts-expect-error This is an issue with react-switch. They suggest commenting out this error for now until they have a solution.
    <RS
      checked={checked}
      disabled={disabled}
      onChange={callout}
      handleDiameter={16}
      checkedIcon={false}
      uncheckedIcon={false}
      activeBoxShadow='0px 0px 1px 6px rgba(0, 0, 0, 0.2)'
      height={12}
      width={32}
      className={`${styles.switch} ${checked ? styles.on : ''} ${className}`}
      id={customId}
    />
  )
}

export default Toggle
