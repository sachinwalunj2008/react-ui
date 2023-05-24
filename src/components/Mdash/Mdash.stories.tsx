import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Mdash from './Mdash'
import { DocsTemplate } from '../../../.storybook'
const Stories = {
  title: 'Components/Mdash/Mdash',
  component: Mdash,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Mdash>

export default Stories

const Template: ComponentStory<typeof Mdash> = (args) => <Mdash {...args} />

export const basic = Template.bind({})

export const dark = Template.bind({})
dark.args = {
  dark: true,
}
