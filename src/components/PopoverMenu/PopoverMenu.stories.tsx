import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import PopoverMenu from './PopoverMenu'

export default {
  title: '[Deprecated]/Components/PopoverMenu',
  component: PopoverMenu,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description='This component has historically only been used inside of a Popover component. The Popover component handles the element that opens the popover, while this component essentially is the popover.'
          deprecated
        />
      ),
    },
  },
} as ComponentMeta<typeof PopoverMenu>

const Template: ComponentStory<typeof PopoverMenu> = (args) => (
  <PopoverMenu {...args} />
)

export const basic = Template.bind({})
basic.args = {
  children: <div>This is the content.</div>,
  closeMenu: () => {
    return
  },
}
