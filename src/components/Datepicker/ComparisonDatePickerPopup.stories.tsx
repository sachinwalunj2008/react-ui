import React from 'react'
import 'react-dates/initialize' // to initialize styles for react-dates
import moment from 'moment'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate, ForDisplayUseOnly } from '../../../.storybook'
import { ComparisonDatePickerPopup } from './ComparisonDatePickerPopup'

export default {
  title: 'Components/DatePicker/ComparisonDatePickerPopup',
  component: ComparisonDatePickerPopup,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description='A date picker that will allow the user to select a single date, a date range and a comparison date range.'
          whenToUse={[
            'Pick a single date',
            'Pick a date range',
            'Pick a first date range and a comparison date range',
          ]}
        />
      ),
    },
  },
} as ComponentMeta<typeof ComparisonDatePickerPopup>

const Template: ComponentStory<typeof ComparisonDatePickerPopup> = (args) => (
  <ForDisplayUseOnly height='475px'>
    <ComparisonDatePickerPopup {...args} onApply={() => undefined} />
  </ForDisplayUseOnly>
)

export const ComparisonDatePickerStory = Template.bind({})
ComparisonDatePickerStory.args = {
  initial_firstRange_startDate: moment().subtract(7, 'day'),
  initial_firstRange_endDate: moment().subtract(1, 'day'),
  showComparisonRange: true,
}

export const SingleDateRangePicker = Template.bind({})
SingleDateRangePicker.args = {}

export const ComparisonDateRangePickerWithCompareToSelector = Template.bind({})
ComparisonDateRangePickerWithCompareToSelector.args = {
  showCompareToSelector: true,
  showComparisonRange: true,
}
