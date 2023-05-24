import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { NumericFormat } from 'react-number-format'
import { DocsTemplate } from '../../../../.storybook'
import { useTableCheckboxes } from '../../../hooks'
import { Button, PrimaryActionButton } from '../../../module'
import MdashCheck from '../../Mdash/MdashCheck'
import Tag, { TagColorList } from '../../Tag/Tag'
import CheckboxTable from './CheckboxTable'

export default {
  title: 'Components/Tables/CheckboxTable',
  component: CheckboxTable,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof CheckboxTable>

const Template: ComponentStory<typeof CheckboxTable> = (args) => {
  const {
    checkAll,
    setCheckAll,
    selectedBoxes,
    setSelectedBoxes,
    unselectedBoxes,
    setUnselectedBoxes,
  } = useTableCheckboxes<DataType>(sampleData)

  return (
    <CheckboxTable
      customWidth='100%'
      customHeight='auto'
      {...args}
      data={sampleData}
      checkAll={checkAll}
      setCheckAll={setCheckAll}
      selectedBoxes={selectedBoxes}
      setSelectedBoxes={setSelectedBoxes}
      unselectedBoxes={unselectedBoxes}
      setUnselectedBoxes={setUnselectedBoxes}
    />
  )
}

const color: TagColorList[] = [
  'blue',
  'red',
  'green',
  'yellow',
  'royal-blue',
  'teal',
  'pink',
  'orange',
  'gray',
]

type DataType = {
  id: number
  name: string
  tag: string
  decimal: number
  percent: number
  currency: number
  link: string
  number: number
}

const generateTableData = (numRows: number) => {
  const data: DataType[] = []
  for (let i = 0; i < numRows; i++) {
    data.push({
      id: i,
      name: `Name ${i}`,
      tag: `Tag ${i}`,
      decimal: i * 1.12,
      percent: i / 100,
      currency: i * 100,
      link: 'https://library.pattern.com',
      number: i,
    })
  }
  return data
}

const sampleData = generateTableData(60)

const tableConfig = [
  {
    label: 'Name',
    name: 'name',
    noSort: true,
    mainColumn: true,
    cell: {
      children: (d) => {
        return <div>{d.name}</div>
      },
    },
  },
  {
    label: 'Decimal',
    name: 'decimal',
    cell: {
      children: (d) => {
        return <div>{d.decimal.toFixed(2)}</div>
      },
    },
  },
  {
    label: 'Tag',
    name: 'tag',
    noSort: true,
    cell: {
      children: (d, i) => {
        return (
          <>
            {d?.tag && (
              <Tag
                color={
                  i ? color[i % 9] : color[Math.floor(Math.random() * 8) + 1]
                }
              >
                {d.tag}
              </Tag>
            )}
            {!d?.tag && <div style={{ width: '40px' }} />}
          </>
        )
      },
    },
  },
  {
    label: 'Number',
    name: 'number',
    cell: {
      children: (d) => {
        return <div>{d.number}</div>
      },
    },
  },
  {
    label: 'Percent',
    name: 'percent',
    cell: {
      children: (d) => {
        return (
          <MdashCheck check={d?.percent}>{`${(d?.percent * 100).toFixed(
            0
          )}%`}</MdashCheck>
        )
      },
    },
  },
  {
    label: 'Currency',
    name: 'currency',
    cell: {
      children: (d) => {
        return (
          <NumericFormat
            value={d.currency}
            thousandSeparator={true}
            fixedDecimalScale={true}
            prefix='$'
            decimalScale={2}
            displayType='text'
          />
        )
      },
    },
  },
  {
    label: '',
    name: '',
    noSort: true,
    isButton: true,
    cell: {
      children: (d) => {
        return (
          <Button as='link' to={d.link}>
            Website
          </Button>
        )
      },
    },
  },
]

export const Default = Template.bind({})
Default.args = {
  data: sampleData,
  config: tableConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
  bulkActions: (
    <PrimaryActionButton
      buttonText={'Primary Action'}
      mainActionCallout={() => {
        console.log('main button clicked')
      }}
    />
  ),
}
