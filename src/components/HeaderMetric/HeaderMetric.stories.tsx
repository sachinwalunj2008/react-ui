import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import HeaderMetric from './HeaderMetric'
import { DocsTemplate } from '../../../.storybook'
import { TextUnderline } from '../TextUnderline/TextUnderline'
import PercentageCheck from '../PercentageCheck/PercentageCheck'

const Stories = {
  title: 'Components/HeaderMetrics',
  component: HeaderMetric,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof HeaderMetric>

export default Stories

const Template: ComponentStory<typeof HeaderMetric> = (args) => (
  <HeaderMetric {...args} />
)

export const Metric = Template.bind({})
Metric.args = {
  title: 'In-Stock Rate',
  tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  value: 0.9415,
  change: 0.315,
  pctChange: 0.615,
  formatType: 'percentage',
  decimalScale: 2,
}

export const CustomSecondaryMetric = Template.bind({})
CustomSecondaryMetric.args = {
  title: 'In-Stock Rate',
  tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  value: 0.9415,
  change: 0.315,
  pctChange: 0.615,
  formatType: 'percentage',
  decimalScale: 2,
  customSecondaryValue: <div>Some Metric</div>,
}

export const CustomSecondaryInfo = Template.bind({})
CustomSecondaryInfo.args = {
  title: 'In-Stock Rate',
  tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  secondaryInfo: 'String value goes here!',
}

export const MetricTooltip = Template.bind({})
MetricTooltip.args = {
  title: 'Buy Box Ownership',
  tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  value: 0.68,
  change: 0.315,
  pctChange: 0.615,
  formatType: 'percentage',
  decimalScale: 2,
  metricTooltip: (
    <div className='fs-12' style={{ minWidth: '200px' }}>
      <TextUnderline text='This Year v.s. Last Year' small />
      <div className='fc-dark-purple flex justify-content-between'>
        <span>Buy Box Ownership</span>
        <PercentageCheck percent={0.68} roundNumber showLessThanZero />
      </div>
      <div className='fc-dark-purple flex justify-content-between'>
        <span>Comparison Period</span>
        <PercentageCheck percent={0.96} roundNumber showLessThanZero />
      </div>
    </div>
  ),
}
