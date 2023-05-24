import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import Checkbox from './Checkbox'

export default {
  title: 'Components/FormComponents/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(false)

  const inputHandler = (value) => {
    setChecked(value)
  }

  return (
    <Checkbox
      {...args}
      checked={checked}
      callout={(_, value) => inputHandler(value)}
    />
  )
}

export const Standard = Template.bind({})
Standard.args = {
  label: 'Checkbox Label',
}

export const Radio = Template.bind({})
Radio.args = {
  label: 'Radio Label',
  type: 'radio',
}

export const NoLabel = Template.bind({})
NoLabel.args = {
  label: 'No Label',
  hideLabel: true,
}
