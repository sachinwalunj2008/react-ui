import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { DocsTemplate } from '../../../../.storybook'
import SparkLineWithTooltip from './SparkLineWithTooltip'

import HeaderMetric from '../../HeaderMetric/HeaderMetric'
import Sparkline from './SparkLine'

export default {
  title: 'Components/Charts/SparkLine/with Tooltip',
  component: SparkLineWithTooltip,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof SparkLineWithTooltip>

const Template: ComponentStory<typeof SparkLineWithTooltip> = (args) => (
  <SparkLineWithTooltip {...args} />
)

const randomMonthData = (
  startingPoint: number,
  endingPoint: number,
  threshold: number,
  /** Keep number of data points under 31 or the date won't make sense */
  dataPoints: number,
  isPercent?: boolean
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
        : Math.random() * (isPercent ? 100 : 1000)
    randomDataArray.push({
      data_point,
      date: `2022-10-${day}`,
      threshold,
    })
  }
  return randomDataArray
}

export const Default = Template.bind({})
const startVal = 350
const endVal = 555
const graphData = randomMonthData(startVal, endVal, 650, 20)
const changeValue = endVal - startVal
const pctChange = changeValue / startVal
Default.args = {
  graphData: graphData,
  headerMetricProps: {
    change: changeValue,
    metricIcon: 'cup',
    pctChange: pctChange,
    title: 'Category Title',
    value: Math.floor(
      Math.max(...graphData.map((d) => d.data_point)) -
        Math.min(...graphData.map((d) => d.data_point))
    ),
  },
}

export const Currency = Template.bind({})
const c_startVal = 727
const c_endVal = 497
const currencyGraphData = randomMonthData(c_startVal, c_endVal, 550, 30)
const c_changeValue = c_endVal - c_startVal
const c_pctChange = c_changeValue / c_startVal
Currency.args = {
  dataType: 'currency',
  graphColor: c_changeValue > 0 ? 'green' : 'red',
  graphData: currencyGraphData,
  headerMetricProps: {
    change: c_changeValue,
    currency: { currencyCode: 'USD', currencySymbol: '$' },
    pctChange: c_pctChange,
    title: 'Currency Example',
    value: c_endVal,
  },
}

export const Percent = Template.bind({})
const startPercent = 47
const endPercent = 62
const percentGraphData = randomMonthData(startPercent, endPercent, 50, 31, true)
Percent.args = {
  graphColor: 'green',
  graphData: percentGraphData,
  dataType: 'percentage',
  headerMetricProps: {
    formatType: 'percentage',
    title: 'Percent Example',
    value: endPercent - startPercent,
  },
}

export const SmallPercent = Template.bind({})
const startSmallPercent = 0.047
const endSmallPercent = 0.062
const smallPercentGraphData = [
  { data_point: null, date: '2021-09-30T23:00:00.000Z', threshold: 0.05 },
  { data_point: 0.047, date: '2021-10-01T00:00:00.000Z', threshold: 0.05 },
  { data_point: 0.06, date: '2021-10-01T01:00:00.000Z', threshold: 0.05 },
  { data_point: 0.052, date: '2021-10-01T02:00:00.000Z', threshold: 0.05 },
  { data_point: 0.041, date: '2021-10-01T03:00:00.000Z', threshold: 0.05 },
  { data_point: null, date: '2021-10-01T04:00:00.000Z', threshold: 0.05 },
  { data_point: 0.027, date: '2021-10-01T05:00:00.000Z', threshold: 0.05 },
  { data_point: 0.071, date: '2021-10-01T06:00:00.000Z', threshold: 0.05 },
  { data_point: 0.07, date: '2021-10-01T07:00:00.000Z', threshold: 0.05 },
  { data_point: null, date: '2021-10-01T08:00:00.000Z', threshold: 0.05 },
  { data_point: 0.089, date: '2021-10-01T09:00:00.000Z', threshold: 0.05 },
  { data_point: 0.063, date: '2021-10-01T10:00:00.000Z', threshold: 0.05 },
  { data_point: 0.05, date: '2021-10-01T11:00:00.000Z', threshold: 0.05 },
  { data_point: 0.062, date: '2021-10-01T12:00:00.000Z', threshold: 0.05 },
  { data_point: null, date: '2021-10-01T13:00:00.000Z', threshold: 0.05 },
  { data_point: null, date: '2021-10-01T14:00:00.000Z', threshold: 0.05 },
]
SmallPercent.args = {
  connectNulls: true,
  customDateFormat: 'h:mm a',
  graphColor: 'green',
  graphData: smallPercentGraphData,
  dataType: 'percentage',
  headerMetricProps: {
    formatType: 'percentage',
    title: 'Small Percent Example',
    value: endSmallPercent - startSmallPercent,
  },
}

export const HourlyDisplay = Template.bind({})
const hourlyGraphData = [
  { data_point: 16, date: '2021-10-01T00:00:00.000Z', threshold: 12 },
  { data_point: 17, date: '2021-10-01T01:00:00.000Z', threshold: 12 },
  { data_point: 15, date: '2021-10-01T02:00:00.000Z', threshold: 12 },
  { data_point: 13, date: '2021-10-01T03:00:00.000Z', threshold: 12 },
  { data_point: 11, date: '2021-10-01T04:00:00.000Z', threshold: 12 },
  { data_point: 10, date: '2021-10-01T05:00:00.000Z', threshold: 12 },
  { data_point: 10, date: '2021-10-01T06:00:00.000Z', threshold: 12 },
  { data_point: 9, date: '2021-10-01T07:00:00.000Z', threshold: 12 },
  { data_point: 10, date: '2021-10-01T08:00:00.000Z', threshold: 12 },
  { data_point: 9, date: '2021-10-01T09:00:00.000Z', threshold: 12 },
  { data_point: 11, date: '2021-10-01T10:00:00.000Z', threshold: 12 },
  { data_point: 12, date: '2021-10-01T11:00:00.000Z', threshold: 12 },
  { data_point: 13, date: '2021-10-01T12:00:00.000Z', threshold: 12 },
]
HourlyDisplay.args = {
  graphColor: 'red',
  graphData: hourlyGraphData,
  dataType: 'number',
  customDateFormat: 'h:mm',
  headerMetricProps: {
    title: 'Hourly Example',
    value: -3,
  },
}

export const MixedTypes = Template.bind({})
const startMixed = 439
const endMixed = 555
const mixedGraphData = randomMonthData(startMixed, endMixed, 501, 31)
MixedTypes.args = {
  graphColor: 'red',
  graphData: mixedGraphData,
  dataType: 'number',
  displayType: 'percentage',
  labelColor: 'green',
  thresholdColor: 'blue',
  invertYAxis: true,
  headerMetricProps: {
    change: endMixed - startMixed,
    pctChange: (endMixed - startMixed) / startMixed,
    title: 'Mixed Types Example',
    value: (endMixed - startMixed) / 10,
  },
}

const ExampleComponent = () => {
  return (
    <div style={{ padding: '18px' }}>
      <HeaderMetric
        title='Example Component'
        value={37}
        change={42}
        pctChange={19.23}
        loading={false}
      />
      <div style={{ height: '100px', width: '100%' }}>
        <Sparkline
          graphData={graphData}
          strokeColor='green'
          dataKey='data_point'
        />
      </div>
      <HeaderMetric
        title='Example Component'
        value={37}
        change={42}
        pctChange={19.23}
        loading={false}
      />
      <div style={{ height: '100px', width: '100%' }}>
        <Sparkline
          graphData={graphData}
          strokeColor='green'
          dataKey='data_point'
        />
      </div>
      <HeaderMetric
        title='Example Component'
        value={37}
        change={42}
        pctChange={19.23}
        loading={false}
      />
      <div style={{ height: '100px', width: '100%' }}>
        <Sparkline
          graphData={graphData}
          strokeColor='green'
          dataKey='data_point'
        />
      </div>
    </div>
  )
}

export const SecondaryDisplay = Template.bind({})
const startPrimaryMetrics = 439
const endPrimaryMixed = 555
const mixedPrimaryGraphData = randomMonthData(
  startPrimaryMetrics,
  endPrimaryMixed,
  501,
  31
)
SecondaryDisplay.args = {
  graphColor: 'red',
  graphData: mixedPrimaryGraphData,
  dataType: 'number',
  displayType: 'percentage',
  labelColor: 'green',
  thresholdColor: 'blue',
  invertYAxis: true,
  headerMetricProps: {
    change: endPrimaryMixed - startPrimaryMetrics,
    pctChange: (endPrimaryMixed - startPrimaryMetrics) / startPrimaryMetrics,
    title: 'Primary Metrics',
    value: (endPrimaryMixed - startPrimaryMetrics) / 10,
  },
  secondaryDisplay: () => <ExampleComponent />,
}

export const NoPreview = Template.bind({})
NoPreview.args = {
  hideSparklinePreview: true,
  graphData: graphData,
  headerMetricProps: {
    change: changeValue,
    hideSparklinePreview: false,
    metricIcon: 'cup',
    pctChange: pctChange,
    title: 'Category Title',
    value: Math.floor(
      Math.max(...graphData.map((d) => d.data_point)) -
        Math.min(...graphData.map((d) => d.data_point))
    ),
  },
}
NoPreview.storyName = 'No Sparkline Preview'
