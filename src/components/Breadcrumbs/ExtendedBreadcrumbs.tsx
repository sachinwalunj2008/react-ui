import React from 'react'
import { trimText } from '../../services/HelperServiceTyped'
import { Icon, Heading1, Select } from '../../module'
import BreadcrumbLink from './BreadcrumbLink'
import { StandardBreadcrumbsProps } from './StandardBreadcrumbs'

const ExtendedBreadcrumbs = ({
  breadcrumbs,
  characterLimit,
  navigate,
}: StandardBreadcrumbsProps): JSX.Element => {
  const options = breadcrumbs.slice(1, breadcrumbs.length - 1).map((o, i) => {
    // TODO: Fix experience with icon. It is causing errors. Removing it for now.
    // if (i > 0) {
    //   o.icon = <Icon icon='l' />
    // }
    return o
  })

  return (
    <div className='breadcrumbs'>
      <BreadcrumbLink
        breadcrumb={breadcrumbs[0]}
        characterLimit={characterLimit}
      />
      <span className='breadcrumb breadcrumbs-dropdown'>
        {/* TODO: replace `Select` with Tippy and `SelectDisplay` or wait until `Select` is updated to use Tippy. We are having stacking context issues in some cases. */}
        <Select
          name='breadcrumbs-dropdown'
          position={'left'}
          options={options}
          optionKeyName='name'
          stateName={'name'}
          onChange={(_, value) => {
            if (value) {
              navigate?.(value.link)
            }
          }}
          clickText={`+${breadcrumbs.length - 2} More...`}
          secondaryValue={'icon'}
          secondaryValuePosition='before'
        />
        <Icon icon='popoverTriangle' customClass='breadcrumb-arrow' />
      </span>
      <Heading1
        text={trimText(
          breadcrumbs[breadcrumbs.length - 1].name,
          characterLimit || 50
        )}
        customClass='animated fadeInDown'
        title={breadcrumbs[breadcrumbs.length - 1].name}
        noBottomMargin
      />
    </div>
  )
}

export default ExtendedBreadcrumbs
