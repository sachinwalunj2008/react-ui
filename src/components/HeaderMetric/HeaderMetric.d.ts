import React from 'react'
import { IconStringList } from '../../module'
import { chartColors } from './HeaderMetricGroup'
import { TooltipProps } from '../Tooltip/Tooltip'
type HeaderMetricBase = {
  /** The key override for the metric - if it needs to be different than `title` */
  key?: string
  /** Text to display in metric */
  title: string
  /** Tooltip content to display next to title in metric */
  tooltip?: TooltipProps['tooltipContent']
  /** Tooltip content to display when hovering over the metric values. */
  metricTooltip?: TooltipProps['tooltipContent']
  /** Used for internal links only */
  linkTo?: string
  /** The font size that will change the main data of the metric. */
  fontSize?: 'fs-16' | 'fs-18' | 'fs-22'
  /** Boolean to determine loading state */
  loading: boolean
  /** Optional className can be added */
  className?: string
}
type HeaderMetricValueType = HeaderMetricBase & {
  /** Value to display in metric */
  value?: number
  /** Change value to display in metric */
  change?: number
  /** Percentage change to display in metric */
  pctChange?: number
  /** Currency to display in metric */
  currency?: CurrencyProps
  /** Value format to display in metric */
  formatType?: 'number' | 'percentage'
  /** Metric icon to display in metric */
  metricIcon?: IconStringList
  /** Decimal scale applied to value in metric */
  decimalScale?: number
  /** When we have a percentage value we should use this if we want to round that percentage value */
  roundNumber?: boolean
  /** Reverse the change value display */
  reverse?: boolean
  /** Allow the radio button to be displayed */
  showRadio?: boolean
  /** When showRadio is true, use this prop to handle the function that needs to be called when the radio is clicked */
  callout?: ({ ...param }: CalloutProps) => void
  /** This will set the metric number and checkbox color from list of chartColors */
  checkboxColor?: chartColors
  /** When true, this will set the change value, and change icon to our purple color */
  isNeutralColor?: boolean
  /** Checked state override of the metric radio button by default */
  isChecked?: boolean
  /** Optional className can be added to the metric value */
  metricValueClassName?: string
  /** Display values in a truncated format. i.e. 1.4M instead of 1,400,000 */
  truncateValues?: boolean
  /** DisplayS the full percentage change value if set to true. Otherwise, it will display `<1%` if set to false */
  showLessThanZeroPercentageChange?: boolean
  /** There are some instances where a custom element needs to replace the percentage values. This is where that should live. */
  customSecondaryValue?: React.ReactNode
  secondaryInfo?: never
}
type HeaderMetricTextType = HeaderMetricBase & {
  /** Any value apart from change metrics. Eg: string, text */
  secondaryInfo: string
  value?: never
  change?: never
  pctChange?: never
  currency?: never
  formatType?: never
  metricIcon?: never
  decimalScale?: never
  roundNumber?: never
  reverse?: never
  showRadio?: never
  callout?: never
  checkboxColor?: never
  isNeutralColor?: never
  isChecked?: never
  metricValueClassName?: never
  truncateValues?: never
  showLessThanZeroPercentageChange?: never
  customSecondaryValue?: never
}
export type HeaderMetricProps = HeaderMetricValueType | HeaderMetricTextType
export type CalloutProps = {
  /** When showRadio is true, use this prop to the function that needs to be called when the radio is clicked */
  name: string
  checked: boolean
}
export type CurrencyProps = {
  /** Currency code to display after metric (ex: 100฿) */
  currencyCode: string
  /** Currency symbol to display before metric (ex: $100) */
  currencySymbol: string
}
declare const HeaderMetric: ({
  callout,
  change,
  checkboxColor,
  className,
  currency,
  customSecondaryValue,
  decimalScale,
  fontSize,
  formatType,
  isChecked,
  isNeutralColor,
  linkTo,
  loading,
  metricIcon,
  metricValueClassName,
  pctChange,
  reverse,
  roundNumber,
  secondaryInfo,
  showLessThanZeroPercentageChange,
  showRadio,
  title,
  tooltip,
  truncateValues,
  value,
  metricTooltip,
}: HeaderMetricProps) => JSX.Element
export default HeaderMetric
