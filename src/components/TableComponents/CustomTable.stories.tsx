import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import CustomTable from './CustomTable'
import { Cell, Row, activeCellClass, hasStickyColumnStyle } from '../../module'

export default {
  title: 'Components/Tables/CustomTable',
  component: CustomTable,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof CustomTable>

type DataItem = {
  isTotalRow: boolean
  name: string
  asin: string
  multiple: { value: number; change: number }
  is_map: string
  is_enabled: string
  price: number
  map_price: number
}

const tableDummyData = (pageNum: number): DataItem[] => {
  const data: DataItem[] = []
  for (let i = 1; i <= 20; i++) {
    const num = pageNum > 1 ? (pageNum - 1) * 20 + i : i
    data.push({
      isTotalRow: i === 1 && num === 1,
      name: `Product Name ${num}`,
      asin: `Test ASIN ${num}`,
      multiple: { value: 32 + num, change: (num % 3 ? 1 : -1) * i },
      is_map: num % 2 ? 'Yes' : num % 3 ? 'No' : '',
      is_enabled: num % 2 ? 'Disabled' : 'Enabled',
      price: 12 * num + 1,
      map_price: 12 * num + 2,
    })
  }
  return data
}

type TableColumnType = {
  cellName: keyof DataItem
  cellIndex: number
}

const tableHeaders = [
    {
      id: 1,
      name: 'name',
      label: 'Name',
    },
    { id: 2, name: 'asin', label: 'ASIN' },
    {
      id: 3,
      label: 'Multiple Values Example',
      options: [
        {
          name: 'multiple',
          label: 'Main Value',
        },
        {
          name: 'change__multiple',
          label: 'Change Value',
        },
      ],
    },
    { id: 4, name: 'is_map', label: 'MAP' },
    { id: 5, name: 'is_enabled', label: 'Status' },
    { id: 6, name: 'price', label: 'Price' },
    { id: 7, name: 'map_price', label: 'MAP Price' },
  ],
  tableColumns: TableColumnType[] = [
    {
      cellName: 'name',
      cellIndex: 1,
    },
    {
      cellName: 'asin',
      cellIndex: 2,
    },
    {
      cellName: 'multiple',
      cellIndex: 3,
    },
    {
      cellName: 'is_map',
      cellIndex: 4,
    },
    {
      cellName: 'is_enabled',
      cellIndex: 5,
    },
    {
      cellName: 'price',
      cellIndex: 6,
    },
    {
      cellName: 'map_price',
      cellIndex: 7,
    },
  ]

const Template: ComponentStory<typeof CustomTable> = (args) => {
  const [state, setState] = useState<{
      data: DataItem[]
      loading: boolean
      pageNumber: number
    }>({
      data: [],
      loading: false,
      pageNumber: 1,
    }),
    { data, loading, pageNumber } = state

  const [sort, setSort] = useState({
    prop: 'name',
    flip: false,
  })

  const dataTimeout = useRef<NodeJS.Timeout>()

  const getData = useCallback((pageNum: number) => {
    if (pageNum === 1) {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }))
    }
    dataTimeout.current = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        data: prevState.data.concat(tableDummyData(pageNum)),
        pageNumber: pageNum + 1,
        loading: false,
      }))
    }, 500)
  }, [])

  const setSortBy = (sortObj: { activeColumn: string; direction: boolean }) => {
    setSort({
      prop: sortObj.activeColumn,
      flip: sortObj.direction,
    })
  }

  useEffect(() => {
    getData(1)
  }, [getData])

  useEffect(() => {
    return () => {
      clearTimeout(dataTimeout.current as NodeJS.Timeout)
    }
  }, [])

  return (
    <CustomTable
      {...args}
      hasData={args.hasData ?? data?.length > 0}
      hasMore
      successStatus
      loading={args.loading ?? loading}
      tableId='demo-table'
      noDataFields={{
        primaryText: `No Data Found`,
        secondaryText: `We could not find any data for the selected criteria.`,
      }}
      sort={setSortBy}
      sortBy={sort}
      getData={() => getData(pageNumber)}
    >
      {data.map((e) => (
        <Row key={e.name}>
          {tableColumns.map((tc) => {
            const value =
              tc.cellName === 'multiple' ? (
                <div>
                  <div className={sort.prop === 'multiple' ? 'semibold' : ''}>
                    {e.multiple.value}
                  </div>
                  <div
                    className={`mt-4 ${
                      sort.prop === 'change__multiple' ? 'semibold' : ''
                    } ${e.multiple.change < 0 ? 'fc-red' : 'fc-green'}`}
                  >
                    {e.multiple.change}
                  </div>
                </div>
              ) : (
                <span className={sort.prop === tc.cellName ? 'semibold' : ''}>
                  {e[tc.cellName]}
                </span>
              )
            return (
              <Cell
                key={`${e.name}-${tc.cellName}`}
                className={`${activeCellClass({
                  cells: [tc.cellName, `change__${tc.cellName}`],
                  activeName: sort.prop,
                })} ${hasStickyColumnStyle({
                  colIndex: tc.cellIndex,
                  stickyLeftColumn: args.stickyTableConfig?.left,
                  stickyRightColumn: args.stickyTableConfig?.right,
                  tableHeadersLength: tableHeaders.length,
                })}`}
              >
                {value}
              </Cell>
            )
          })}
        </Row>
      ))}
    </CustomTable>
  )
}

export const basic = Template.bind({})
basic.args = {
  headers: tableHeaders,
  stickyTableConfig: {
    left: 1,
    right: 0,
  },
}

export const customHeight = Template.bind({})
customHeight.args = {
  headers: tableHeaders,
  customHeight: '300px',
}

export const customWidth = Template.bind({})
customWidth.args = {
  headers: tableHeaders,
  customWidth: '400px',
  customHeight: '400px',
}

export const stickyColumns = Template.bind({})
stickyColumns.args = {
  headers: tableHeaders,
  customHeight: '400px',
  stickyTableConfig: {
    left: 2,
    right: 1,
  },
}

export const noData = Template.bind({})
noData.args = {
  headers: tableHeaders,
  customHeight: '400px',
  hasData: false,
}
