import React from 'react'
import { Button, Icon } from '../../../module'
import { IconStringList } from '../../Icons/Icon'
import styles from './_mobile-side-drawer-options.module.scss'

type CommonOption = {
  /** We require a label to be a part of the Option object so we can display the label. */
  label: string
  /** We need a link to be a part of the Option object if the rows navigate pages. */
  link?: string
  /** Used if the option needs an `Icon`. */
  icon?: {
    name: IconStringList
    width?: string
    height?: string
  }
}

type BaseOption<Option extends CommonOption> = CommonOption & {
  /** The subtabs associated with a specific tab. */
  subrows?: Option[]
}

type MobileSideDrawerOptionsProps<Option extends BaseOption<Option>> = {
  /** An array of Option objects. This is a generic and can be anything. The only thing we require for sure is a `label`. */
  options: Option[]
  /** Callout function that passes back the Option object. */
  callout: (option: Option) => void
  /** The option that is currently selected. This will be matched up with the `label` from the Option object. */
  activeRow: Option['label']
  /** This is needed if we have sub rows that navigate pages. It will help us to determine the active sub row. */
  currentPage?: string
}

const MobileSideDrawerOptions = <Option extends BaseOption<Option>>({
  options,
  callout,
  activeRow,
  currentPage,
}: MobileSideDrawerOptionsProps<Option>): JSX.Element => {
  return (
    <div>
      {options.map((o) => (
        <React.Fragment key={o.label}>
          <div>
            <Button
              as='unstyled'
              onClick={() => callout(o)}
              className={styles.mobileRowContainer}
            >
              <div
                className={`${styles.optionRow} ${
                  activeRow === o.label &&
                  !o.subrows &&
                  (currentPage ? currentPage === o.link : true)
                    ? styles.activeMobileRow
                    : ''
                }`}
              >
                {o.label}
                {o.icon && (
                  <OptionIcon
                    name={o.icon.name}
                    width={o.icon.width}
                    height={o.icon.height}
                  />
                )}
              </div>
            </Button>
          </div>
          {o.subrows &&
            o.subrows.map((s) => (
              <div key={s.label}>
                <Button
                  as='unstyled'
                  onClick={() => callout(s)}
                  className={styles.mobileRowContainer}
                >
                  <div
                    className={`${styles.verticalPadding} ${
                      styles.horizontalPadding
                    } ${
                      activeRow === s.label &&
                      s.link &&
                      (currentPage
                        ? currentPage === s.link || s.link.includes(currentPage)
                        : true)
                        ? styles.activeMobileRow
                        : ''
                    }`}
                  >
                    <div className={styles.subrowOptionIcon}>
                      <Icon icon='l' customClass={styles.iconL} size='6px' />
                      {s.label}
                      {s.icon && (
                        <OptionIcon
                          name={s.icon.name}
                          width={s.icon.width}
                          height={s.icon.height}
                        />
                      )}
                    </div>
                  </div>
                </Button>
              </div>
            ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default MobileSideDrawerOptions

type OptionIconType = {
  name: IconStringList
  width?: string
  height?: string
}

const OptionIcon = ({ name, width, height }: OptionIconType): JSX.Element => {
  return (
    <Icon
      icon={name}
      customClass={styles.leftMargin}
      size={{
        width: width ?? '20px',
        height: height ?? '20px',
      }}
    />
  )
}
