import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BackToTop from './BackToTop'
import { DocsTemplate } from '../../../.storybook'

export default {
  title: '[Deprecated]/Components/BackToTop',
  component: BackToTop,
  parameters: {
    docs: {
      page: () => <DocsTemplate deprecated />,
    },
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as ComponentMeta<typeof BackToTop>

const Template: ComponentStory<typeof BackToTop> = (args) => {
  return (
    <div id='containerId'>
      <BackToTop {...args} />
    </div>
  )
}

export const backToTop = Template.bind({})
backToTop.args = {
  listLength: 35,
  containerId: 'containerId',
}
backToTop.storyName = 'BackToTop'
