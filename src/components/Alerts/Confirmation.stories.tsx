import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import Confirmation from './Confirmation'

export default {
  title: '[Deprecated]/Components/Confirmation',
  component: Confirmation,
  parameters: {
    docs: {
      page: () => <DocsTemplate deprecated />,
    },
  },
} as ComponentMeta<typeof Confirmation>

const Template: ComponentStory<typeof Confirmation> = (args) => (
  <Confirmation {...args} />
)

export const basic = Template.bind({})
basic.args = {
  children: <div>The confirmation content goes here.</div>,
  customClasses: {},
}
