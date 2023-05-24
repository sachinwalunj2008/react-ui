import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import PopoverHeader from './PopoverHeader'
import { toast } from '../../module'

export default {
  title: 'Components/Popover/PopoverHeader',
  component: PopoverHeader,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
    controls: { sort: 'requiredFirst' },
  },
} as ComponentMeta<typeof PopoverHeader>

const Template: ComponentStory<typeof PopoverHeader> = (args) => {
  const { headerText, logoUrl } = args

  return logoUrl ? (
    <PopoverHeader {...args} logoUrl={logoUrl} />
  ) : (
    <PopoverHeader
      {...args}
      logoUrl={undefined}
      headerText={headerText ?? 'Popover Header'}
    />
  )
}

export const basic = Template.bind({})
basic.args = {}

export const red = Template.bind({})
red.args = {
  styleType: 'red',
}

export const green = Template.bind({})
green.args = {
  styleType: 'green',
}

export const blue = Template.bind({})
blue.args = {
  styleType: 'blue',
}

export const basicWithIcon = Template.bind({})
basicWithIcon.args = {
  icon: 'info',
}

export const redWithIcon = Template.bind({})
redWithIcon.args = {
  icon: 'flag',
  styleType: 'red',
}

export const greenWithIcon = Template.bind({})
greenWithIcon.args = {
  icon: 'check',
  styleType: 'green',
}

export const blueWithIcon = Template.bind({})
blueWithIcon.args = {
  icon: 'info',
  styleType: 'blue',
}

const closeCallout = () => {
  toast({ message: 'You clicked close', type: 'success' })
}

export const basicWithClose = Template.bind({})
basicWithClose.args = {
  closeCallout,
}

export const redWithClose = Template.bind({})
redWithClose.args = {
  closeCallout,
  styleType: 'red',
}

export const greenWithClose = Template.bind({})
greenWithClose.args = {
  closeCallout,
  styleType: 'green',
}

export const blueWithClose = Template.bind({})
blueWithClose.args = {
  closeCallout,
  styleType: 'blue',
}

export const basicWithIconAndClose = Template.bind({})
basicWithIconAndClose.args = {
  icon: 'info',
  closeCallout,
}

export const redWithIconAndClose = Template.bind({})
redWithIconAndClose.args = {
  icon: 'flag',
  closeCallout,
  styleType: 'red',
}

export const greenWithIconAndClose = Template.bind({})
greenWithIconAndClose.args = {
  icon: 'check',
  closeCallout,
  styleType: 'green',
}

export const blueWithIconAndClose = Template.bind({})
blueWithIconAndClose.args = {
  icon: 'info',
  closeCallout,
  styleType: 'blue',
}

export const withLogo = Template.bind({})
withLogo.args = {
  logoUrl: 'https://images.pattern.com/library/library-logo.svg',
  closeCallout,
}
