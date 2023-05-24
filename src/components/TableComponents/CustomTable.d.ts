import React from 'react'
import { SortColumnProps } from '../../module'
import { EmptyStateProps } from '../EmptyState/EmptyState'
import TableFilter from './TableFilter'
type TableFilterProps = React.ComponentProps<typeof TableFilter>
type StickyTableConfigType = {
  /** The default for this is 1. If you need more than 1 sticky header, then use this prop. */
  header?: number
  /** The default for this is 1. If you need more than 1 sticky left column, then use this prop. */
  left?: number
  /** This should be set to 1 or more if the far right column has an action button in it. */
  right?: number
}
type HeaderItemType<StyleGeneric> = HeaderName & {
  label: SortColumnProps['label']
  lowerCaseParam?: SortColumnProps['lowerCaseParam']
  tooltip?: SortColumnProps['tooltip']
  className?: string
  noSort?: boolean
  filter?: SortColumnProps['filter']
  style?: StyleGeneric
}
type SingleNameHeader = {
  name: SortColumnProps['propName']
  options?: never
}
type OptionsHeader = {
  name?: never
  options: SortColumnProps['options']
}
type HeaderName = OptionsHeader | SingleNameHeader
type CustomTableProps<
  HeaderItem extends HeaderItemType<Record<string, unknown>>
> = CustomTablePropsWithHeaders<HeaderItem> | CustomTablePropsWithCustomHeaders
type CustomTableBaseProps = {
  /** Flag to determine if the table has data available */
  hasData: boolean
  /** Flag to determine if the table has more data that needs to be called */
  hasMore: boolean
  /** Flag to let the table know that the api call was successful */
  successStatus: boolean
  /** Flag to determine if the data is being fetched */
  loading: boolean
  /** Each table needs a unique id to be able to handle setting the sort values in localStorage correctly */
  tableId: string
  /** This is the text that is displayed when no data is available */
  noDataFields: EmptyStateProps
  /** SortColumn's 'sorter' prop - function to update the state of the sortBy prop */
  sort: SortColumnProps['sorter']
  /** This gets passed down to SortColumn's 'active' prop */
  sortBy: SortColumnProps['active']
  /** With pagination, new data needs to get called every time we reach the scrolling threshold. This is the function to get the next set of data. */
  getData: () => void
  children: React.ReactNode
  /** We need to know if there is a custom child (such as a checkbox) so that we can correctly determine which column headers should have the sticky classes. This is necessary to have the correct styles in the header. */
  headerChildren?: {
    jsx: React.ReactNode
    count: number
  }
  /** Array of selected columns that we want displayed in the UI */
  customColumnsList?: Record<string, React.ReactNode[]> | React.ReactNode[]
  /** The table needs to know which columns and rows are sticky. This object is where we define that. */
  stickyTableConfig?: StickyTableConfigType
  /** You may define a set height for the table - optional */
  customHeight?: number | string
  /** You may define a set width for the table - optional */
  customWidth?: number | string
  /** If the table is next to another element, the computed width of the table will be incorrect. Use this to input the width of the element (including padding, margin, and other spacing) to have the correct width for the table. */
  widthOffset?: number
  /** Table filters that are currently in use. A table does not have to have filters, but if they do have filters, we need to know which are the active filters. */
  activeFilters?: TableFilterProps['activeFilters']
  /** Function to remove the currently active filters. */
  removeFilters?: TableFilterProps['remove']
  /** Shows a short list loading experience */
  shortListLoading?: boolean
}
type CustomTablePropsWithHeaders<HeaderItem> = CustomTableBaseProps & {
  /** Array of table headers */
  headers: HeaderItem[]
  customHeaders?: never
}
type CustomTablePropsWithCustomHeaders = CustomTableBaseProps & {
  headers?: never
  /** Custom table headers. This would require building a header row with the `Row` and `Cell` components. */
  customHeaders: React.ReactNode
}
declare const CustomTable: <
  HeaderItem extends HeaderItemType<Record<string, unknown>>
>({
  hasData,
  hasMore,
  successStatus,
  loading,
  tableId,
  noDataFields,
  sort,
  sortBy,
  getData,
  children,
  headers,
  customHeaders,
  headerChildren,
  stickyTableConfig,
  customHeight,
  customWidth,
  widthOffset,
  activeFilters,
  removeFilters,
  shortListLoading,
}: CustomTableProps<HeaderItem>) => JSX.Element
export default CustomTable
