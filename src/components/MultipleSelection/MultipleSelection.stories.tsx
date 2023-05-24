import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import MultipleSelection from './MultipleSelection'

export default {
  title: 'Components/FormComponents/MultiSelect/MultipleSelection',
  component: MultipleSelection,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof MultipleSelection>

const Template: ComponentStory<typeof MultipleSelection> = (args) => {
  const {
    options,
    selectedOptions,
    searchPlaceholder,
    noListDataText,
    selectPlaceholder,
    labelText,
  } = args
  const [selected, setSelected] = useState(selectedOptions)

  return (
    <div style={{ width: '300px' }}>
      <MultipleSelection
        {...args}
        selectedOptions={selected}
        options={options}
        callout={(selectedList) => {
          setSelected(selectedList)
        }}
        searchPlaceholder={searchPlaceholder}
        noListDataText={noListDataText}
        selectPlaceholder={selectPlaceholder ?? '-- Select Names --'}
        labelText={labelText ?? 'Search Names'}
        exposed={undefined}
        maxHeight={undefined}
      />
    </div>
  )
}

const genericProps = {
  labelText: 'Names',
  selectedOptions: [],
  options: [`D'Artagnan`, 'Ethan', 'Josh', 'Khayyam', 'Russell'],
  selectPlaceholder: '-- Select Names --',
  searchPlaceholder: 'Names',
  noListDataText: 'No Names Found',
}

export const basic = Template.bind({})
basic.args = {
  ...genericProps,
}

export const required = Template.bind({})
required.args = {
  ...genericProps,
  required: true,
}

export const labelTooltip = Template.bind({})
labelTooltip.args = {
  ...genericProps,
  labelTooltip: {
    tooltipContent: 'This is the tooltip content.',
  },
}

export const rightLabel = Template.bind({})
rightLabel.args = {
  ...genericProps,
  rightLabel: 'Right Label',
}

export const selectedOptions = Template.bind({})
selectedOptions.args = {
  ...genericProps,
  selectedOptions: ['Russell', 'Ethan'],
}

export const manyOptions = Template.bind({})
manyOptions.args = {
  ...genericProps,
  options: [
    `D'Artagnan`,
    'Dave',
    'Ethan',
    'Gavin',
    'Jason',
    'Joe',
    'Josh',
    'Khayyam',
    'Matt',
    'Nate',
    'Russell',
  ],
}

export const longNameOptions = Template.bind({})
longNameOptions.args = {
  ...genericProps,
  options: [
    'This is a long option name that will wrap to the next line',
    `D'Artagnan`,
    'Ethan',
    'Josh',
    'Khayyam',
    'Russell',
  ],
}
