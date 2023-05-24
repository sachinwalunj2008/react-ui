import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import InfoTooltip from './InfoTooltip'

export default {
  title: 'Components/Tooltips/InfoTooltip',
  component: InfoTooltip,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof InfoTooltip>

const Template: ComponentStory<typeof InfoTooltip> = (args) => (
  <div className='flex flex-direction-column align-items-center'>
    <InfoTooltip {...args} />
    {args.useSideDrawerForMobile && (
      <span className='mt-8 fs-12'>
        Resize the screen to mobile and click on the icon to see this appear
        with SideDrawer.
      </span>
    )}
  </div>
)

export const basic = Template.bind({})
basic.args = {
  title: 'Info Tooltip',
  text: 'This is the content inside the tooltip',
}

export const image = Template.bind({})
image.args = {
  title: 'Info Tooltip',
  text: 'This is the content inside the tooltip',
  image: 'https://via.placeholder.com/50',
}

export const customContent = Template.bind({})
customContent.args = {
  title: 'Info Tooltip',
  text: 'This is the content inside the tooltip',
  customNode: (
    <div>
      This is where the custom content will go. Worth having? Probably not.
    </div>
  ),
}

export const small = Template.bind({})
small.args = {
  title: 'Info Tooltip',
  text: 'This is the content inside the tooltip',
  size: 'sm',
}

export const extraSmall = Template.bind({})
extraSmall.args = {
  title: 'Info Tooltip',
  text: 'This is the content inside the tooltip',
  size: 'xs',
}

export const sideDrawer = Template.bind({})
sideDrawer.args = {
  title: 'Info Tooltip',
  text: 'This is the content inside the tooltip',
  useSideDrawerForMobile: true,
}
