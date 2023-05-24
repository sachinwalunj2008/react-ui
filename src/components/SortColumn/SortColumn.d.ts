import React from 'react'
import { TippyProps } from '@tippyjs/react'
import TableFilter from '../TableComponents/TableFilter'
type TableFilterProps = React.ComponentProps<typeof TableFilter>
type SortColumnOptionsProps = {
  name: string
  label: string
}
type SortColumnTooltipProps = {
  content: React.ReactNode
  position?: TippyProps['placement']
}
export type SortByProps = {
  /** Value used to sort by */
  prop: string
  /** `True` === 'asc' && `False` === 'desc' */
  flip: boolean
  /** Should use the `:lowercase` param */
  lowerCaseParam?: boolean
}
type SortColumnProps<OptionItem extends SortColumnOptionsProps> =
  | SortColumnPropsSingleValue
  | SortColumnPropsMultipleValues<OptionItem>
type SortColumnPropsBase = {
  /** Label that is displayed for the table column */
  label: string
  /** Function to update sort direction of the column while also setting the column to active */
  sorter: (arg: {
    activeColumn: SortByProps['prop']
    direction: boolean
    lowerCaseParam?: SortByProps['lowerCaseParam']
  }) => void
  /** Optional class  */
  customClass?: string
  /** Optionally add custom JSX. This will be rendered to the right of the column header. */
  columnHeaderSubContent?: React.ReactNode
  /** This determines the style of the label. It tells the user which column is currently being sorted.   */
  active: SortByProps
  /** Name of the label that we store locally in to the browser  */
  localStorageName: string
  /** This is used if we need to send back `lowercase` in the api params */
  lowerCaseParam?: boolean
  /** Optional tooltip to be displayed next to the label   */
  tooltip?: SortColumnTooltipProps
  /** This allows us to add a filter for a specific column. The filter is then applied to the table to help narrow down the results of the table. */
  filter?: {
    headerText: string
    /** Temporary active sort option for secondary filter. This is needed to keep track of changes to the sort before the sort has been applied. (TODO: this prop needs to be required after all instances in consuming apps have been updated) */
    secondarySortProp?: string
    children: React.ReactNode
    callout: (headerText: string) => void
    /** Callout invoked when the filter is closed. This helps us to clear any unsaved changes to the filter. (TODO: this prop needs to be required after all instances in consuming apps have been updated) */
    closeCallout?: (headerText: string) => void
    /** Callout invoked when active sortProp changes. This callout provides sortProp which is currently active. This helps us to keep track of intermediate changes to sortProp before the filter has been applied. (TODO: this prop needs to be required after all instances in consuming apps have been updated) */
    onSortChange?: (sortPropName: string) => void
    disabled: boolean
  }
  /** Table filters that are currently in use. This is to be used with the `filter` prop. */
  activeFilters?: TableFilterProps['activeFilters']
  /** Optional prop to determine whether to allow sorting for the column */
  noSort?: boolean
}
type SortColumnPropsSingleValue = SortColumnPropsBase & {
  /** propName is used if there is only 1 sort value */
  propName: string
  options?: never
}
type SortColumnPropsMultipleValues<OptionItem> = SortColumnPropsBase & {
  propName?: never
  /** options are used if there are more than 1 sort values */
  options: OptionItem[]
}
declare const SortColumn: <OptionItem extends SortColumnOptionsProps>({
  label,
  propName,
  options,
  sorter,
  customClass,
  active,
  localStorageName,
  lowerCaseParam,
  tooltip,
  filter,
  activeFilters,
  noSort,
  columnHeaderSubContent,
}: SortColumnProps<OptionItem>) => JSX.Element
export default SortColumn
