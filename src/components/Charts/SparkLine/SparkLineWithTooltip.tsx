import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  Button,
  hasValue,
  HeaderMetric,
  ListLoading,
  MdashCheck,
  PopoverAndMobileDrawer,
  sortFilter,
  SparkLine,
  useIsMobileView,
} from '../../../module'
import { TextUnderline } from '../../TextUnderline/TextUnderline'
import { abbreviateNumber } from './abbreviateNumber'
import type { HeaderMetricProps } from '../../HeaderMetric/HeaderMetric'

import styles from './_spark-line-with-tooltip.module.scss'

type HeaderMetricType = {
  /** Display title for popover chart */
  title: string
  /** Main numerical display value at the top of the chart */
  value: number
  /** Is the chart loading */
  loading?: boolean
  /** The change value to be displayed (second displayed metric) */
  change?: number
  /** Currency object that includes currency code & symbol */
  currency?: {
    currencyCode: string
    currencySymbol: string
  }
  /** The change percentage (third displayed metric) */
  pctChange?: number
  /** Value type of display numbers (must be either percentage or number) */
  formatType?: 'percentage' | 'number'
} & HeaderMetricProps

type SparklinePropsBase = {
  // REQUIRED PARAMS
  /** Array of graph data object [{data_key: value, period_key: date }, ...] */
  graphData: Array<Record<string, unknown>>
  /** Main graph line color (default = 'blue') */
  graphColor: string

  // OPTIONAL PARAMS
  /** The string format for the display date (default: 'MMM Do'); for hours:minutes use 'h:mm' */
  customDateFormat?: string
  /** The change value to be displayed (second displayed metric) */
  changeValue?: number
  /** connects valid data points across null values (no data point is given to null values) */
  connectNulls?: boolean
  /** The key for the values of the data in the chartData object (default = 'data_point') */
  dataKey?: string
  /** Type of data (default: 'number') */
  dataType?: 'number' | 'currency' | 'percentage' | 'sales'
  /** Max domain value to display (must provide domainMin also) */
  domainMax?: number
  /** Min domain value to display (must provide domainMax also) */
  domainMin?: number
  /** All HeaderMetric props allowed */
  headerMetricProps: HeaderMetricType
  /** Hide sparkline preview */
  hideSparklinePreview?: boolean
  /** Y-axis domain inverted */
  invertYAxis?: boolean

  /** Time period object key (default: 'date') */
  periodKey?: string
  /** Secondary display object */
  secondaryDisplay?: () => JSX.Element
  /** Show trophy icon in front of display value in header */
  showTrophy?: boolean
  /** Average/Threshold line color (default is the same as labelColor) */
  thresholdColor?: 'green' | 'red' | 'blue'
  /** The key for the data value representing the average/threshold value in the graph (default = 'threshold') */
  thresholdKey?: string
}

const DEFAULT_BLUE = 'var(--chart-standard-blue)'
const DEFAULT_LIGHTBLUE = 'var(--chart-light-2-blue)'

const Sparkline = ({
  customDateFormat = 'MMM Do',
  connectNulls = false,
  dataType = 'number',
  dataKey = 'data_point',
  domainMax,
  domainMin,
  graphColor = 'blue',
  graphData,
  headerMetricProps,
  hideSparklinePreview = false,
  invertYAxis,
  periodKey = 'date',
  secondaryDisplay,
  thresholdColor,
  thresholdKey = 'threshold',
}: SparklinePropsBase): JSX.Element => {
  const isMobileView = useIsMobileView()
  const graphLineColor = `var(--chart-standard-${graphColor})`
  const thresholdStrokeColor = `var(--chart-light-2-${
    thresholdColor || graphColor
  })`
  const { title, currency } = headerMetricProps

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // DYNAMIC CALCULATIONS FOR TOOLTIP HEIGHT WITH SECONDARY CONTAINER
  /////////////////////////////////////////////////////////////////////////////////////////////////
  const [secondaryContainerHeight, setSecondaryContainerHeight] = useState(0),
    containerRef = useRef<HTMLDivElement>(null)

  const getSecondaryContainerHeight = () => {
    const elementRect = containerRef.current?.getBoundingClientRect()
    if (elementRect) {
      return elementRect.height
    } else {
      return 0
    }
  }

  useEffect(() => {
    let checkCount = 0
    const elementCheck = setInterval(() => {
      const height = getSecondaryContainerHeight()
      if (height > 0 || checkCount > 5) {
        setSecondaryContainerHeight(height)
        clearInterval(elementCheck)
      }
      checkCount++
    }, 1000)

    return () => clearInterval(elementCheck)
  }, [])

  // NOTE: 200 is the height of the main chart container;
  // 110 includes the chart legend and the top and bottom padding of the tooltip container;
  // 156 includes the 73 from the main chart plus 83 for the header height;
  // secondaryContainerHeight is the dynamic height of the secondary container;
  // if `isMobileView` then the chart and secondary container are stacked vertically and need
  // the combined height of both containers; otherwise the tippy container needs to be
  // the height of the tallest container
  const tippyContainerHeight = isMobileView
    ? `${200 + secondaryContainerHeight + 156}px`
    : `${Math.max(200, secondaryContainerHeight) + 110}px`
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const TooltipChart = () => (
    <div
      className={`${styles.chartSpacing} first-container`}
      data-testid={`${title}-sparkline-tooltip-popover-chart`}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <ResponsiveContainer width='100%' height={200}>
        <LineChart
          data={graphData}
          // this onClick is needed for the tooltip to work on mobile (https://github.com/recharts/recharts/issues/444#issuecomment-335857687)
          onClick={undefined}
        >
          <Tooltip
            content={
              // @ts-expect-error TS is expecting props here, but they are provided by the LineChart/Tooltip components (in LineChart context)
              <LineTooltip
                className='basic'
                customDateFormat={customDateFormat}
                decimalScale={headerMetricProps.decimalScale}
                prefix={dataType === 'currency' ? currency?.currencySymbol : ''}
                suffix={dataType === 'percentage' ? '%' : ''}
              />
            }
            cursor
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[
              domainMin === 1 ? 1 : 'auto',
              domainMax === 1 ? 1 : 'auto',
            ]}
            tickCount={
              domainMax && domainMin && domainMax - domainMin <= 2 ? 3 : 5
            }
            tickMargin={5}
            width={44}
            style={{
              fontSize: '12px',
              fill: 'var(--purple)',
            }}
            type='number'
            reversed={invertYAxis}
            tickFormatter={(tick) =>
              `${
                dataType === 'sales' || dataType === 'currency'
                  ? currency?.currencySymbol
                  : ''
              }${abbreviateNumber(tick)}${dataType === 'percentage' ? '%' : ''}`
            }
          />
          <XAxis
            dataKey={periodKey}
            type='category'
            interval='preserveStart'
            tickCount={8}
            tickLine={false}
            tickMargin={10}
            tick={
              // @ts-expect-error TS is expecting props here, but they are provided by the XAxis component (in XAxis context)
              <TwoLineDateLabel customDateFormat={customDateFormat} />
            }
          />
          <Line
            dataKey={dataKey}
            stroke={graphLineColor || DEFAULT_BLUE}
            strokeWidth={2}
            dot={{
              fill: graphLineColor || DEFAULT_BLUE,
              strokeWidth: 1,
              r: 2,
            }}
            fillOpacity={1}
            fill='var(--white)'
            activeDot={{
              stroke: graphLineColor || DEFAULT_BLUE,
              fill: 'var(--white)',
              strokeWidth: 2,
              r: 4.6,
            }}
            connectNulls={connectNulls}
          />
          <Line
            dataKey={thresholdKey}
            stroke={thresholdStrokeColor || DEFAULT_LIGHTBLUE}
            dot={false}
            strokeDasharray='5,5'
          />
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.justifyCenter}>
        <div className={styles.alignCenter}>
          <div className={`${styles.line} bgc-chart-standard-${graphColor}`} />
          <div className={styles.titleText}>{title}</div>
        </div>
      </div>
    </div>
  )

  const SecondaryDisplay = () => (
    <div
      ref={containerRef}
      style={{
        visibility: secondaryContainerHeight ? 'visible' : 'hidden',
      }}
    >
      {secondaryDisplay && secondaryDisplay()}
    </div>
  )

  return (
    <PopoverAndMobileDrawer
      tippyProps={{
        className: styles.noPadding,
        maxWidth: 'none',
        placement: 'top',
      }}
      sideDrawerProps={{
        headerContent: headerMetricProps.title,
      }}
      content={
        <div
          className={styles.tooltipPopoverContainer}
          style={{
            ...(secondaryDisplay ? { height: tippyContainerHeight } : {}),
          }}
        >
          {/* TOOLTIP HEADER */}
          <div
            className={styles.tooltipPopoverHeader}
            data-testid={`${title}-sparkline-tooltip-popover-header`}
          >
            <HeaderMetric {...headerMetricProps} />
          </div>

          {/* TOOLTIP CHART ONLY */}
          {!secondaryDisplay && <TooltipChart />}

          {/* OR...TOOLTIP CHART && SECONDARY CONTAINER */}
          {secondaryDisplay && (
            <div className={styles.tooltipBodyContainer}>
              <TooltipChart />
              <SecondaryDisplay />
            </div>
          )}
        </div>
      }
    >
      {/* SMALL SPARKLINE CHART - INITIAL DISPLAY CHART */}
      {graphData?.length ? (
        <div className={styles.miniChartContainer}>
          <SparkLine
            graphData={graphData}
            dataKey={dataKey}
            strokeColor={graphColor}
            thresholdColor={thresholdColor || graphColor}
            thresholdKey={thresholdKey}
            containerClassName={hideSparklinePreview ? styles.hide : ''}
            lineChartProps={{ style: { cursor: 'pointer' } }}
            yAxisProps={{ reversed: invertYAxis }}
            lineProps={{ connectNulls }}
          />
          <Button
            styleType='text-blue'
            className={graphData.length === 1 ? 'mt-8' : ''}
          >
            View
          </Button>
        </div>
      ) : (
        <div style={{ width: '150px' }}>
          <ListLoading
            customGridGap='2px'
            customHeight='14px'
            numberOfRows={3}
            noSlideInUp
          />
        </div>
      )}
    </PopoverAndMobileDrawer>
  )
}

export default Sparkline

type TwoLineDateLabelProps = {
  x: string | number
  y: string | number
  payload: {
    value: string | number
  }
  removeDay?: boolean
  customDateFormat: string
}

const TwoLineDateLabel = ({
  x,
  y,
  payload,
  customDateFormat,
}: TwoLineDateLabelProps): JSX.Element => {
  const day = moment.utc(payload.value),
    dateFormat = customDateFormat

  return (
    <g>
      <text className={styles.fs12} x={x} y={y}>
        <tspan
          fill='rgb(116, 121, 157)'
          textAnchor='middle'
          key='0'
          x={x}
          dy='1.1em'
        >
          {day.format(dateFormat)}
        </tspan>
      </text>
    </g>
  )
}

type LineTooltipTypes = {
  /** Required but provided through context by Recharts */
  payload: {
    tooltipId: number
    dataKey: string
    value: number
    color: string
  }[]
  active: boolean
  className: string
  customDateFormat: string
  decimalScale?: number
  keysToRemovePrefix: string[]
  label: string
  prefix?: string
  suffix?: string
  tooltipOrder?: string[]
  tooltipSecondDate?: string
}

const LineTooltip = ({
  payload,
  active,
  className,
  customDateFormat,
  decimalScale = 0,
  keysToRemovePrefix,
  label,
  prefix,
  suffix,
  tooltipOrder,
  tooltipSecondDate,
}: LineTooltipTypes) => {
  const locale = undefined, // may eventually customize with user's locale
    options = {
      minimumFractionDigits: decimalScale,
      maximumFractionDigits: decimalScale,
    }
  if (tooltipOrder) {
    payload?.map((e) => {
      const tooltipId = tooltipOrder.indexOf(e.dataKey) + 1
      e.tooltipId = tooltipId
      return e
    })
    payload = sortFilter(payload, 'tooltipId', '')
  }
  const day = moment.utc(label).format(customDateFormat)
  if (active) {
    return (
      <div className={`${className}-tooltip`}>
        {/* DISPLAY DATE */}
        <div className={styles.flex}>
          <TextUnderline text={day} />
          {tooltipSecondDate && (
            <span className={styles.titleText}>
              {`  -  ${moment(label).add(6, 'days').format(customDateFormat)}`}
            </span>
          )}
        </div>

        {/* DISPLAY DATA POINT DATA */}
        <div className={styles.displayDataPoint}>
          {payload?.map((e) => {
            const check =
              typeof e.value === 'number' && !isNaN(e.value)
                ? hasValue(e.value)
                : !!e.value
            if (e.dataKey.includes('dontuse')) {
              return undefined
            }
            const usePrefix = prefix && !keysToRemovePrefix?.includes(e.dataKey)
            const useSuffix = suffix && !keysToRemovePrefix?.includes(e.dataKey)
            return (
              <div key={e.dataKey} data-testid='tooltip-hover-text-container'>
                {/* TOOLTIP HOVER TEXT */}
                <div className={styles.titleText}>
                  {e.dataKey
                    .toLocaleString()
                    .split('_')
                    .map((word) => {
                      if (word.toLowerCase() === 'vat') {
                        word = 'VAT'
                      }
                      return word.charAt(0).toUpperCase() + word.slice(1)
                    })
                    .join(' ')}
                </div>

                {/* TOOLTIP HOVER VALUE */}
                <div className={styles.tooltipStats} style={{ color: e.color }}>
                  <MdashCheck check={check}>
                    {usePrefix && prefix}
                    {e.value.toLocaleString(locale, options)}
                    {useSuffix && suffix}
                  </MdashCheck>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return null
}
