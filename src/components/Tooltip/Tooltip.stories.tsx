import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import Tooltip from './Tooltip'
import Icon from '../Icons/Icon'

export default {
  title: 'Components/Tooltips/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args}>{args.children}</Tooltip>
)

export const basic = Template.bind({})
basic.args = {
  children: 'Hover Over Me',
  tooltipContent: 'This is the content inside the tooltip',
}

export const positionTop = Template.bind({})
positionTop.args = {
  children: <Icon icon='info' customClass='svg-blue' />,
  tooltipContent: 'This is the content inside the tooltip',
  position: 'top',
}

export const positionRight = Template.bind({})
positionRight.args = {
  children: <Icon icon='info' customClass='svg-blue' />,
  tooltipContent: 'This is the content inside the tooltip',
  position: 'right',
}

export const positionBottom = Template.bind({})
positionBottom.args = {
  children: <Icon icon='info' customClass='svg-blue' />,
  tooltipContent: 'This is the content inside the tooltip',
  position: 'bottom',
}

export const positionLeft = Template.bind({})
positionLeft.args = {
  children: <Icon icon='info' customClass='svg-blue' />,
  tooltipContent: 'This is the content inside the tooltip',
  position: 'left',
}

export const mobile = Template.bind({})
mobile.args = {
  children: (
    <span>
      Click me in a mobile view to show <code>SideDrawer</code>
    </span>
  ),
  tooltipContent: 'This is the content inside the tooltip',
  useSideDrawerForMobile: true,
}
