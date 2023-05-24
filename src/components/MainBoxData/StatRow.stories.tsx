import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import StatRow from './StatRow'

export default {
  title: '[DEPRECATED]/Components/MainBoxData/StatRow',
  component: StatRow,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          deprecated
          replacementComponent='HeaderMetricGroup'
          description='Styles are not encapsulated with this component. They rely on another component wrapper to display correctly.'
          whenToUse={[
            'We are considering deprecating this component as it only used with MainBoxData and that component will likely be deprecated.',
            <span key='second'>
              This component was replaced with{' '}
              <a
                href='/?path=/docs/components-headermetrics--metric'
                className='fc-blue'
              >
                HeaderMetric
              </a>
            </span>,
          ]}
        />
      ),
    },
  },
} as ComponentMeta<typeof StatRow>

const Template: ComponentStory<typeof StatRow> = (args) => <StatRow {...args} />

export const basic = Template.bind({})
basic.args = {
  stats: [
    {
      title: 'Stat Title',
      subtitle: 'Stat Subtitle',
      stat: 32,
    },
    {
      title: 'Stat Title 2',
      subtitle: 'Stat Subtitle 2',
      stat: 23,
    },
  ],
}
basic.storyName = 'StatRow'
