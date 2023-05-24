import React from 'react'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'

export default {
  title: 'CSS Helper Classes/Fonts/Font Sizes',
  parameters: {
    docs: {
      page: () => <HelperClassTemplate />,
    },
  },
} as Record<string, unknown>

const Template = (args) => (
  <HelperClassExample examples={args.fontValues} fonts singleColumn />
)

// TODO: This array does not match the available font sizes in our mixins.scss. These font sizes come from variables.scss. We need to sync up with UX and consolidate our font sizes.
const sizes = [10, 12, 14, 16, 18, 24, 32]

const fontValuesArr = sizes.map((size) => {
  return {
    groupName: `Font Size ${size}px`,
    arr: [
      {
        label: `fs-${size}`,
        children: <div className={`fs-${size}`}>Font Size {size}px</div>,
      },
    ],
  }
})

export const fontSizes = Template.bind({})
fontSizes.args = {
  fontValues: fontValuesArr,
}
fontSizes.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
