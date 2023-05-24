import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate, ForDisplayUseOnly } from '../../../.storybook'
import DateRange from './DateRange'

export default {
  title: 'Components/DatePicker/DateRange',
  component: DateRange,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate description='Should we deprecate this component? It is used in a few places in Predict, but not sure if we want to keep this experience. If we do want to keep it, then we need to convert DateRange to .tsx and add more to this story.' />
      ),
    },
  },
} as ComponentMeta<typeof DateRange>

const Template: ComponentStory<typeof DateRange> = (args) => (
  <ForDisplayUseOnly height='300px'>
    <DateRange {...args} />
  </ForDisplayUseOnly>
)

export const basic = Template.bind({})
basic.args = {}
