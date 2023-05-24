import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import Fab from './Fab'
import { toast } from '../Toast/Toast'

export default {
  title: '[Deprecated]/Components/Fab',
  component: Fab,
  parameters: {
    docs: {
      page: () => <DocsTemplate deprecated />,
    },
  },
} as ComponentMeta<typeof Fab>

const Template: ComponentStory<typeof Fab> = (args) => <Fab {...args} />

export const basic = Template.bind({})
basic.args = {
  menu: true,
  callout: () => toast({ message: 'You clicked the button!', type: 'info' }),
}
