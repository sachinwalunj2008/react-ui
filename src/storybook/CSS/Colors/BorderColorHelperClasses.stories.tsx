import React from 'react'
import { colors } from './colors'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'

export default {
  title: 'CSS Helper Classes/Colors/Border Colors',
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
        label: `bdrc-${a}`,
        children: <div className={`bdr bdrc-${a} p-16`}></div>,
      }
    }),
  }
})

export const borderColors = Template.bind({})
borderColors.args = {
  colors: colorArr,
}
borderColors.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
