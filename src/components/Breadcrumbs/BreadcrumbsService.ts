import { isEqual } from 'lodash'
import { NewBreadcrumbType } from './Common/BreadcrumbTypes'

type BreadcrumbArgs = {
  breadcrumb: NewBreadcrumbType
  breadcrumbs: NewBreadcrumbType[]
}

const addNewBreadcrumb = ({ breadcrumb, breadcrumbs }: BreadcrumbArgs) => {
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1],
    updatedBreadcrumbs =
      breadcrumbs.length > 0 && breadcrumb.changeType !== 'rootLevel'
        ? [...breadcrumbs, breadcrumb]
        : [breadcrumb]
  if (
    breadcrumbs.length >= 2 &&
    isEqual(breadcrumb, breadcrumbs[breadcrumbs.length - 2]) &&
    !isEqual(breadcrumb, breadcrumbs[0])
  ) {
    updatedBreadcrumbs.splice(breadcrumbs.length - 2, 2)
  } else {
    if (
      !isEqual(lastBreadcrumb, breadcrumb) &&
      breadcrumb.link !== lastBreadcrumb.link &&
      breadcrumb.name !== lastBreadcrumb.name
    ) {
      localStorage.setItem('breadcrumbs', JSON.stringify(updatedBreadcrumbs))
      return updatedBreadcrumbs
    }
    if (
      breadcrumb.changeType !== 'rootLevel' &&
      (breadcrumb.link === lastBreadcrumb.link ||
        breadcrumb.changeType === 'tab')
    ) {
      lastBreadcrumb.link = breadcrumb.link
      updatedBreadcrumbs.splice(breadcrumbs.length - 1, 1)
    }
  }
  localStorage.setItem('breadcrumbs', JSON.stringify(updatedBreadcrumbs))
  return updatedBreadcrumbs
}

const breadcrumbIndex = ({ breadcrumb, breadcrumbs }: BreadcrumbArgs) => {
  return breadcrumbs.findIndex((crumb) => crumb.link === breadcrumb.link)
}

const breadcrumbNavigation = ({ breadcrumb, breadcrumbs }: BreadcrumbArgs) => {
  const updatedBreadcrumbs = breadcrumbs.slice(
    0,
    breadcrumbIndex({ breadcrumb, breadcrumbs }) + 1
  )
  localStorage.setItem('breadcrumbs', JSON.stringify(updatedBreadcrumbs))
  return updatedBreadcrumbs
}

export { addNewBreadcrumb, breadcrumbIndex, breadcrumbNavigation }
