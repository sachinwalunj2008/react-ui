import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import HeaderMetricGroup from './HeaderMetricGroup'
import { DocsTemplate } from '../../../.storybook'
import moment from 'moment'

const headerMetricData = [
    {
      title: 'In-Stock Rate',
      tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      value: 0.9415,
      change: 0.315,
      pctChange: 0.615,
      formatType: 'percentage',
      decimalScale: 2,
    },
    {
      title: 'Buy Box Ownership',
      value: 0.4155,
      change: 0.4155,
      pctChange: 0,
      formatType: 'percentage',
      decimalScale: 2,
      roundNumber: true,
      linkTo: '#',
    },
    {
      title: 'Ad Spend',
      tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
      value: 35058.789,
      change: 17058.789,
      pctChange: 0.5515,
      formatType: 'number',
      decimalScale: 2,
      reverse: true,
      truncateValues: true,
      currency: {
        currencyCode: 'AUD',
        currencySymbol: '$',
      },
    },
    {
      title: 'Avg Rating',
      value: 4.745,
      change: 2.74542,
      pctChange: -0.54545,
      formatType: 'number',
      decimalScale: 1,
    },
    {
      title: 'Reviews',
      tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
      value: 234,
      change: 434,
      pctChange: 0.551,
      formatType: 'number',
      decimalScale: 0,
    },
    {
      title: 'Reviews 1',
      tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
      value: 234,
      change: 434,
      pctChange: 0.551,
      formatType: 'number',
      decimalScale: 0,
    },
  ],
  headerMetricTextData = [
    {
      title: 'Marketplace',
      secondaryInfo: 'Amazon US',
      linkTo: '/story/',
    },
    {
      title: 'Portfolio',
      secondaryInfo: 'Pure Encapsulation - Iserve US',
    },
    {
      title: 'Dates',
      secondaryInfo: `${moment().format(
        'ddd, MMM DD, YYYY'
      )} - ${'No End Date'}`,
    },
    {
      title: 'Daily Budget',
      tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      secondaryInfo: '$ 100',
    },
  ]

const Stories = {
  title: 'Components/HeaderMetrics',
  component: HeaderMetricGroup,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof HeaderMetricGroup>

export default Stories

const TemplateGroup: ComponentStory<typeof HeaderMetricGroup> = (args) => {
  const [activeMetrics, setActiveMetrics] = useState([
    'In-Stock Rate',
    'Buy Box Ownership',
  ])

  const updateActiveMetrics = (metrics: { name: string; checked: boolean }) => {
    const { name, checked } = metrics
    const active = [...activeMetrics]
    if (checked) {
      active.push(name)
    } else {
      const index = active.indexOf(name)
      if (index > -1) {
        active.splice(index, 1)
      }
    }
    setActiveMetrics(active)
  }
  return (
    <HeaderMetricGroup
      {...args}
      mainCallOut={updateActiveMetrics}
      activeMetrics={activeMetrics}
    />
  )
}

export const Group = TemplateGroup.bind({})
Group.args = {
  data: headerMetricData,
  showRadio: true,
  loading: false,
}

export const GroupWithoutRadioAndMetrics = TemplateGroup.bind({})
GroupWithoutRadioAndMetrics.args = {
  data: headerMetricTextData,
  loading: false,
  showRadio: true,
}
