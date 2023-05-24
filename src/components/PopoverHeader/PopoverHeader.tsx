import React from 'react'
import styles from './_popover-header.module.scss'
import { Icon, Button, IconStringList } from '../../module'

type PopoverHeaderBase = {
  /** Determines the color of the background and icon. */
  styleType?: 'lighter-gray' | 'green' | 'red' | 'blue'
  /** Optional function to call when using the close button. */
  closeCallout?: () => void
  /** Optional icon to include at the left of the header. */
  icon?: IconStringList
  /** Optionally remove the border radius at the top. Should be used for instances like `SideDrawer` */
  noBorderRadius?: boolean
}

type PopoverHeaderWithText = PopoverHeaderBase & {
  /** Text for the header. This is required if a `logoUrl` is not present. */
  headerText: string
  logoUrl?: never
}

type PopoverHeaderWithLogo = PopoverHeaderBase & {
  headerText?: never
  /** Logo for the header. This is required if a `headerText` is not present. */
  logoUrl: string
}

type PopoverHeaderProps = PopoverHeaderWithText | PopoverHeaderWithLogo

const PopoverHeader = ({
  headerText,
  icon,
  styleType = 'lighter-gray',
  closeCallout,
  noBorderRadius,
  logoUrl,
}: PopoverHeaderProps): JSX.Element => {
  const iconColor =
    styleType !== 'lighter-gray' ? styles.whiteIcon : styles.purpleIcon

  return (
    <div
      className={`${styles.container} ${styles[styleType]} ${
        noBorderRadius ? styles.noBorderRadius : ''
      }`}
    >
      <div className={styles.headerTextContainer}>
        {icon ? (
          <Icon
            icon={icon}
            size='16px'
            customClass={`popover-header-icon ${iconColor}`}
          />
        ) : null}
        {logoUrl ? (
          <img src={logoUrl} alt='logo' className={styles.logo} />
        ) : (
          <span>{headerText}</span>
        )}
      </div>
      {!!closeCallout ? (
        <Button as='unstyled' onClick={closeCallout}>
          <Icon
            icon='x'
            size='16px'
            customClass={`popover-header-icon ${iconColor}`}
          />
        </Button>
      ) : null}
    </div>
  )
}

export default PopoverHeader
