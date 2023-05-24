import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import MultipleSelection from './MultipleSelection'

export default {
  title: 'Components/FormComponents/MultiSelect/MultipleSelection/Exposed',
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
    maxHeight,
  } = args
  const [selected, setSelected] = useState(selectedOptions)

  return (
    <MultipleSelection
      selectedOptions={selected}
      options={options}
      callout={(selectedList) => {
        setSelected(selectedList)
      }}
      searchPlaceholder={searchPlaceholder}
      noListDataText={noListDataText}
      exposed
      maxHeight={maxHeight}
      labelText='Select a Name'
    />
  )
}

const options = [
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
]

const genericProps = {
  selectedOptions: [],
  options: options.slice(0, 5),
  searchPlaceholder: 'Name',
  noListDataText: 'No Names Found',
}

export const basic = Template.bind({})
basic.args = {
  ...genericProps,
}

export const selectedOptions = Template.bind({})
selectedOptions.args = {
  ...genericProps,
  selectedOptions: ['Jason', 'Ethan'],
}

export const manyOptions = Template.bind({})
manyOptions.args = {
  ...genericProps,
  options,
}

export const longNameOptions = Template.bind({})
longNameOptions.args = {
  ...genericProps,
  options: [
    'This is a long option name that will wrap to the next line',
    ...options.slice(0, 4),
  ],
}

export const maxHeight = Template.bind({})
maxHeight.args = {
  ...genericProps,
  options,
  maxHeight: 500,
}
