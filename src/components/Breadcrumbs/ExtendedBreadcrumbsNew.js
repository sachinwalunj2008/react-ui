import React from 'react'
import { Icon, Heading1, Select, trimText } from '../../module'

const ExtendedBreadcrumbsNew = ({
  breadcrumbs,
  characterLimit,
  navigateFromBreadcrumbs,
}) => {
  let options = breadcrumbs.slice(1, breadcrumbs.length - 1).map((o, i) => {
    if (i > 0) {
      o.icon = <Icon icon='l' />
    }
    return o
  })

  const navigate = (_, value) => {
    if (value) {
      navigateFromBreadcrumbs(null, value.link)
    }
  }

  return (
    <div className='breadcrumbs'>
      <span
        className={`breadcrumb cursor-pointer`}
        onClick={() => navigateFromBreadcrumbs(0, breadcrumbs[0].link)}
      >
        {trimText(breadcrumbs[0].name, characterLimit || 50)}
        <Icon icon='popoverTriangle' customClass='breadcrumb-arrow' />
      </span>
      <span className='breadcrumb breadcrumbs-dropdown'>
        <Select
          name='breadcrumbs-dropdown'
          position={'left'}
          options={options}
          optionKeyName='name'
          stateName={'name'}
          onChange={navigate}
          clickText={`+${breadcrumbs.length - 2} More...`}
          secondaryValue={'icon'}
          secondaryValuePosition='before'
          noSplitValueDivider
        />
        <Icon icon='popoverTriangle' customClass='breadcrumb-arrow' />
      </span>
      <Heading1
        text={trimText(
          breadcrumbs[breadcrumbs.length - 1].name ?? '',
          characterLimit || 50
        )}
        customClass='animated fadeInDown'
        title={breadcrumbs[breadcrumbs.length - 1].name}
        noBottomMargin
      />
    </div>
  )
}

export default ExtendedBreadcrumbsNew
