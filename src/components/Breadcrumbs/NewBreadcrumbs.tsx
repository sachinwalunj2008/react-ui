import React from 'react'
import { useMediaQuery } from '../../module'
import { NewBreadcrumbsProps } from './Common/BreadcrumbTypes'
import DesktopBreadcrumbs from './DesktopBreadcrumbs/DesktopBreadcrumbs'
import NewMobileBreadcrumbs from './MobileBreadcrumbs/NewMobileBreadcrumbs'

const NewBreadcrumbs = (props: NewBreadcrumbsProps): JSX.Element => {
  const isMobileView = useMediaQuery({ type: 'max', breakpoint: 'md' })

  return isMobileView ? (
    <NewMobileBreadcrumbs {...props} />
  ) : (
    <DesktopBreadcrumbs {...props} />
  )
}

export default NewBreadcrumbs
