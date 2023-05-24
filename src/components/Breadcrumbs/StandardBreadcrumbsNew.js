import React from 'react'
import { Mdash, Heading1, Icon, trimText, useMediaQuery } from '../../module'

const defaultCharacterLimit = 50

const trimLength = (currentBreadcrumb, breadcrumbs) => {
  const mobileDefaultCharacterLimit = 25
  let charsFor1stBC, charsFor2ndBC, charsFor3rdBC

  // Only 1 Breadcrumb / Main Level
  if (breadcrumbs.length === 1) {
    charsFor1stBC = Math.min(
      breadcrumbs[0].name.length,
      mobileDefaultCharacterLimit
    )
  }

  // 2 Breadcrumbs / first sub-level
  if (breadcrumbs.length === 2) {
    charsFor2ndBC = Math.min(
      breadcrumbs[1].name.length,
      mobileDefaultCharacterLimit - 6
    )
    charsFor1stBC = Math.min(
      breadcrumbs[0].name.length,
      mobileDefaultCharacterLimit - charsFor2ndBC
    )
  }

  // 3 Breadcrumbs / second sub-level
  if (breadcrumbs.length === 3) {
    charsFor3rdBC = Math.min(
      breadcrumbs[2].name.length,
      mobileDefaultCharacterLimit - 13
    )
    charsFor1stBC = Math.min(
      breadcrumbs[0].name.length,
      mobileDefaultCharacterLimit - charsFor3rdBC - 6
    )
    charsFor2ndBC = Math.min(
      breadcrumbs[1].name.length,
      mobileDefaultCharacterLimit - charsFor1stBC - charsFor3rdBC
    )
  }

  return [charsFor1stBC, charsFor2ndBC, charsFor3rdBC][currentBreadcrumb]
}

const StandardBreadcrumbsNew = ({
  breadcrumbs,
  characterLimit = defaultCharacterLimit,
  navigateFromBreadcrumbs,
}) => {
  const isMobileView = useMediaQuery({ type: 'max', breakpoint: 'md' })
  const trim = (text, charLimit, index) => {
    return isMobileView
      ? trimText(text, trimLength(index, breadcrumbs))
      : trimText(text, charLimit)
  }

  return (
    <div className='breadcrumbs'>
      {breadcrumbs.map((b, i) => {
        if (b.name) {
          if (breadcrumbs.length - 1 !== i) {
            return (
              <span
                className={`breadcrumb cursor-pointer`}
                key={`${b.name}_${b.link ? b.link : ''}`}
                onClick={() => navigateFromBreadcrumbs(i, b.link)}
              >
                {trim(b.name, characterLimit, i)}
                <Icon icon='popoverTriangle' customClass='breadcrumb-arrow' />
              </span>
            )
          } else {
            return (
              <Heading1
                key={b.name}
                text={trim(b.name, characterLimit, i)}
                customClass='animated fadeInDown'
                title={b.name}
                noBottomMargin
              />
            )
          }
        } else {
          return <Mdash key={i} />
        }
      })}
    </div>
  )
}

export default StandardBreadcrumbsNew
