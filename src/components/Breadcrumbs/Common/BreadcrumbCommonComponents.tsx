import React from 'react'
import { Button } from '../../Button/Button'
import Icon from '../../Icons/Icon'
import { TextUnderline } from '../../TextUnderline/TextUnderline'
import { NewBreadcrumbsProps, NewBreadcrumbType } from './BreadcrumbTypes'
import styles from './_breadcrumb-common-components.module.scss'

const BreadcrumbArrow = () => <span className={styles.arrow} />

type BreadcrumbPopoverContentProps = {
  /** Array of breadcrumbs */
  breadcrumbs: Array<NewBreadcrumbType>
  /** Function to close the popover */
  close: () => void
  /** Breadcrumb callout */
  callout: NewBreadcrumbsProps['callout']
  /** Optionally remove the 1st and last index of the breadcrumbs so they are not shown in the popover. Only the Desktop experience needs this. */
  isDesktop?: boolean
}

const BreadcrumbPopoverContent = ({
  breadcrumbs,
  close,
  callout,
  isDesktop,
}: BreadcrumbPopoverContentProps) => {
  let spaces = 0

  const options = breadcrumbs
    .filter((b, index) => {
      // We want to remove the 1st and last index of the breadcrumbs array when in the desktop version.
      if (isDesktop) {
        return index !== 0 && index !== breadcrumbs.length - 1 ? b : false
      }
      return b
    })
    .map((o: NewBreadcrumbType, i: number) => {
      o.showIcon = i > 0
      return o
    })

  const updateBreadcrumb = (breadcrumb: NewBreadcrumbType) => {
    callout(breadcrumb)
    close()
  }

  return (
    <div className={styles.breadcrumbPopoverContainer}>
      {options?.map((opt, i) => {
        if (i > 1) {
          spaces = spaces + 8
        }

        return (
          <Button
            as='unstyled'
            key={opt.link}
            className={styles.popoverOption}
            onClick={() => updateBreadcrumb(opt)}
          >
            {opt.showIcon && (
              <span style={i > 1 ? { marginLeft: spaces } : {}}>
                <Icon
                  icon='l'
                  // 6px is to align the icon with the breadcrumb title
                  size='6px'
                  customClass={styles.lIcon}
                />
              </span>
            )}
            <span className={styles.popoverOptionText}>
              {options.length - 1 !== i || isDesktop ? (
                opt.name
              ) : (
                <TextUnderline
                  text={options[options.length - 1].name ?? ''}
                  small
                />
              )}
            </span>
          </Button>
        )
      })}
    </div>
  )
}

export { BreadcrumbArrow, BreadcrumbPopoverContent }
