import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import Popover from './Popover'

export default {
  title: '[Deprecated]/Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          deprecated
          replacementComponent='PopoverAndMobileDrawer'
        />
      ),
    },
  },
} as ComponentMeta<typeof Popover>

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />

export const basic = Template.bind({})
basic.args = {
  clickText: <div>Click Me</div>,
  children: () => <div>Popover Content</div>,
}
