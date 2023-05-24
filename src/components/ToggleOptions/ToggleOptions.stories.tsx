import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ToggleOptions from './ToggleOptions'
import { DocsTemplate } from '../../../.storybook'

const options = [
  {
    id: 1,
    text: 'Option 1',
    value: 'option-1',
  },
  {
    id: 2,
    text: 'Option 2',
    value: 'option-2',
  },
  {
    id: 3,
    text: 'Option 3',
    value: 'option-3',
  },
]

const Stories = {
  title: 'Components/FormComponents/ToggleOptions',
  component: ToggleOptions,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof ToggleOptions>

export default Stories

const TemplateGroup: ComponentStory<typeof ToggleOptions> = (args) => {
  const [active, setActive] = useState(options[0])

  const updateSelected = (value: string) => {
    const activeOption = options.find((item) => item.value === value)
    setActive(activeOption || options[0])
  }
  return (
    <ToggleOptions
      {...args}
      state={active}
      stateName='value'
      callout={(_, value) => updateSelected(value)}
    />
  )
}

export const basic = TemplateGroup.bind({})
basic.args = {
  options: options,
  valuesAreBooleans: false,
  disabled: false,
}

export const label = TemplateGroup.bind({})
label.args = {
  options: options,
  labelText: 'The Label',
}

export const rightLabel = TemplateGroup.bind({})
rightLabel.args = {
  options: options,
  labelText: 'The Label',
  rightLabel: 'Right Label',
}

export const required = TemplateGroup.bind({})
required.args = {
  options: options,
  labelText: 'The Label',
  required: true,
}

export const labelTooltip = TemplateGroup.bind({})
labelTooltip.args = {
  options: options,
  labelText: 'The Label',
  labelTooltip: {
    tooltipContent: 'This is the tooltip.',
  },
}

export const noBorder = TemplateGroup.bind({})
noBorder.args = {
  options: options,
  noBorder: true,
}
