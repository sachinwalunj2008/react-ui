import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import StickyHeaderSort from './StickyHeaderSort'

export default {
  title: '[Deprecated]/Components/StickyHeaderSort',
  component: StickyHeaderSort,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          deprecated
          description='This component is no longer needed and should be removed. We use Tables and those have sorting built in.'
        />
      ),
    },
  },
} as ComponentMeta<typeof StickyHeaderSort>

const options = [
  {
    id: 0,
    text: 'A - Z',
    prop: 'keyword',
  },
  {
    id: 1,
    text: 'Z - A',
    prop: 'keyword',
    flip: true,
  },
  {
    id: 2,
    text: 'Most Recent',
    prop: 'created_at',
    flip: true,
  },
  {
    id: 3,
    text: 'Oldest',
    prop: 'created_at',
  },
]

const Template: ComponentStory<typeof StickyHeaderSort> = (args) => {
  const [defaultSort, setDefaultSort] = useState(options[0])

  const handleSort = (_, value) => {
    value && setDefaultSort(value)
  }

  return (
    <StickyHeaderSort
      {...args}
      setSortBy={handleSort}
      defaultSort={defaultSort}
    />
  )
}

export const basic = Template.bind({})
basic.args = {
  header: <span>10 Products</span>,
  options: options,
  listLength: 10,
}
