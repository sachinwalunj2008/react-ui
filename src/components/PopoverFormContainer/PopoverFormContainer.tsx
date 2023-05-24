import React from 'react'
import { useMediaQuery } from '../../module'
import PopoverHeader from '../PopoverHeader/PopoverHeader'
import styles from './_popover-form-container.module.scss'

type PopoverFormContainerProps = {
  /** Text for the header */
  header: string
  /** Children inserted into the body of this popover container. */
  children: React.ReactNode
  /** Any necessary children elements would go here. */
  footerChildren?: React.ReactNode
  /** Optional width to pass if you need to define a specific width. */
  width?: string
  /** Optional `noPadding` prop is used to remove the padding of the body content. */
  noPadding?: boolean
  /** We need to know if this is used with `SideDrawer` because we need to remove the header in mobile if it is used. */
  usedWithMobileDrawer?: boolean
  /** Optional className applied to the footer. */
  footerCustomClass?: string
  testId?: string
}

const PopoverFormContainer = ({
  width = '300px',
  header,
  children,
  footerChildren,
  noPadding,
  usedWithMobileDrawer,
  footerCustomClass = styles.footerContentStyle,
  testId = 'popover-form-container',
}: PopoverFormContainerProps): JSX.Element => {
  const isMobile = useMediaQuery({ type: 'max', breakpoint: 'sm' }),
    showHeader = usedWithMobileDrawer ? !isMobile : true

  return (
    <div style={{ width: width }} data-testid={testId}>
      {showHeader && <PopoverHeader headerText={header} />}
      <div className={!noPadding ? styles.childStyle : ''}>{children}</div>
      {footerChildren && (
        <div className={`${styles.footerChildStyle} ${footerCustomClass}`}>
          {footerChildren}
        </div>
      )}
    </div>
  )
}

export default PopoverFormContainer
