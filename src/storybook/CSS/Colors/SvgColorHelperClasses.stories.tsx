import React from 'react'
import { colors } from './colors'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'
import { Icon } from '../../../module'

export default {
  title: 'CSS Helper Classes/Colors/SVG Colors',
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
        label: `svg-${a}`,
        children: <Icon icon='info' customClass={`svg-${a}`} size='24px' />,
      }
    }),
  }
})

export const svgColors = Template.bind({})
svgColors.args = {
  colors: colorArr,
}
svgColors.storyName = 'SVG Colors'
svgColors.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
