import React from 'react'
import { trimText } from '../../services/HelperServiceTyped'
import { Mdash, Heading1 } from '../../module'
import BreadcrumbLink, { BreadcrumbType } from './BreadcrumbLink'

export type StandardBreadcrumbsProps = {
  /** Array of breadcrumbs to display. Includes a link url and a name */
  breadcrumbs: Array<BreadcrumbType>
  /** Optional character limit for long breadcrumb names. This utilitized trimText to cut the text and add an ellipsis. */
  characterLimit?: number
  /** Optionally pass in a navigate function (useHistory or useNavigate hook functions) - right now only Shelf needs this until we consolidate ExtendedBreadcrumbs.tsx and ExtendedBreadcrumbsNew.js */
  navigate?: (link: string) => void
}
const StandardBreadcrumbs = ({
  breadcrumbs,
  characterLimit,
}: StandardBreadcrumbsProps): JSX.Element => {
  return (
    <div className='breadcrumbs'>
      {breadcrumbs.map((b, i) => {
        if (b.name) {
          if (breadcrumbs.length - 1 !== i) {
            return (
              <BreadcrumbLink
                key={b.name}
                breadcrumb={b}
                characterLimit={characterLimit}
              />
            )
          } else {
            return (
              <Heading1
                key={b.name}
                text={trimText(b.name, characterLimit || 50)}
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

export default StandardBreadcrumbs
