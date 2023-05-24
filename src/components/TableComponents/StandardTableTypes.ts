import React from 'react'
import type { EmptyStateProps } from '../EmptyState/EmptyState'
import { SortColumnProps } from '../SortColumn/SortColumnProps'
import { TooltipProps } from '../Tooltip/Tooltip'
import TableFilter from './TableFilter'

type TableFilterProps = React.ComponentProps<typeof TableFilter>
export type GroupColorType = 'red' | 'gray'
export type groupAccordionType = {
  /** To add a `collapsed` class to expand/collapse the current clicked group's subrows */
  isCollapsed: boolean
  /** Unique key to identify each group */
  groupKey: string
}

type StickyTableConfigType = {
  /** The default for this is 1. If you need more than 1 sticky header, then use this prop. */
  header?: number
  /** The default for this is 1. If you need more than 1 sticky left column, then use this prop. */
  left?: number
  /** This should be set to 1 or more if the far right column has an action button in it. */
  right?: number
}

export type ConfigItemType<DataItem, StyleGeneric> = {
  /** Unique name for the column. Should be associated with the name that you are sorting on for the column. */
  name: SortColumnProps['propName']
  /** Unique label for the column headers. */
  label: SortColumnProps['label']
  /** Optionally add custom JSX. This will be rendered to the right of the column header. */
  columnHeaderSubContent?: React.ReactNode
  /** Used if you have multiple options to sort on within a column. */
  options?: SortColumnProps['options']
  /** The JSX that will be rendered in a cell. */
  cell: {
    className?: string | ((data: DataItem) => string)
    children: (data: DataItem, index?: number) => React.ReactNode
    /** Optional style overrides for a cell. */
    style?: StyleGeneric
  }
  /** Determines the static first column in mobile and also the column that will not be able to be removed in column customizations. */
  mainColumn?: boolean
  /** Used if the API requires a lowercase parameter to be passed in. */
  lowerCaseParam?: SortColumnProps['lowerCaseParam']
  /** Define the tooltip for a column. */
  tooltip?: SortColumnProps['tooltip']
  /** Class name for a column. */
  className?: string
  /** Prevent sorting for a column. */
  noSort?: boolean
  /** Column that has a single button. Used for display purposes in mobile. */
  isButton?: boolean
  /** Filter for a column. */
  filter?: SortColumnProps['filter']
  /** Style overrides for a column. */
  style?: StyleGeneric
}

export type StandardTableProps<
  DataItem,
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
> = {
  /** Array of data passed into the Table */
  data: DataItem[]
  /** Table configuration that will handle column headers and rendering column children. */
  config: ConfigItem[]
  /** Unique key from our data objects. Used for `key` in our `map` functions. */
  dataKey: keyof DataItem
  /** Unique key from our nested data objects. Used for `key` in our `map` functions. */
  nestedDataKey?: keyof DataItem
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
  /** We need to know if there is a custom child (such as a checkbox) so that we can correctly determine which column headers should have the sticky classes. This is necessary to have the correct styles in the header. */
  headerChildren?: { jsx: React.ReactNode; count: number }
  nestedRowProps?: {
    getNestedData: (key: DataItem[keyof DataItem]) => void
    nestedLoading: { [key: string]: boolean }
    nestedData: { [key: string]: DataItem[] }
    removeNestedData?: (key: DataItem[keyof DataItem]) => void
    /** Override if the nested rows expand/collapse caret icon should appear (default is always show) */
    showCaret?: (data: DataItem) => boolean
  }
  customColumnProps?: {
    /** Array of user selected columns that we want displayed in the UI */
    selected: Array<ConfigItem['label']>
    /** Function to get array of selected columns saved by the user */
    callout: (selectedList: string[]) => void
    /** Array of all the columns that can be displayed in the UI */
    list: string[]
    /** The Reset function to set the columns back to the default setting. */
    setToDefaultCallout: () => void
  }

  /** To include checkboxes for selection as the first column of the table */
  hasCheckboxes?: boolean
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
  /** Override the breakpoint that switches the table from the MobileTable to Desktop table. */
  largeMobileBreakpoint?: boolean
  /** Unique key from our data objects to identify total row. Value should be boolean */
  totalRowKey?: keyof DataItem
  /** selected checkedboxes list of rows */
  handleCheckedBoxes?: (checkedBoxes: DataItem[], checkAll?: boolean) => void
  /** This is temporary fix until we refactor the standard table - reset selected checkedboxes list */
  isResetCheckboxes?: boolean
  /** Determine if/when the groups should be displayed, dynamic value */
  showGroups?: boolean

  /** Allows data to be grouped by a given criteria; Each list item determines the criteria by which to group by */
  groups?: Array<{
    /** The string value to display in the group Header row */
    groupHeader: string | ((count: number) => string)
    /** Custom JSX to display info icon in the group Header row (groupHeader) */
    tooltipContent?: TooltipProps['tooltipContent']
    /** Determines the background color of the row (Default: grey) */
    type?: GroupColorType
    /** Method to determine if a data set belongs to the group */
    check: (dataItem: DataItem, checkedBoxes?: DataItem[]) => boolean
    /** boolean to add Clear button in the selection */
    includeClearButton?: boolean
    /** Function to perform the required action after clearing the selections */
    clearCallout?: () => void
    /** Custom JSX at the last column of the group header to replace clearButton */
    customClearButton?: React.ReactNode
    /** Adds an expand/collapse functionality to entire groups  */
    groupAccordion?: groupAccordionType
  }>
  /** Mobile Table Only - this is an optional class name that is applied to the Main Column dropdown */
  mainColumnClassName?: string
  /** Shows a short list loading experience */
  shortListLoading?: boolean
  /** Prevents displaying the mobile version of the table */
  noMobileView?: boolean
  /** Gives all columns an equal minimum width */
  equalColumnWidth?: boolean
}

export type NestedRowPropsType<
  DataItem,
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
> = {
  /** data passed into the nested row */
  data: DataItem
  /** Table configuration that will handle column headers and rendering column children. */
  config: ConfigItem[]
  /** Unique key from our nested data objects. Used for `key` in our `map` functions. */
  nestedDataKey?: keyof DataItem
  /** This gets passed down to SortColumn's 'active' prop */
  sortBy: SortColumnProps['active']
  nestedRowProps?: {
    /** Function to get array of records which are associated with parent record */
    getNestedData: (key: DataItem[keyof DataItem]) => void
    /** Flag to determine if the nested data is being fetched */
    nestedLoading: { [key: string]: boolean }
    /** Array of nested rows data for selected parent record */
    nestedData: { [key: string]: DataItem[] }
  }
  customColumnProps?: {
    /** Array of user selected columns that we want displayed in the UI */
    selected: Array<ConfigItem['label']>
    /** Function to get array of selected columns saved by the user */
    callout: (selectedList: string[]) => void
    /** Array of all the columns that can be displayed in the UI */
    list: string[]
  }
  /** The table needs to know which columns and rows are sticky. This object is where we define that. */
  stickyTableConfig?: StickyTableConfigType
  /** Unique key from our data objects to identify total row. Value should be boolean */
  totalRowKey?: keyof DataItem
  /** Selected row for showing the nested list */
  selectedNestedRowData?: DataItem[keyof DataItem][]
  showStickyClasses: boolean
}

export type GroupHeader<DataItem> = DataItem & {
  /** The string value to display in the group Header row (groupHeader) */
  groupHeader?: string | ((count: number) => string)
  /** Custom JSX to display info icon in the group Header row (groupHeader) */
  tooltipContent?: TooltipProps['tooltipContent']
  /** The color of the group header row */
  type?: GroupColorType
  /** boolean to add Clear button in the selection */
  includeClearButton?: boolean
  /** Function to perform the required action after clearing the selections */
  clearCallout?: () => void
  /** indicates if the item has been selected by the user using a checkbox */
  checked?: boolean
  /** Custom JSX at the last column of the group header to replace clearButton */
  customClearButton?: React.ReactNode

  // TO ADD DETAILS TO GROUP HEADER INCLUDE THE FOLLOWING PROPS ON THE HEADER OBJECT:
  /** Boolean value; only added to Header rows  */
  isGroupHeader?: boolean
  /** Toggle to display header details if header details exist */
  displayHeaderData?: boolean
  /** Custom JSX to display in the last column of the table */
  lastColumn?: React.ReactNode
  /**
   * Number to associate the group header with the right group; groups are identified in order
   * of appearance in the table (index + 1, so the first group is 1, the second is 2, etc.)
   */
  groupNum?: number
  /** Adds an expand/collapse functionality to entire groups  */
  groupAccordion?: groupAccordionType
}
