import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import Slider from './Slider'

export default {
  title: 'Components/FormComponents/Slider',
  component: Slider,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Slider>

const Template: ComponentStory<typeof Slider> = (args) => {
  const [threshold, setThreshold] = useState<number>(args.value)

  const updateThreshold = (value: number) => {
    setThreshold(value)
  }

  return <Slider {...args} value={threshold} updateValue={updateThreshold} />
}

export const SliderComponent = Template.bind({})
SliderComponent.args = {
  value: 32,
  label: 'Basic Slider',
}
SliderComponent.storyName = 'Basic'

export const required = Template.bind({})
required.args = {
  value: 32,
  label: 'Basic Slider',
  required: true,
}

export const Tooltip = Template.bind({})
Tooltip.args = {
  value: 32,
  label: 'Slider Tooltip',
  tooltip: {
    tooltipContent: 'This is the slider tooltip',
  },
}

export const labelTooltip = Template.bind({})
labelTooltip.args = {
  value: 32,
  label: 'Label Tooltip',
  labelTooltip: {
    tooltipContent: 'This is the label tooltip',
  },
}

export const rightLabel = Template.bind({})
rightLabel.args = {
  value: 32,
  label: 'Label',
  rightLabel: 'Right Label',
}

export const steps = Template.bind({})
steps.args = {
  value: 25,
  label: 'Slider With Steps',
  step: 25,
}

export const largeNumber = Template.bind({})
largeNumber.args = {
  value: 1500000,
  label: 'Large Number',
  min: 1000000,
  max: 2000000,
  step: 100000,
}

export const percentage = Template.bind({})
percentage.args = {
  value: 32,
  label: 'Percentage',
  suffix: '%',
}

export const currency = Template.bind({})
currency.args = {
  value: 32,
  label: 'Currency',
  prefix: '$',
}
