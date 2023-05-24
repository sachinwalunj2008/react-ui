import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import TimeframeFilterBody from './TimeframeFilterBody'
import { historicalTimeframes, initialTimeframe, toast } from '../../module'

export default {
  title: 'Components/Timeframe/TimeframeFilterBody',
  component: TimeframeFilterBody,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof TimeframeFilterBody>

const Template: ComponentStory<typeof TimeframeFilterBody> = (args) => {
  const [timeframe, setTimeframe] = useState(initialTimeframe)

  const update = (
    _: string,
    startDate: moment.Moment,
    endDate: moment.Moment,
    timeframe: {
      type: string
      display: string
      value: number
      timeValue: string
    }
  ) => {
    setTimeframe(timeframe)
    toast({
      message: (
        <div>
          <span>Start Date: {startDate.format('L')}</span>
          <br />
          <span>End Date: {endDate.format('L')}</span>
          <br />
        </div>
      ),
      type: 'info',
    })
  }

  return (
    <TimeframeFilterBody {...args} timeframe={timeframe} callout={update} />
  )
}

export const basic = Template.bind({})
basic.args = {
  historicalTimeframes: historicalTimeframes,
  currentTimeframe: true,
  quarterlyTimeframe: true,
  hideCustomDateSearch: true,
}
basic.storyName = 'TimeframeFilterBody'
