import React from 'react'
import EmptyState from './EmptyState'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
    controls: { sort: 'requiredFirst' },
  },
} as ComponentMeta<typeof EmptyState>

const Template: ComponentStory<typeof EmptyState> = (args) => (
  <EmptyState {...args} />
)

export const everything = Template.bind({})
everything.args = {
  buttonProps: {
    children: 'Primary Button',
    onClick: () => {
      alert('Button was clicked!')
    },
  },
  icon: 'sellers',
  primaryText: 'PrimaryText Text Here',
  secondaryText: 'Secondary text here for display purposes.',
}

export const noButton = Template.bind({})
noButton.args = {
  icon: 'youtube',
  primaryText: 'PrimaryText Text Here',
}

export const noSecondaryTextOrBackground = Template.bind({})
noSecondaryTextOrBackground.args = {
  buttonProps: {
    children: 'Primary Button',
    onClick: () => {
      alert('Button was clicked!')
    },
  },
  icon: 'sellers',
  primaryText: 'PrimaryText Text Here',
  background: false,
}

export const noButtonOrBackground = Template.bind({})
noButtonOrBackground.args = {
  icon: 'sellers',
  primaryText: 'PrimaryText Text Here',
  secondaryText: 'Secondary text here for display purposes.',
  background: false,
}

export const noIconOrBackground = Template.bind({})
noIconOrBackground.args = {
  buttonProps: {
    children: 'Primary Button',
    onClick: () => {
      alert('Button was clicked!')
    },
  },
  primaryText: 'PrimaryText Text Here',
  secondaryText: 'Secondary text here for display purposes.',
  background: false,
}

export const basic = Template.bind({})
basic.args = {
  primaryText: 'PrimaryText Text Here',
  background: false,
}
