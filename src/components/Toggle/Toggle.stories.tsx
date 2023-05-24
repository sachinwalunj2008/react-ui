import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'
import { DocsTemplate } from '../../../.storybook'
import Toggle from './Toggle'

export default {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Toggle>

const Template: ComponentStory<typeof Toggle> = (args) => {
  const [checked, setChecked] = useState(args.checked)

  const callout = (val) => {
    setChecked(val)
  }

  return <Toggle {...args} checked={checked} callout={callout} />
}

export const basic = Template.bind({})
basic.args = {
  checked: true,
  disabled: false,
}

export const disabled = Template.bind({})
disabled.args = {
  checked: true,
  disabled: true,
}
