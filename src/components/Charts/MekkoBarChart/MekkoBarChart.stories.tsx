import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../../.storybook'
import MekkoBarChart from './MekkoBarChart'
import { fakeData } from './fakeData'

export default {
  title: '[WIP]/MekkoBarChart',
  component: MekkoBarChart,
  parameters: {
    docs: {
      page: () => <DocsTemplate wip />,
    },
  },
} as ComponentMeta<typeof MekkoBarChart>

const Template: ComponentStory<typeof MekkoBarChart> = (args) => (
  <MekkoBarChart {...args} />
)

export const Mekko = Template.bind({})
Mekko.args = {
  data: fakeData,
}
