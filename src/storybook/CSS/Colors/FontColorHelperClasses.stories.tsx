import React from 'react'
import { colors } from './colors'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'

export default {
  title: 'CSS Helper Classes/Colors/Font Colors',
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
        label: `fc-${a}`,
        children: <b className={`fc-${a}`}>Color Example</b>,
      }
    }),
  }
})

export const fontColors = Template.bind({})
fontColors.args = {
  colors: colorArr,
}
fontColors.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
