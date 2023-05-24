import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../../.storybook'
import WinnabilityTooltip from './WinnabilityTooltip'

export default {
  title: '[WIP]/WinnabilityTooltip',
  component: WinnabilityTooltip,
  parameters: {
    docs: {
      page: () => <DocsTemplate wip />,
    },
  },
} as ComponentMeta<typeof WinnabilityTooltip>

const Template: ComponentStory<typeof WinnabilityTooltip> = (args) => (
  <WinnabilityTooltip {...args} />
)

export const Default = Template.bind({})
Default.args = {
  active: true,
  payload: [
    {
      payload: {
        name: 'Default',
        x: -1.23,
        y: 123456789,
        z: 987654321,
      },
    },
  ],
}

export const Yellow = Template.bind({})
Yellow.args = {
  active: true,
  payload: [
    {
      payload: {
        name: 'Yellow Underline',
        x: -1.23,
        y: 123456789,
        z: 987654321,
        color: 'var(--chart-dark-1-yellow)',
        incrementalGrowth: -0.123,
      },
    },
  ],
}

export const Red = Template.bind({})
Red.args = {
  active: true,
  payload: [
    {
      payload: {
        name: 'Red Title that is too long to display',
        x: -1.23,
        y: 123456789,
        z: 987654321,
        color: 'var(--chart-dark-2-red)',
        incrementalGrowth: -0.456,
      },
    },
  ],
}
