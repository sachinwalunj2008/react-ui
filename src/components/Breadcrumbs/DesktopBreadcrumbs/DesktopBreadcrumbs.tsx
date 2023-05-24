import React, { useState } from 'react'
import { Mdash, Button, TrimText, Tippy } from '../../../module'
import { TextUnderline } from '../../TextUnderline/TextUnderline'
import {
  BreadcrumbArrow,
  BreadcrumbPopoverContent,
} from '../Common/BreadcrumbCommonComponents'
import {
  NewBreadcrumbsProps,
  NewBreadcrumbType,
} from '../Common/BreadcrumbTypes'
import styles from './_desktop-breadcrumbs.module.scss'

const DesktopBreadcrumbs = ({
  breadcrumbs,
  characterLimit = 15,
  callout,
}: NewBreadcrumbsProps): JSX.Element => {
  const [showTippyPopover, setShowTippyPopover] = useState(false)
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]

  const Breadcrumb = ({ breadcrumb }: { breadcrumb: NewBreadcrumbType }) => (
    <Button
      as='unstyled'
      className={styles.breadcrumb}
      onClick={() => callout?.(breadcrumb)}
    >
      <TrimText
        text={breadcrumb.name ?? ''}
        limit={characterLimit}
        customClass={styles.breadcrumbFontSize}
      />
    </Button>
  )

  const Standard = () => (
    <>
      {breadcrumbs.map((b, i) => {
        if (b.name) {
          if (breadcrumbs.length - 1 !== i) {
            return (
              <>
                <Breadcrumb
                  breadcrumb={b}
                  key={`${b.name}_${b.link ? b.link : ''}`}
                />
                <BreadcrumbArrow />
              </>
            )
          } else {
            return <TextUnderline key={b.link} text={b.name} />
          }
        } else {
          return <Mdash key={b.link} />
        }
      })}
    </>
  )

  const Extended = () => (
    <>
      <Breadcrumb breadcrumb={breadcrumbs[0]} />
      <BreadcrumbArrow />
      <Tippy
        interactive
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
            isDesktop
          />
        }
      >
        <div>
          <Button as='unstyled' onClick={() => setShowTippyPopover(true)}>
            <span>+{breadcrumbs.length - 2} More...</span>
          </Button>
        </div>
      </Tippy>
      <BreadcrumbArrow />
      {lastBreadcrumb.name ? (
        <TextUnderline text={lastBreadcrumb.name} />
      ) : (
        <Mdash />
      )}
    </>
  )

  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.length > 3 ? <Extended /> : <Standard />}
      {breadcrumbs.length > 1 ? (
        <Button
          className={styles.backButton}
          onClick={() => callout?.(breadcrumbs[breadcrumbs.length - 2])}
        >
          Back
        </Button>
      ) : null}
    </div>
  )
}

export default DesktopBreadcrumbs
