import React from 'react'
import { colors } from './colors'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'

export default {
  title: 'CSS Helper Classes/Colors/Background Colors',
  parameters: {
    docs: {
      page: () => <HelperClassTemplate />,
    },
  },
} as Record<string, unknown>

const Template = (args) => <HelperClassExample examples={args.colors} />

const colorArr = colors.map((color) => {
  return {
    groupName: color.groupName,
    arr: color.colorNames.map((a) => {
      return {
        label: `bgc-${a}`,
        children: <div className={`bgc-${a} p-16`}></div>,
      }
    }),
  }
})

export const backgroundColors = Template.bind({})
backgroundColors.args = {
  colors: colorArr,
}
backgroundColors.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
