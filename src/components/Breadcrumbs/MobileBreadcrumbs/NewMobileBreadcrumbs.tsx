import React, { useState } from 'react'
import { Mdash, Icon, trimText, Button, Tippy } from '../../../module'
import { TextUnderline } from '../../TextUnderline/TextUnderline'
// import { BreadcrumbType } from '../BreadcrumbLink'
import {
  BreadcrumbArrow,
  BreadcrumbPopoverContent,
} from '../Common/BreadcrumbCommonComponents'
import { NewBreadcrumbsProps } from '../Common/BreadcrumbTypes'
import styles from './_mobile-breadcrumb.module.scss'

const NewMobileBreadcrumbs = ({
  breadcrumbs,
  callout,
  characterLimit = 11,
}: NewBreadcrumbsProps): JSX.Element => {
  const isBreadcrumbLengthLessThanThree = breadcrumbs.length < 3
  const [showTippyPopover, setShowTippyPopover] = useState(false)

  type BreadCrumbWithArrowType = {
    className: string
    name: string
    /** Optionally pass in a character limit */
    charLimit?: number
  }

  const BreadcrumbWithArrow = ({
    className,
    name,
  }: BreadCrumbWithArrowType): JSX.Element => (
    <span className={className}>
      {trimText(name, characterLimit)}
      <BreadcrumbArrow />
    </span>
  )

  return (
    <div className={styles.container}>
      {breadcrumbs.length > 1 ? (
        <Button
          as='unstyled'
          className={styles.backArrowButton}
          onClick={() => callout?.(breadcrumbs[breadcrumbs.length - 2])}
        >
          <Icon icon='arrowLong' customClass={styles.arrowLongIcon} />
        </Button>
      ) : null}

      {/* Display the breadcrumbs when there are less than 3 breadcrumbs */}
      {isBreadcrumbLengthLessThanThree ? (
        <div>
          {breadcrumbs.map((b, i) => {
            if (b.name) {
              if (breadcrumbs.length - 1 !== i) {
                const bStyles =
                  breadcrumbs.length === 2
                    ? styles.twoLevelBreadcrumbPosition
                    : styles.breadcrumbPosition

                return (
                  <BreadcrumbWithArrow
                    key={b.link}
                    className={bStyles}
                    name={b.name}
                  />
                )
              } else {
                return <TextUnderline text={b.name} key={b.link} />
              }
            } else {
              return <Mdash key={b.link} />
            }
          })}
        </div>
      ) : (
        //  When there are more than 3 breadcrumbs we need a popover to display all of the breadcrumbs. It will appear as +2 More...
        <Tippy
          interactive
          appendTo={document.body}
          placement='bottom'
          visible={showTippyPopover}
          onClickOutside={() => {
            setShowTippyPopover(false)
          }}
          content={
            <BreadcrumbPopoverContent
              breadcrumbs={breadcrumbs}
              close={() => setShowTippyPopover(false)}
              callout={callout}
            />
          }
        >
          <div onClick={() => setShowTippyPopover(true)}>
            <div className={styles.breadcrumbTippyTooltipInnerContainer}>
              <BreadcrumbWithArrow
                className={styles.breadcrumbTitleContainer}
                name={breadcrumbs[0].name ?? ''}
              />
              {breadcrumbs?.length === 3 ? (
                <BreadcrumbWithArrow
                  className={styles.breadcrumbTitleContainer}
                  name={breadcrumbs[1].name ?? ''}
                />
              ) : (
                <BreadcrumbWithArrow
                  className={styles.breadcrumbTitleContainer}
                  name={`+${breadcrumbs.length - 2} More...`}
                />
              )}
            </div>
            <div>
              <TextUnderline
                text={breadcrumbs[breadcrumbs.length - 1].name ?? ''}
              />
            </div>
          </div>
        </Tippy>
      )}
    </div>
  )
}

export default NewMobileBreadcrumbs
