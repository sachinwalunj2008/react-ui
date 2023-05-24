import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../../.storybook'
import TwoLineDateLabel from './TwoLineDateLabel'

export default {
  title: 'Components/TwoLineDateLabel',
  component: TwoLineDateLabel,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof TwoLineDateLabel>

const Template: ComponentStory<typeof TwoLineDateLabel> = (args) => (
  <TwoLineDateLabel {...args} />
)

export const basic = Template.bind({})
basic.args = {
  x: 10,
  y: 32,
  payload: { value: 593795388000 },
}

export const xTickFormat = Template.bind({})
xTickFormat.args = {
  x: 10,
  y: 32,
  payload: { value: 593795388000 },
  xTickFormat: true,
}
