import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { ToastContent, toast } from '../../module'

export default {
  title: 'Components/Toast/ToastContent',
  component: ToastContent,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof ToastContent>

const Template: ComponentStory<typeof ToastContent> = (args) => (
  <ToastContent {...args} />
)

export const success = Template.bind({})
success.args = {
  text: 'Content of the toast',
  type: 'success',
}

export const error = Template.bind({})
error.args = {
  text: 'Content of the toast',
  type: 'error',
}

export const warning = Template.bind({})
warning.args = {
  text: 'Content of the toast',
  type: 'warning',
}

export const info = Template.bind({})
info.args = {
  text: 'Content of the toast',
  type: 'info',
}

export const buttons = Template.bind({})
buttons.args = {
  text: 'Content of the toast',
  type: 'info',
  buttons: [
    {
      as: 'link',
      to: '/',
      children: 'Link Button',
    },
    {
      children: 'Button',
      onClick: () => {
        toast({ message: 'You clicked the button!', type: 'success' })
      },
    },
  ],
}
