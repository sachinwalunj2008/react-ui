import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { DocsTemplate } from '../../../.storybook'
import { TagColorList, useMediaQuery } from '../../module'
import { Button, currencyString, MdashCheck, Tag, toast } from '../../module'
import StandardTable from './StandardTable'

export default {
  title: 'Components/Tables/StandardTable',
  component: StandardTable,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof StandardTable>

const Template: ComponentStory<typeof StandardTable> = (args) => {
  const isMobile = useMediaQuery({ type: 'max', breakpoint: 'sm' }),
    defaultColumns = ['Tag', 'Number', 'Decimal', 'Percent', 'Currency'],
    [selectionList, setSelectionList] = React.useState(defaultColumns)

  return (
    <div style={isMobile ? { minWidth: 'calc(100vw - 40px)' } : {}}>
      <StandardTable
        customHeight='auto'
        stickyTableConfig={{ right: 1 }}
        {...args}
        config={args.config.filter((c) => {
          if (selectionList.includes(c.label) || c.label === 'Name') {
            return c
          }
          return null
        })}
        {...(args.customColumnProps
          ? {
              customColumnProps: {
                selected: selectionList,
                list: defaultColumns,
                callout: setSelectionList,
                setToDefaultCallout: () => {
                  setSelectionList(defaultColumns)
                },
              },
            }
          : {})}
      />
    </div>
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
const sampleData = [
  {
    id: 1,
    name: 'Name 1',
    tag: 'tag',
    number: 2,
    decimal: 3.0,
    percent: 0.17,
    currency: 4000,
    link: 'https://predict.pattern.com',
    string: 'Test 1',
  },
  {
    id: 2,
    name: 'Name 2',
    tag: 'abc',
    number: 8,
    decimal: 3.1415,
    currency: 9876,
    link: 'https://predict-stage.pattern.com',
    string: 'Test 2',
  },
  {
    id: 3,
    name: 'Name 3',
    tag: '123',
    number: 18,
    decimal: 2.987654,
    percent: 0.25,
    currency: 12345,
    link: 'https://library.pattern.com',
    string: 'Test 3',
  },
]
const groupAccordionSampleData = [
  {
    id: 1,
    name: 'Name 1',
    tag: 'tag',
    number: 2,
    decimal: 3.0,
    percent: 0.17,
    currency: 4000,
    link: 'https://predict.pattern.com',
    phaseKey: 'name1',
    isGroupHeader: true,
    groupNum: 1,
  },
  {
    id: 2,
    name: 'Name 1',
    tag: 'abc',
    number: 8,
    decimal: 3.1415,
    currency: 9876,
    link: 'https://predict-stage.pattern.com',
    phaseKey: 'name1',
  },
  {
    id: 3,
    name: 'Name 2',
    tag: '123',
    number: 18,
    decimal: 2.987654,
    percent: 0.25,
    currency: 12345,
    link: 'https://library.pattern.com',
    isGroupHeader: true,
    groupNum: 2,
    phaseKey: 'name2',
  },
  {
    id: 4,
    name: 'Name 2',
    tag: '123',
    number: 18,
    decimal: 2.987654,
    percent: 0.25,
    currency: 12345,
    link: 'https://library.pattern.com',
    phaseKey: 'name2',
  },
  {
    id: 5,
    name: 'Name 3',
    tag: '123',
    number: 18,
    decimal: 2.987654,
    percent: 0.25,
    currency: 12345,
    link: 'https://library.pattern.com',
    phaseKey: 'name2',
  },
]

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
    label: 'Decimal',
    name: 'decimal',
    cell: {
      children: (d) => {
        return <div>{d.decimal.toFixed(2)}</div>
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
        return <div>{currencyString(d.currency)}</div>
      },
    },
  },
  {
    label: 'String',
    name: 'string',
    cell: {
      children: (d) => {
        return <div>{d.string}</div>
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

export const BasicTable = Template.bind({})
BasicTable.args = {
  data: sampleData,
  config: tableConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
  },
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
}

export const basicTableWithEqualColumns = Template.bind({})
basicTableWithEqualColumns.args = {
  data: sampleData,
  config: tableConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
  },
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
  equalColumnWidth: true,
}

export const customizeColumns = Template.bind({})
customizeColumns.args = {
  data: sampleData,
  config: tableConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
  },
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
  customColumnProps: true,
}

export const Checkboxes = Template.bind({})
Checkboxes.args = {
  data: sampleData,
  config: tableConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
  },
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
  hasCheckboxes: true,
  handleCheckedBoxes: (checkedItems) => {
    console.log('checked items: ', checkedItems)
  },
}
Checkboxes.storyName = 'Table with Checkboxes'

export const Groups = Template.bind({})
Groups.args = {
  data: sampleData,
  config: tableConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
  },
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
  showGroups: true,
  groups: [
    {
      groupHeader: 'Group 1 - under 3',
      tooltipContent: <span>Description of the header group 1 </span>,
      check: (item) => item.number < 3,
    },
    {
      groupHeader: 'Group 2 - over 3',
      tooltipContent: <span>Description of the header group 2 </span>,
      check: (item) => item.number > 3,
    },
  ],
}
Groups.storyName = 'Table with Groups'

export const GroupAccordion = Template.bind({})
GroupAccordion.args = {
  data: groupAccordionSampleData,
  config: tableConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
  },
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
  showGroups: true,
  groups: [
    {
      groupHeader: 'Group 1',
      check: (item) => item.phaseKey === 'name1',
      groupAccordion: {
        isCollapsed: true,
        groupKey: 'name1',
      },
    },
    {
      groupHeader: 'Group 2',
      check: (item) => item.phaseKey === 'name2',
      groupAccordion: {
        isCollapsed: false,
        groupKey: 'name2',
      },
    },
  ],
}
GroupAccordion.storyName = 'Table with Group Accordion'

export const HeaderDetails = Template.bind({})
HeaderDetails.args = {
  data: [
    ...sampleData,
    {
      id: 1001,
      number: 2,
      decimal: 3.0,
      percent: 0.17,
      currency: 4000,
      lastColumn: (
        <Button as='link' to='/story/' styleType='primary-green'>
          Story
        </Button>
      ),
      isGroupHeader: true,
      displayHeaderData: true,
      groupNum: 1,
      tag: null,
    },
    {
      id: 2001,
      number: 26,
      decimal: 6.13,
      percent: 0.25,
      currency: 9876 + 12345,
      lastColumn: (
        <div
          style={{ height: '36px', fontSize: '8px' }}
        >{`{use empty div for equal row height spacing, 36px}`}</div>
      ),
      isGroupHeader: true,
      displayHeaderData: true,
      groupNum: 2,
      tag: null,
    },
  ],
  config: tableConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
  },
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
  showGroups: true,
  groups: [
    { groupHeader: 'Group 1 - under 3', check: (item) => item.number < 3 },
    { groupHeader: 'Group 2 - over 3', check: (item) => item.number > 3 },
  ],
}
HeaderDetails.storyName = 'Table with Group Header Details'

export const CheckboxGroups = Template.bind({})
CheckboxGroups.args = {
  data: sampleData,
  config: tableConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
  },
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
  hasCheckboxes: true,
  handleCheckedBoxes: (checkedItems) => {
    console.log('checked items: ', checkedItems)
  },
  showGroups: true,
  groups: [
    { groupHeader: 'Group 1 - under 3', check: (item) => item.number < 3 },
    { groupHeader: 'Group 2 - over 3', check: (item) => item.number > 3 },
  ],
}
CheckboxGroups.storyName = 'Table with Checkbox & Groups'

export const Nested = Template.bind({})
const nestedData = {
  1: [
    {
      id: 1.1,
      name: 'Sub 1',
      tag: 'sub-1',
      number: 1,
      decimal: 1.0,
      percent: 0.12,
      currency: 2275,
    },
    {
      id: 1.2,
      name: 'Sub 2',
      tag: 'sub-2',
      number: 1,
      decimal: 2.0,
      percent: 0.05,
      currency: 1725,
    },
  ],
  2: [
    {
      id: 2.1,
      name: 'Sub 1',
      tag: 'nested-1',
      number: 1,
      decimal: 1.0,
      currency: 2275,
    },
    {
      id: 2.2,
      name: 'Sub 2',
      tag: 'nested-2',
      number: 1,
      decimal: 2.0,
      currency: 1725,
    },
    {
      id: 2.3,
      name: 'Sub 3',
      tag: 'nested-3',
      number: 6,
      decimal: 0.14,
      currency: 5876,
    },
  ],
}

Nested.args = {
  data: sampleData,
  config: tableConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
  },
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
  nestedDataKey: 'id',
  nestedRowProps: {
    nestedData: nestedData,
    getNestedData: () => undefined,
    showCaret: (dataItem) => {
      return !!nestedData[dataItem?.id]
    },
  },
}
Nested.storyName = 'Table with Nested Rows'

export const LoadingTable = Template.bind({})
LoadingTable.args = {
  data: [],
  config: tableConfig,
  loading: true,
  shortListLoading: true,
}

export const NoDataTable = Template.bind({})
NoDataTable.args = {
  data: [],
  config: tableConfig,
  loading: false,
  shortListLoading: true,
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
    buttonProps: {
      children: 'Primary Button',
      onClick: () => {
        toast({
          type: 'success',
          message: 'You clicked the Primary button!',
        })
      },
    },
    icon: 'sellers',
  },
}

export const TableColumnWithCustomizableHeader = Template.bind({})
const newConfig = [...tableConfig]
const configChange = [
  {
    label: 'Percent',
    name: 'percent',
    columnHeaderSubContent: <div className='fc-blue'>View Details</div>,
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
]
newConfig.splice(4, 1, ...configChange)
TableColumnWithCustomizableHeader.args = {
  data: sampleData,
  config: newConfig,
  dataKey: 'name',
  hasData: true,
  hasMore: false,
  successStatus: true,
  loading: false,
  tableId: 'unique_table_string',
  noDataFields: {
    primaryText: 'No Data Available',
    secondaryText:
      'There has been a problem with the data file. Please restart your computer.',
  },
  sort: (args) => {
    console.log('Trying to sort', args.activeColumn)
  },
  sortBy: { prop: 'name', flip: true },
  getData: () => undefined,
}

TableColumnWithCustomizableHeader.storyName =
  'Table with customizable column header'
