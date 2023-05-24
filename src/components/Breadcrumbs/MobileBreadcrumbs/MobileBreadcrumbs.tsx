import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mdash, Icon, trimText, Button, Tippy } from '../../../module'
import { TextUnderline } from '../../TextUnderline/TextUnderline'
import { BreadcrumbType } from '../BreadcrumbLink'
import { BreadcrumbsType } from '../Breadcrumbs'
import { BreadcrumbArrow } from '../Common/BreadcrumbCommonComponents'
import styles from './_mobile-breadcrumb.module.scss'

type BreadcrumbTippyOptionsType = {
  /** Url for the tippy tooltip navigation option */
  link: string
  /** Name to display in the tippy tooltip */
  name?: string
  /** Display "l" icon in the tippy tooltip */
  showIcon?: boolean
}

type BreadCrumbWithArrowType = {
  className: string
  name: string
  index: number
  key?: string
}

const MobileBreadcrumbs = ({
  breadcrumbs,
  navigateFromBreadcrumbs,
  previousPageUrl,
}: BreadcrumbsType): JSX.Element => {
  const previousLink =
    breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : ''
  let spaces = 0
  const isBreadcrumbLengthLessThanThree = breadcrumbs.length < 3
  const [showTippyPopover, setShowTippyPopover] = useState(false)

  const trimLength = (
    currentBreadcrumbIndex: number,
    breadcrumbs: Array<BreadcrumbType>
  ): number => {
    const mobileDefaultCharacterLimit = 30
    let charsFor1stBC, charsFor2ndBC, charsFor3rdBC

    // Only 1 Breadcrumb / Main Level
    if (breadcrumbs.length === 1 && breadcrumbs[0].name) {
      charsFor1stBC = Math.min(
        breadcrumbs[0].name.length,
        mobileDefaultCharacterLimit
      )
    }

    // 2 Breadcrumbs / first sub-level
    if (
      breadcrumbs.length === 2 &&
      breadcrumbs[0].name &&
      breadcrumbs[1].name
    ) {
      charsFor2ndBC = Math.min(
        breadcrumbs[1].name.length,
        mobileDefaultCharacterLimit - 6
      )
      charsFor1stBC = mobileDefaultCharacterLimit
    }

    // 3 Breadcrumbs / second sub-level
    if (
      breadcrumbs.length === 3 &&
      breadcrumbs[0].name &&
      breadcrumbs[1].name &&
      breadcrumbs[2].name
    ) {
      charsFor3rdBC = Math.min(
        breadcrumbs[2].name.length,
        mobileDefaultCharacterLimit
      )
      charsFor1stBC = Math.min(
        breadcrumbs[0].name.length,
        mobileDefaultCharacterLimit - 6
      )
      charsFor2ndBC = Math.min(
        breadcrumbs[1].name.length,
        mobileDefaultCharacterLimit - charsFor1stBC
      )
    }

    return (
      [charsFor1stBC, charsFor2ndBC, charsFor3rdBC][currentBreadcrumbIndex] ||
      mobileDefaultCharacterLimit
    )
  }

  const trim = (text: string, index: number) => {
    return trimText(text, trimLength(index, breadcrumbs))
  }

  const options = breadcrumbs.map(
    (o: BreadcrumbTippyOptionsType, i: number) => {
      if (i > 0) {
        o.showIcon = true
      } else {
        o.showIcon = false
      }
      return o
    }
  )

  /**
   * @param name To diplay the breadcrumb name
   * @param key Unique string to identify each record
   * @returns JSX.Element containing breadcrumb name with popover triangle arrow
   */
  const renderBreadcrumbWithArrow = ({
    className,
    name,
    index,
    key,
  }: BreadCrumbWithArrowType) => (
    <span className={className} key={key}>
      {trim(name, index)}
      <BreadcrumbArrow />
    </span>
  )

  const updateBreadcrumb = (link: string) => {
    setShowTippyPopover(false)
    /** This condition prevents the breadcrumbs from updating when the current breadcrumb is clicked. */
    if (link !== options[options.length - 1].link) {
      navigateFromBreadcrumbs?.(0, link)
    }
  }

  return (
    <div className={styles.container}>
      {/* Display the back arrow button only when there are more than 1 breacrumbs to go back */}
      {breadcrumbs.length > 1 || previousPageUrl ? (
        <Button
          as='unstyled'
          className={styles.backArrowButton}
          onClick={() => {
            breadcrumbs.length === 1 && previousPageUrl
              ? navigateFromBreadcrumbs?.(-1, previousPageUrl)
              : navigateFromBreadcrumbs?.(breadcrumbs.length - 2, previousLink)
          }}
        >
          <Icon icon='arrowLong' customClass={styles.arrowLongIcon} />
        </Button>
      ) : null}

      {/* Display the breacrumbs when there are less than 4 breacrumbs */}
      {isBreadcrumbLengthLessThanThree ? (
        <span className='breadcrumb breadcrumbs-dropdown'>
          <div
            style={{
              display: isBreadcrumbLengthLessThanThree ? 'unset' : 'grid',
            }}
          >
            {breadcrumbs.map((b, i) => {
              if (b.name) {
                if (breadcrumbs.length - 1 !== i) {
                  const bStyles =
                    breadcrumbs.length === 2
                      ? styles.twoLevelBreadcrumbPosition
                      : styles.breadcrumbPosition

                  return renderBreadcrumbWithArrow({
                    className: bStyles,
                    name: b.name,
                    index: i,
                    key: `${b.name}_${b.link ? b.link : ''}`,
                  })
                } else {
                  return (
                    <div key={`${b.name}_${b.link ? b.link : ''}`}>
                      <TextUnderline text={trim(b.name, i)} />
                    </div>
                  )
                }
              } else {
                return <Mdash key={`${b.name}_${b.link ? b.link : ''}`} />
              }
            })}
          </div>
        </span>
      ) : (
        //  When there are more than 3 breacrumbs where first and last breadcrumb are fixed and the middle section displays +2 More... label as Tippy
        <span className='breadcrumb breadcrumbs-dropdown'>
          <Tippy
            interactive
            placement='bottom'
            visible={showTippyPopover}
            onClickOutside={() => {
              setShowTippyPopover(false)
            }}
            content={
              <div className={styles.breadcrumbTooltipContent}>
                {options?.map((opt, i) => {
                  if (i > 1) {
                    spaces = spaces + 8
                  }

                  return (
                    <Link
                      to={opt.link}
                      key={`${opt.name}_${opt.link ? opt.link : ''}`}
                      className={styles.breadcrumbTippyTooltip}
                      onClick={() => updateBreadcrumb(opt.link)}
                    >
                      <span style={i > 1 ? { marginLeft: spaces } : {}}>
                        {opt.showIcon && (
                          <Icon
                            icon='l'
                            // 6px is to align the icon with the breadcrumb title to match with the designs
                            size='6px'
                            customClass={styles.lIcon}
                          />
                        )}
                      </span>
                      <span className={styles.breadcrumbTippyTooltipText}>
                        {i > 0 ? (
                          <span className={styles.leftTooltipTextMargin}></span>
                        ) : (
                          ''
                        )}
                        {options.length - 1 !== i ? (
                          opt.name
                        ) : (
                          <TextUnderline
                            text={options[options.length - 1].name ?? ''}
                            small
                          />
                        )}
                      </span>
                    </Link>
                  )
                })}
              </div>
            }
          >
            <div onClick={() => setShowTippyPopover(true)}>
              <div className={styles.breadcrumbTippyTooltipInnerContainer}>
                {renderBreadcrumbWithArrow({
                  className: styles.breadcrumbTitleContainer,
                  name: breadcrumbs[0].name || '',
                  index: 0,
                })}
                {breadcrumbs?.length === 3
                  ? renderBreadcrumbWithArrow({
                      className: styles.breadcrumbTitleContainer,
                      name: breadcrumbs[1].name || '',
                      index: 1,
                    })
                  : renderBreadcrumbWithArrow({
                      className: styles.breadcrumbTitleContainer,
                      name: `+${breadcrumbs.length - 2} More...`,
                      index: 0,
                    })}
              </div>
              <div>
                <TextUnderline
                  text={trim(
                    breadcrumbs[breadcrumbs.length - 1].name || '',
                    breadcrumbs.length - 1
                  )}
                />
              </div>
            </div>
          </Tippy>
        </span>
      )}
    </div>
  )
}

export default MobileBreadcrumbs
