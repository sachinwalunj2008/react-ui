import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { PopoverAndMobileDrawer } from './PopoverAndMobileDrawer'
import Icon from '../Icons/Icon'

export default {
  title: 'Components/Popover/PopoverAndMobileDrawer',
  component: PopoverAndMobileDrawer,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof PopoverAndMobileDrawer>

const PopoverTemplate: ComponentStory<typeof PopoverAndMobileDrawer> = (
  args
) => (
  <PopoverAndMobileDrawer {...args}>
    <Icon customClass='svg-blue' icon='settings' />
  </PopoverAndMobileDrawer>
)

export const PopoverAndMobileDrawerComponent = PopoverTemplate.bind({})

PopoverAndMobileDrawerComponent.args = {
  tippyProps: {
    placement: 'bottom',
    className: 'popover-actions',
    maxWidth: 'none',
    appendTo: document.body,
  },
  content: (
    <div>
      <p>your content goes here</p>
    </div>
  ),
  sideDrawerProps: {
    headerContent: 'Header Content',
  },
}
