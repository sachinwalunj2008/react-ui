import 'focus-visible'
import 'react-dates/initialize'
import 'web-animations-js'
import './scss/main.scss'
import './services/custom-vh'

export { default as Tippy } from '@tippyjs/react'
export { default as isEqual } from 'lodash.isequal'
export { Cell, Row, StickyTable } from 'react-sticky-table'
// TODO: remove this toastify export once all apps removed all `toastify` instances
export { toast as toastify } from 'react-toastify'
export { default as Alert } from './components/Alerts/Alert'
export type { AlertTypes } from './components/Alerts/Alert'
export { default as Confirmation } from './components/Alerts/Confirmation'
export { default as BackToTop } from './components/BackToTop/BackToTop'
export { default as Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs'
export { default as NewBreadcrumbs } from './components/Breadcrumbs/NewBreadcrumbs'
export { default as BulkActions } from './components/BulkActions/BulkActions'
export { Button } from './components/Button/Button'
export { default as Fab } from './components/Button/Fab'
export { default as MenuButton } from './components/Button/MenuButton'
export { default as BubbleChart } from './components/Charts/BubbleChart/BubbleChart'
export {
  default as WinnabilityTooltip,
  WinnabilityLegend,
} from './components/Charts/BubbleChart/WinnabilityTooltip'
export { default as TwoLineDateLabel } from './components/Charts/Labels/TwoLineDateLabel'
export { SparkLine, SparkLineWithTooltip } from './components/Charts/SparkLine'
export { default as LineTooltip } from './components/Charts/Tooltips/LineTooltip'
export { default as ClickedOutside } from './components/ClickedOutside/ClickedOutside'
export { default as ConditionalWrapper } from './components/ConditionalWrapper/ConditionalWrapper'
export { default as ConfirmationPopoverContent } from './components/ConfirmationPopover/ConfirmationPopoverContent'
export { default as PopoverWithConfirmation } from './components/ConfirmationPopover/PopoverWithConfirmation'
export { default as CsvExport } from './components/CsvExport/CsvExport'
export { default as SingleCsv } from './components/CsvExport/SingleCsv'
export { ComparisonDatePicker } from './components/Datepicker/ComparisonDatePicker'
export { ComparisonDatePickerPopup } from './components/Datepicker/ComparisonDatePickerPopup'
export { default as Datepicker } from './components/Datepicker/Datepicker'
export { default as DatepickerNew } from './components/Datepicker/DatepickerNew'
export { DevTools } from './components/DevTools/DevTools'
export { default as CustomDisplay } from './components/DisplayCustomization/CustomDisplay'
export { default as Ellipsis } from './components/Ellipsis/Ellipsis'
export { default as EmptyState } from './components/EmptyState/EmptyState'
export { default as Filter } from './components/Filter/Filter'
export { default as Autocomplete } from './components/Form/Autocomplete'
export { default as AutocompleteOption } from './components/Form/AutocompleteOption'
export { default as Checkbox } from './components/Form/Checkbox'
export { default as FormButtons } from './components/Form/FormButtons'
export { default as Select } from './components/Form/Select'
export { default as TextInput } from './components/Form/TextInput'
export { default as GuidedTour } from './components/GuidedTour/GuidedTour'
export { default as HeaderMetric } from './components/HeaderMetric/HeaderMetric'
export {
  checkboxColorOptions,
  default as HeaderMetricGroup,
} from './components/HeaderMetric/HeaderMetricGroup'
export { default as Heading1 } from './components/Heading1/Heading1'
export { default as Icon } from './components/Icons/Icon'
export type { IconStringList } from './components/Icons/Icon'
export { default as ProductImage } from './components/Image/ProductImage'
export { default as InfiniteScroll } from './components/InfiniteScroll/InfiniteScroll'
export { InformationPane } from './components/InformationPane/InformationPane'
export { default as InfoTooltip } from './components/InfoTooltip/InfoTooltip'
export {
  InlineMultiSelect,
  InlineMultiSelectAllCheckbox,
  InlineMultiSelectList,
  InlineMultiSelectListGroupHeader,
  InlineMultiSelectListRow,
  InlineMultiSelectSearch,
} from './components/InlineMultiSelect/InlineMultiSelect'
export { default as LabelAndData } from './components/LabelAndData/LabelAndData'
export { default as FormLabel } from './components/FormLabel/FormLabel'
export { default as List } from './components/List/List'
export { default as DownloadLoader } from './components/Loaders/DownloadLoader/DownloadLoader'
export { default as GraphLoading } from './components/Loaders/GraphLoading'
export { default as ListLoading } from './components/Loaders/ListLoading'
export { default as MainBoxData } from './components/MainBoxData/MainBoxData'
export { default as StatFigure } from './components/MainBoxData/StatFigure'
export { default as StatRow } from './components/MainBoxData/StatRow'
export { default as Mdash } from './components/Mdash/Mdash'
export { default as MdashCheck } from './components/Mdash/MdashCheck'
export { default as MobileSlideRight } from './components/MobileSlide/MobileSlideRight'
export { default as MultipleSelection } from './components/MultipleSelection/MultipleSelection'
export { default as MultiSelect } from './components/MultiSelect/MultiSelect'
export { default as PercentageCheck } from './components/PercentageCheck/PercentageCheck'
export { default as Pill } from './components/Pill/Pill'
export { default as Plural } from './components/Plural/Plural'
export { default as Popover } from './components/Popover/Popover'
export {
  PopoverAndMobileDrawer,
  usePopoverAndMobileDrawer,
} from './components/Popover/PopoverAndMobileDrawer'
export { default as PopoverFormContainer } from './components/PopoverFormContainer/PopoverFormContainer'
export { default as PopoverHeader } from './components/PopoverHeader/PopoverHeader'
export { default as PopoverMenu } from './components/PopoverMenu/PopoverMenu'
export { default as PopoverToggle } from './components/PopoverToggle/PopoverToggle'
export { default as PrimaryActionButton } from './components/PrimaryActionButton/PrimaryActionButton'
export { default as PrintDialogIframeLoader } from './components/PrintDialogIframeLoader/PrintDialogIframeLoader'
export { default as ProgressBar } from './components/ProgressBar/ProgressBar'
export { default as ReportLoader } from './components/ReportLoader/ReportLoader'
export { default as SearchBar } from './components/SearchBar/SearchBar'
export { default as SelectDisplay } from './components/Selects/SelectDisplay/SelectDisplay'
export { default as SellingInfoTooltip } from './components/SellingInfoTooltip/SellingInfoTooltip'
export { default as Sidebar } from './components/Sidebar/Sidebar'
export { SideDrawer } from './components/SideDrawer/SideDrawer'
export { default as Slider } from './components/Slider/Slider'
export type { SortColumnProps } from './components/SortColumn/SortColumnProps'
export { default as Stepper } from './components/Stepper/Stepper'
export { default as StickyHeaderSort } from './components/StickyHeader/StickyHeaderSort'
export { default as Toggle } from './components/Toggle/Toggle'
export { default as CheckboxTable } from './components/TableComponents/CheckboxTable/CheckboxTable'
export { default as CustomTable } from './components/TableComponents/CustomTable'
export { default as PrimaryTableCell } from './components/TableComponents/PrimaryTableCell'
export { default as StandardTable } from './components/TableComponents/StandardTable'
export { default as StickyTableContainer } from './components/TableComponents/StickyTableContainer'
export { default as TableCheckbox } from './components/TableComponents/TableCheckbox'
export { default as RouterTabs } from './components/Tabs/RouterTabs/RouterTabs'
export { default as Tabs } from './components/Tabs/Tabs/Tabs'
export { default as Tag } from './components/Tag/Tag'
export type { TagColorList } from './components/Tag/Tag'
export { default as DateRange } from './components/TimeframeFilter/DateRange'
export { default as TimeframeFilter } from './components/TimeframeFilter/TimeframeFilter'
export { default as TimeframeFilterBody } from './components/TimeframeFilter/TimeframeFilterBody'
export { default as PatternToastContainer } from './components/Toast/PatternToastContainer'
export { dismissToast, toast } from './components/Toast/Toast'
export { default as ToastContent } from './components/Toast/ToastContent'
export { default as ToggleOptions } from './components/ToggleOptions/ToggleOptions'
export { default as ToggleProvider } from './components/ToggleProvider/ToggleProvider'
export { default as Tooltip } from './components/Tooltip/Tooltip'
export { default as TrimText } from './components/TrimText/TrimText'
export { TextUnderline } from './components/TextUnderline/TextUnderline'
export { default as WrapMatchingText } from './components/WrapMatchingText/WrapMatchingText'
export {
  useIsMobileView,
  useIsMounted,
  usePrevious,
  useSearchBarFocus,
  useShowElement,
  useTableCheckboxes,
  useTippyHide,
  useToggle,
  useWindowSize,
} from './hooks'
export * from './hooks/responsiveHooks'
export {
  getApiUrlPrefix,
  getEnvironmentName,
} from './services/apiEndpointHelpers'
export {
  cleanUpValues,
  compareArrays,
  createFilterCount,
} from './services/FilterHelperService'
export {
  colors,
  createDataKeyLegend,
  createMonthAgoData,
  createYAxisWidth,
  dateRangeIncludesTodayCheck,
  getHeight,
  lineAnimationDelay,
  lineAnimationDuration,
  statColors,
} from './services/GraphHelperService'
export { abbreviateNumber } from './services/GraphHelperServiceTyped'
export {
  aggregateDatapoints,
  chunk,
  createPageName,
  currencyFormat,
  currencyString,
  dateFormatString,
  errorCheck,
  formatDimensions,
  formatWeight,
  formValidation,
  getActiveTab,
  gridPropertyToSort,
  gridSortFilter,
  inputHandler,
  percentageString,
  propertyToSort,
  reduceAndOrAverage,
  reducer,
  replaceSymbol,
  sortFilter,
  sortNestedObj,
  stopEvents,
} from './services/HelperService'
export { iframePrintDialog } from './services/HelperServiceComponents'
export {
  activeCellClass,
  capitalize,
  debounce,
  hasStickyColumnStyle,
  hasValue,
  largeNumConversion,
  notEmpty,
  snakeCaseToTitle,
  standardSortParams,
  trimText,
  DEBOUNCE_STANDARD_TIME,
} from './services/HelperServiceTyped'
export {
  areaChartProps,
  areaProps,
  cartesianGridProps,
  linearGradient,
  tooltipProps,
  xAxisProps,
  yAxisProps,
} from './services/rechart-helpers'
export {
  checkForCorrectTimeframe,
  getTimeframeDates,
  historicalTimeframes,
  initialTimeframe,
} from './services/TimeframeService'
export {
  addNewBreadcrumb,
  breadcrumbIndex,
  breadcrumbNavigation,
} from './components/Breadcrumbs/BreadcrumbsService'
export type {
  NewBreadcrumbType,
  NewBreadcrumbsProps,
} from './components/Breadcrumbs/Common/BreadcrumbTypes'
