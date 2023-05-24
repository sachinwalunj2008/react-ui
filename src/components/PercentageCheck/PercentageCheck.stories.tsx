import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import PercentageCheck from './PercentageCheck'

export default {
  title: 'Components/PercentageCheck',
  component: PercentageCheck,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof PercentageCheck>

const Template: ComponentStory<typeof PercentageCheck> = (args) => (
  <PercentageCheck {...args} />
)

export const base = Template.bind({})
base.args = {
  percent: 0.5,
}

export const decimalScale = Template.bind({})
decimalScale.args = {
  percent: 0.5,
  decimalScale: 2,
}

export const lessThanZeroText = Template.bind({})
lessThanZeroText.args = {
  percent: 0.005,
  lessThanZeroText: 'Percent is between 0 and 1%',
}

export const noConversion = Template.bind({})
noConversion.args = {
  percent: 5,
  noConversion: true,
}

export const roundNumber = Template.bind({})
roundNumber.args = {
  percent: 1.5,
  roundNumber: true,
}

export const customClass = Template.bind({})
customClass.args = {
  percent: 0.5,
  customClass: 'fw-bold',
}
