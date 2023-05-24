import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import PopoverFormContainer from './PopoverFormContainer'
import { Button } from '../Button/Button'

export default {
  title: 'Components/Popover/PopoverFormContainer',
  component: PopoverFormContainer,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof PopoverFormContainer>

const Template: ComponentStory<typeof PopoverFormContainer> = (args) => (
  <div className='bdr bdrc-light-gray bdrr-4'>
    <PopoverFormContainer {...args} />
  </div>
)

export const basic = Template.bind({})
basic.args = {
  header: 'Storybook Rules',
  children: <div>Are you sure Storybook rules?</div>,
}

export const withFooter = Template.bind({})
withFooter.args = {
  header: 'Storybook Rules',
  children: <div>Are you sure Storybook rules?</div>,
  footerChildren: (
    <div>
      <Button className='mr-16'>No</Button>
      <Button styleType='primary-green'>Yes</Button>
    </div>
  ),
}

export const noBodyPadding = Template.bind({})
noBodyPadding.args = {
  header: 'No Body Padding',
  children: (
    <div>
      This is necessary if there is content that needs to span 100% from left to
      right without a gap.
    </div>
  ),
  noPadding: true,
}

export const noHeaderInMobile = Template.bind({})
noHeaderInMobile.args = {
  header: 'No Header in Mobile',
  children: (
    <div>
      Resize the window to see this in a mobile view if the{' '}
      <code>usedWithMobileDrawer</code> prop is used. The header is removed
      because a mobile drawer comes with a header.
    </div>
  ),
  usedWithMobileDrawer: true,
}
