import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate, ForDisplayUseOnly } from '../../../.storybook'
import Datepicker from './DatepickerNew'

export default {
  title: 'Components/DatePicker/Datepicker',
  component: Datepicker,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate description='Should we deprecate this old datepicker or should we keep it? If we are keeping this, then we need to convert the component to .tsx and add more to this story.' />
      ),
    },
  },
} as ComponentMeta<typeof Datepicker>

const Template: ComponentStory<typeof Datepicker> = (args) => (
  <ForDisplayUseOnly height='300px'>
    <Datepicker {...args} />
  </ForDisplayUseOnly>
)

export const basic = Template.bind({})
basic.args = {}
basic.storyName = 'Datepicker'

export const singleDate = Template.bind({})
singleDate.args = { isSingle: true, manualInput: true }
singleDate.storyName = 'Single Datepicker'

export const futureDates = Template.bind({})
futureDates.args = { hasFutureDates: true }
futureDates.storyName = 'Datepicker with future dates'

export const allDates = Template.bind({})
allDates.args = { showAllDates: true }
allDates.storyName = 'Datepicker with all dates'
