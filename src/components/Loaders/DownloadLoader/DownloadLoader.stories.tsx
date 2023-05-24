import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../../.storybook'
import DownloadLoader from './DownloadLoader'

export default {
  title: 'Components/Loaders/DownloadLoader',
  component: DownloadLoader,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof DownloadLoader>

const Template: ComponentStory<typeof DownloadLoader> = (args) => (
  <DownloadLoader {...args} />
)

export const basic = Template.bind({})
basic.args = {}

export const customIcon = Template.bind({})
customIcon.args = {
  customIcon: 'info',
}
