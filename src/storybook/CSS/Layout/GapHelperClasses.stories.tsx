import React from 'react'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'

export default {
  title: 'CSS Helper Classes/Layout/Gaps',
  parameters: {
    docs: {
      page: () => (
        <HelperClassTemplate description='These classes can be used with Flex or Grid.' />
      ),
    },
  },
} as Record<string, unknown>

const Template = (args) => (
  <HelperClassExample examples={args.gaps} fonts singleColumn />
)

const gapSizes = [4, 8, 16]

const gapsArr = gapSizes.map((size) => {
  return {
    groupName: `Gap Size ${size}px`,
    arr: [
      {
        label: `gap-${size}`,
        children: (
          <div className={`flex gap-${size}`}>
            <div className='bgc-purple p-32'></div>
            <div className='bgc-purple p-32'></div>
            <div className='bgc-purple p-32'></div>
          </div>
        ),
      },
    ],
  }
})

export const gaps = Template.bind({})
gaps.args = {
  gaps: gapsArr,
}
gaps.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
