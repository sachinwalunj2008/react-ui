import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { DocsTemplate } from '../../../../.storybook'
import SparkLine from './SparkLine'

export default {
  title: '[WIP]/SparkLine',
  component: SparkLine,
  parameters: {
    docs: {
      page: () => <DocsTemplate wip />,
    },
  },
} as ComponentMeta<typeof SparkLine>

const Template: ComponentStory<typeof SparkLine> = (args) => (
  <SparkLine {...args} />
)

const randomData = (
  startingPoint: number,
  endingPoint: number,
  threshold: number,
  /** Keep number of data points under 31 or the demo dates won't make sense */
  dataPoints: number
) => {
  const randomDataArray: Array<{
    data_point: number
    date: string
    threshold: number
  }> = []
  for (let day = 1; day <= dataPoints; day++) {
    const data_point =
      day === 1
        ? startingPoint
        : day === dataPoints
        ? endingPoint
        : Math.random() * 100
    randomDataArray.push({ data_point, date: `2022-10-${day}`, threshold })
  }
  return randomDataArray
}

export const Default = Template.bind({})
Default.args = {
  dataKey: 'data_point',
  graphData: randomData(50, 50, 50, 10),
  thresholdKey: 'threshold',
}

export const GreenLine = Template.bind({})
GreenLine.args = {
  dataKey: 'data_point',
  graphData: randomData(25, 80, 60, 27),
  strokeColor: 'green',
  thresholdKey: 'threshold',
  thresholdColor: 'green',
}

export const RedLine = Template.bind({})
RedLine.args = {
  dataKey: 'data_point',
  graphData: randomData(79, 17, 45, 7),
  strokeColor: 'red',
  thresholdKey: 'threshold',
  thresholdColor: 'red',
}

export const NoThreshold = Template.bind({})
NoThreshold.args = {
  dataKey: 'data_point',
  graphData: randomData(50, 50, 50, 10),
}

export const SinglePoint = Template.bind({})
SinglePoint.args = {
  dataKey: 'data_point',
  graphData: randomData(25, 25, 25, 1),
  thresholdKey: 'threshold',
}
