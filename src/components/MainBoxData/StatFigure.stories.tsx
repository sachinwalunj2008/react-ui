import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import StatFigure from './StatFigure'

export default {
  title: '[DEPRECATED]/Components/MainBoxData/StatFigure',
  component: StatFigure,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          deprecated
          replacementComponent='HeaderMetric'
          description='Styles are not encapsulated with this component. They rely on another component wrapper to display correctly.'
          whenToUse={[
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
} as ComponentMeta<typeof StatFigure>

const Template: ComponentStory<typeof StatFigure> = (args) => (
  <StatFigure {...args} />
)

export const basic = Template.bind({})
basic.args = {
  title: 'Stat Title',
  subtitle: 'Stat Subtitle',
  stat: 32,
}
basic.storyName = 'StatFigure'
