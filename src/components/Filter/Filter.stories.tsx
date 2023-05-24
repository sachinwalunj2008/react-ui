import React from 'react'
import moment from 'moment'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { TextInput, useMediaQuery } from '../../module'

import Filter from './Filter'

const filterStates = {
  vendors: {
    type: 'select',
    defaultValue: 'all',
    options: [
      {
        id: 0,
        vendor_name: 'All',
        value: 'all',
      },
      {
        id: 1,
        vendor_name: 'Baby Foot',
        value: 'babyfoot',
      },
      {
        id: 2,
        vendor_name: 'Skullcandy',
        value: 'skullcandy',
      },
    ],
    stateName: 'vendor_id',
    propName: 'id',
    optionKeyName: 'vendor_name',
    searchBar: true,
    labelText: 'Manufacturers',
    labelTooltip: {
      tooltipContent: 'This is the select tooltip.',
    },
  },
  warehouse: {
    type: 'select',
    defaultValue: 'all',
    stateName: 'warehouse_reconciled',
    propName: 'value',
    options: [
      {
        id: 0,
        text: 'All',
        value: 'all',
      },
      {
        id: 1,
        text: 'Reconciled',
        value: true,
      },
      {
        id: 2,
        text: 'Not Reconciled',
        value: false,
      },
    ],
    labelText: 'Warehouse Reconciled',
  },
  shipments: {
    type: 'select',
    defaultValue: 'all',
    options: [
      {
        id: 0,
        state: 'Shipped',
        value: 'all',
      },
      {
        id: 1,
        state: 'Received',
        value: 1,
      },
      {
        id: 2,
        state: 'Not Received',
        value: 2,
      },
    ],
    stateName: 'status',
    optionKeyName: 'state',
    propName: 'state_order',
    labelText: 'Status',
  },
  text: {
    type: 'text',
    defaultValue: '',
    labelText: 'Text',
    placeholder: 'Text',
    stateName: 'text',
    rightLabel: 'Right Label',
  },
  dates: {
    type: 'dates',
    defaultValue: {
      start_date: moment(),
      end_date: moment(),
      customClass: 'filter-datepicker',
    },
    labelText: 'Date Range',
    specifiedDay: moment(),
  },
}

export default {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Filter>

const Template: ComponentStory<typeof Filter> = (args) => <Filter {...args} />

export const basic = Template.bind({})
basic.args = {
  filterStates: filterStates,
  filterCallout: () => {
    console.log('Filter call out on Save')
  },
  cancelCallout: () => {
    console.log('Filter call out on cancel')
  },
}
basic.storyName = 'Basic'

export const withReset = Template.bind({})
withReset.args = {
  filterStates: filterStates,
  filterCallout: () => {
    console.log('Filter call out on Save.')
  },
  cancelCallout: () => {
    console.log('Filter call out on cancel')
  },
  resetButton: true,
  resetCallout: () => {
    console.log('Filter call out on reset.')
  },
}
withReset.storyName = 'Reset Button'

export const withOptionsInSingleColumn = Template.bind({})
withOptionsInSingleColumn.args = {
  filterStates: filterStates,
  filterCallout: () => {
    console.log('Filter call out on Save')
  },
  cancelCallout: () => {
    console.log('Filter call out on cancel')
  },
  singleColumn: true,
}
withOptionsInSingleColumn.storyName = 'Single Column'

export const withAppliedFilterCount = Template.bind({})
withAppliedFilterCount.args = {
  filterStates: filterStates,
  filterCallout: () => {
    console.log('Filter call out on Save')
  },
  cancelCallout: () => {
    console.log('Filter call out on cancel')
  },
  appliedFilters: 4,
}
withAppliedFilterCount.storyName = 'Applied Filter Count'

export const withCustomChildren = Template.bind({})
withCustomChildren.args = {
  filterStates: filterStates,
  filterCallout: () => {
    console.log('Filter call out on Save')
  },
  cancelCallout: () => {
    console.log('Filter call out on cancel')
  },
  singleColumn: true,
  children: ({ close }: { close: () => void }) => (
    <TextInput
      type='text'
      placeholder={'Search'}
      callout={() => {
        return
      }}
      value={''}
      labelText='Search'
      debounce={250}
      keyUp={() => close}
      stateName={'search'}
    />
  ),
}
withCustomChildren.storyName = 'Custom Children'

export const withTooltip = Template.bind({})
withTooltip.args = {
  filterStates: filterStates,
  filterCallout: () => {
    console.log('Filter call out on Save')
  },
  cancelCallout: () => {
    console.log('Filter call out on cancel')
  },
}
withTooltip.storyName = 'With Tooltip'

export const withRightLabel = Template.bind({})
withRightLabel.args = {
  filterStates: filterStates,
  filterCallout: () => {
    console.log('Filter call out on Save')
  },
  cancelCallout: () => {
    console.log('Filter call out on cancel')
  },
}

const MobileFilterWrapper = (args): JSX.Element => {
  const isMobileView = useMediaQuery({ type: 'max', breakpoint: 'md' })

  return isMobileView ? (
    <Filter {...args} />
  ) : (
    <h2>
      This view is available when the viewport is &lt; 768px. Please resize the
      screen to see the mobile filter.
    </h2>
  )
}

const Template2: ComponentStory<typeof Filter> = (args) => (
  <MobileFilterWrapper {...args} />
)

export const mobileFilter = Template2.bind({})
mobileFilter.args = {
  filterStates: filterStates,
  filterCallout: () => {
    console.log('Filter call out on Save')
  },
  cancelCallout: () => {
    console.log('Filter call out on cancel')
  },
  singleColumn: true,
  responsive: true,
}
mobileFilter.storyName = 'Responsive'
