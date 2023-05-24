import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TimeframeFilter from './TimeframeFilter'
import { DocsTemplate } from '../../../.storybook'

export default {
  title: 'Components/Timeframe/TimeframeFilter',
  component: TimeframeFilter,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof TimeframeFilter>

const Template: ComponentStory<typeof TimeframeFilter> = (args) => (
  <TimeframeFilter {...args} />
)

const historicalTimeframes = [
  {
    id: 1,
    display: '1D',
    value: 1,
    timeValue: 'day',
  },
  {
    id: 2,
    display: '1W',
    value: 1,
    timeValue: 'week',
  },
  {
    id: 3,
    display: '30D',
    value: 30,
    timeValue: 'day',
  },
  {
    id: 4,
    display: '3M',
    value: 3,
    timeValue: 'month',
  },
  {
    id: 5,
    display: '6M',
    value: 6,
    timeValue: 'month',
  },
  {
    id: 6,
    display: '1Y',
    value: 1,
    timeValue: 'year',
  },
]

const timeFrame = {
  type: 'historical',
  display: '30D',
  value: 30,
  timeValue: 'day',
}

function callbackFunction() {
  console.log('callback function called')
}

export const defaultTimeframe = Template.bind({})
defaultTimeframe.args = {
  callout: callbackFunction,
  timeframe: timeFrame,
  historicalTimeframes: historicalTimeframes,
  currentTimeframe: true,
  quarterlyTimeframe: true,
}

export const historicalTimeframe = Template.bind({})
historicalTimeframe.args = {
  callout: callbackFunction,
  timeframe: timeFrame,
  historicalTimeframes: historicalTimeframes,
}
