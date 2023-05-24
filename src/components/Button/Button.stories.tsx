import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from './Button'
import { DocsTemplate } from '../../../.storybook'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
    controls: { sort: 'requiredFirst' },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const secondary = Template.bind({})
secondary.args = {
  styleType: 'secondary',
  as: 'button',
  children: 'Secondary',
  disabled: false,
}

export const green = Template.bind({})
green.args = {
  styleType: 'primary-green',
  as: 'button',
  children: 'Primary Green',
}
green.storyName = 'Primary Green'

export const primaryBlue = Template.bind({})
primaryBlue.args = {
  styleType: 'primary-blue',
  as: 'button',
  children: 'Primary Blue',
}

export const primaryRed = Template.bind({})
primaryRed.args = {
  styleType: 'primary-red',
  as: 'button',
  children: 'Primary Red',
}

export const tertiary = Template.bind({})
tertiary.args = {
  styleType: 'tertiary',
  as: 'button',
  children: 'Tertiary',
}

export const textRed = Template.bind({})
textRed.args = {
  styleType: 'text-red',
  as: 'button',
  children: 'Text Red',
}

export const textBlue = Template.bind({})
textBlue.args = {
  styleType: 'text-blue',
  as: 'button',
  children: 'Text Blue',
}

export const small = Template.bind({})
small.args = {
  styleType: 'small',
  as: 'button',
  children: 'Add a role',
}

export const smallDisabled = Template.bind({})
smallDisabled.args = {
  styleType: 'small',
  as: 'button',
  disabled: true,
  children: 'Small Disabled',
}

export const unstyled = Template.bind({})
unstyled.args = {
  as: 'unstyled',
  children: 'Unstyled',
}

export const disabledButtonWithTooltip = Template.bind({})
disabledButtonWithTooltip.args = {
  styleType: 'secondary',
  as: 'button',
  children: 'Secondary',
  disabled: true,
  tooltip: {
    tooltipContent: (
      <span>
        Tooltip will appear when button is disabled and tooltip present
      </span>
    ),
    position: 'top',
  },
}
