import React from 'react'
import { Icon } from '../../module'
import { Link } from 'react-router-dom'
import { trimText } from '../../services/HelperServiceTyped'

export type BreadcrumbType = {
  /** Link url for breadcrumb navigation */
  link: string
  /** Name to display for the breadcrumb */
  name?: string
}

type BreadcrumbLinkProps = {
  breadcrumb: BreadcrumbType
  /** Optional character limit for long breadcrumb names. This utilitized trimText to cut the text and add an ellipsis. */
  characterLimit?: number
}

const BreadcrumbLink = ({
  breadcrumb,
  characterLimit = 50,
}: BreadcrumbLinkProps): JSX.Element => (
  <Link to={breadcrumb.link}>
    <span className={`breadcrumb`}>
      {trimText(breadcrumb.name, characterLimit)}
      <Icon icon='popoverTriangle' customClass='breadcrumb-arrow' />
    </span>
  </Link>
)

export default BreadcrumbLink
