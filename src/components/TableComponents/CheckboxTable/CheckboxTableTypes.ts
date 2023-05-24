import React from 'react'
import { Button } from '../../Button/Button'
import { IconStringList } from '../../Icons/Icon'
import { SortColumnProps } from '../../SortColumn/SortColumnProps'
import StandardTable from '../StandardTable'
import { ConfigItemType } from '../StandardTableTypes'
import TableFilter from '../TableFilter'

type TableFilterProps = React.ComponentProps<typeof TableFilter>

export type StickyTableConfigType = {
  /** The default for this is 1. If you need more than 1 sticky header, then use this prop. */
  header?: number
  /** The default for this is 1. If you need more than 1 sticky left column, then use this prop. */
  left?: number
  /** This should be set to 1 or more if the far right column has an action button in it. */
  right?: number
}

export type CheckboxTableProps<
  DataItem,
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
> = {
  /** Array of data passed into the Table */
  data: DataItem[]
  /** State from parent component keeping track of selected checkboxes */
  selectedBoxes: DataItem[]
  /** Setter for selectedBoxes */
  setSelectedBoxes: React.Dispatch<React.SetStateAction<DataItem[]>>
  /** State from parent component keeping track of unselected checkboxes */
  unselectedBoxes: DataItem[]
  /** Setter for unselectedBoxes */
  setUnselectedBoxes: React.Dispatch<React.SetStateAction<DataItem[]>>
  /** Boolean state from parent to keep track of checkAll */
  checkAll: boolean
  /** Setter for checkAll */
  setCheckAll: (checkAll: boolean) => void
  /** Table configuration that will handle column headers and rendering column children. */
  config: React.ComponentProps<typeof StandardTable>['config']
  /** Unique key from our data objects. Used for `key` in our `map` functions. */
  dataKey: keyof DataItem
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
  /** SortColumn's 'sorter' prop - function to update the state of the sortBy prop */
  sort: SortColumnProps['sorter']
  /** This gets passed down to SortColumn's 'active' prop */
  sortBy: SortColumnProps['active']
  /** With pagination, new data needs to get called every time we reach the scrolling threshold. This is the function to get the next set of data. */
  getData: () => void
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
  /** Props to pass into the empty state component */
  emptyStateProps?: {
    primaryText?: string
    secondaryText?: string
    icon?: IconStringList
    background?: boolean
    buttonProps?: React.ComponentProps<typeof Button>
  }
  /**
   * JSX for bulk actions. This should always be the PrimaryActionButton.
   * We wanted to include it by default in the table, but the existing implementations
   * of bulk actions make it difficult to pass in just the props
   */
  bulkActions: React.ReactNode
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
  /** Array of columns that are strings. Needed to flip sorting on string columns */
  stringColumns?: string[]
  /** Function that refreshes data when called */
  refreshData: () => void
}
