import React from 'react'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'
import { spacingValues } from './spacing-values'

export default {
  title: 'CSS Helper Classes/Spacing/Margins',
  parameters: {
    docs: {
      page: () => <HelperClassTemplate />,
    },
  },
} as Record<string, unknown>

const Template = (args) => <HelperClassExample examples={args.spacingValues} />

const spacingValuesArr = spacingValues.map((spacingValue) => {
  return {
    groupName: spacingValue.groupName,
    arr: spacingValue.values.map((a) => {
      return {
        label: `m${spacingValue.prefix}${a}`,
        children: (
          <div className='bgc-chart-light-5-orange bdr'>
            <div className={`m${spacingValue.prefix}${a} bgc-purple p-4`}></div>
          </div>
        ),
      }
    }),
  }
})

export const margins = Template.bind({})
margins.args = {
  spacingValues: spacingValuesArr,
}
margins.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
