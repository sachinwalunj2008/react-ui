import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import TableCheckbox from './TableCheckbox'
import TableFilter from './TableFilter'

export default {
  title: 'Components/Tables/Components/TableFilter',
  component: TableFilter,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof TableCheckbox>

const Template: ComponentStory<typeof TableFilter> = (args) => {
  const { activeFilters } = args
  const [filters, setFilters] = useState(activeFilters)

  useEffect(() => {
    setFilters(activeFilters)
  }, [activeFilters])

  const removeFilters = (filter: string | undefined) => {
    setFilters({})
  }

  return <TableFilter activeFilters={filters} remove={removeFilters} />
}

export const TableFilterWithNumbers = Template.bind({})
TableFilterWithNumbers.args = {
  activeFilters: {
    'Ad Sales': {
      label: 'Ad Sales  > $2',
      value: 2,
    },
  },
}

export const TableFilterWithList = Template.bind({})
TableFilterWithList.args = {
  activeFilters: {
    'Match Type': {
      label: 'Match Type (3)',
      value: ['Exact', 'Phrase', 'Broad'],
    },
  },
}

export const TableFilterWithHugeList = Template.bind({})
TableFilterWithHugeList.args = {
  activeFilters: {
    'Match Type': {
      label: 'Match Type (10)',
      value: [
        'Exact',
        'Phrase',
        'Broad',
        'List Item 1',
        'List Item 2',
        'List Item 3',
        'List Item 4',
        'List Item 5',
        'List Item 6',
        'List Item 7',
      ],
    },
  },
}
