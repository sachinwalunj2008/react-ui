import React from 'react'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'
import { replaceSymbol } from '../../../module'

export default {
  title: 'CSS Helper Classes/Fonts/Font Weights',
  parameters: {
    docs: {
      page: () => <HelperClassTemplate />,
    },
  },
} as Record<string, unknown>

const Template = (args) => (
  <HelperClassExample examples={args.fontValues} fonts singleColumn />
)

const weights = [
  'light',
  'regular',
  'light-bold',
  'semi-bold',
  'bold',
  'extra-bold',
]

const fontValuesArr = weights.map((weight) => {
  return {
    groupName: `Font Weight ${replaceSymbol(weight, ' ', '-')}`,
    arr: [
      {
        label: `fw-${weight}`,
        children: <div className={`fw-${weight}`}>Pattern Font Weights</div>,
      },
    ],
  }
})

export const fontWeights = Template.bind({})
fontWeights.args = {
  fontValues: fontValuesArr,
}
fontWeights.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
