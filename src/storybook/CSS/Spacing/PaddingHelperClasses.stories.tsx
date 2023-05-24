import React from 'react'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'
import { spacingValues } from './spacing-values'

export default {
  title: 'CSS Helper Classes/Spacing/Padding',
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
        label: `p${spacingValue.prefix}${a}`,
        children: (
          <div
            className={`p${spacingValue.prefix}${a} bgc-chart-light-5-green bdr`}
          >
            <div className='p-4 bgc-purple'></div>
          </div>
        ),
      }
    }),
  }
})

export const padding = Template.bind({})
padding.args = {
  spacingValues: spacingValuesArr,
}
padding.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
