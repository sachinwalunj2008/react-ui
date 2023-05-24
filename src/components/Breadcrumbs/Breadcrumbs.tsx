import React from 'react'
import { StandardBreadcrumbsProps } from './StandardBreadcrumbs'
import { useMediaQuery } from '../../module'
import MobileBreadcrumbs from './MobileBreadcrumbs/MobileBreadcrumbs'

const ExtendedBreadcrumbs = React.lazy(
  () =>
    import(
      /* webpackChunkName: "extendedBreadcrumbs" */ './ExtendedBreadcrumbs'
    )
)
const StandardBreadcrumbs = React.lazy(
  () =>
    import(
      /* webpackChunkName: "standardBreadcrumbs" */ './StandardBreadcrumbs'
    )
)
const StandardBreadcrumbsNew = React.lazy(
  () =>
    import(
      /* webpackChunkName: "standardBreadcrumbsNew" */ './StandardBreadcrumbsNew'
    )
)
const ExtendedBreadcrumbsNew = React.lazy(
  () =>
    import(
      /* webpackChunkName: "extendedBreadcrumbsNew" */ './ExtendedBreadcrumbsNew'
    )
)

export type BreadcrumbsType = StandardBreadcrumbsProps & {
  isNewBreadcrumbs?: boolean
  navigateFromBreadcrumbs?: (index?: number, link?: string) => void
  /** This prop is a temporary fix to have a back arrow button visible when breadcrumb length is 1 and previousPageUrl is available */
  /** Right now this prop is only used for the Shelf eventually this will be removed once we have a common breadcrumb experience */
  previousPageUrl?: string
}

const Breadcrumbs = ({
  breadcrumbs,
  characterLimit,
  isNewBreadcrumbs,
  navigateFromBreadcrumbs,
  navigate,
  previousPageUrl = '',
}: BreadcrumbsType): JSX.Element => {
  const extended = isNewBreadcrumbs
      ? ExtendedBreadcrumbsNew
      : ExtendedBreadcrumbs,
    standard = isNewBreadcrumbs ? StandardBreadcrumbsNew : StandardBreadcrumbs,
    BreadcrumbComponent = breadcrumbs.length > 3 ? extended : standard,
    isMobileView = useMediaQuery({ type: 'max', breakpoint: 'md' })

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {isMobileView ? (
        <MobileBreadcrumbs
          breadcrumbs={breadcrumbs}
          navigateFromBreadcrumbs={navigateFromBreadcrumbs}
          previousPageUrl={previousPageUrl}
        />
      ) : (
        <BreadcrumbComponent
          breadcrumbs={breadcrumbs}
          characterLimit={characterLimit}
          navigateFromBreadcrumbs={navigateFromBreadcrumbs}
          navigate={navigate}
        />
      )}
    </React.Suspense>
  )
}

export default Breadcrumbs
