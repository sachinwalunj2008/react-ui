import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import MainBoxData from './MainBoxData'
import { Button, Icon } from '../../module'

export default {
  title: '[DEPRECATED]/Components/MainBoxData/MainBoxData',
  component: MainBoxData,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          deprecated
          description='Styles are not encapsulated with this component. They rely on another component wrapper to display correctly.'
          whenToUse={[
            'We are considering deprecating this component as it has too many "custom" fields and not not rely on our HeaderMetric component.',
          ]}
        />
      ),
    },
  },
} as ComponentMeta<typeof MainBoxData>

const Template: ComponentStory<typeof MainBoxData> = (args) => (
  <MainBoxData {...args} />
)

export const Default = Template.bind({})
Default.args = {
  statFigures: [
    {
      title: <h1>title</h1>,
      subtitle: <h2>subtitle</h2>,
      list_heading: 'list_heading',
      stat: 1234567.8955,
      metric: 'units',
      thousandSeparator: true,
      icon: 'check',
      suffix: 'suffix',
      decimalScale: 2,
      subStat: {
        stat: 987654,
        thousandSeparator: true,
        icon: 'close',
        customClass: 'bgc-gray',
      },
      customClass: 'bgc-faint-gray',
    },
  ],
  downloads: (
    <div onClick={() => alert('download would start with the right code')}>
      <Icon icon='download' customClass='svg-blue' />
    </div>
  ),
  timeframeFilter: (
    <div>
      <Button
        onClick={() =>
          alert('timeframe filter would start with the right code')
        }
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Icon icon='filter' />
        <span style={{ fontSize: '8px' }}>TIMEFRAME FILTERS</span>
      </Button>
    </div>
  ),
  filters: (
    <div>
      <Button
        onClick={() => alert('filter would start with the right code')}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Icon icon='filter' />
        {' FILTERS'}
      </Button>
    </div>
  ),
  tooltipData: {
    title: <h3>title</h3>,
    text: 'tooltip text',
  },
  tooltipPosition: 'bottom',
}

export const CustomSides = Template.bind({})
CustomSides.args = {
  customLeftChild: (
    <div style={{ backgroundColor: 'salmon' }}>Custom Left Child</div>
  ),
  customRightChild: (
    <div style={{ backgroundColor: 'skyblue' }}>Custom Right Child</div>
  ),
}
