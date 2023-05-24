import { TooltipProps } from 'recharts'

export type WhereToPlay = {
  customer_name: string
  category_name: string
  /** Mekko Bar - x axis value (yearly revenue/market size) */
  category_yearly_gross_revenue: number
  /** Mekko Bar - y axis (yearly percent growth) */
  forecasted_incremental_category_revenue: number

  /** Bubble Chart - x axis (-1 to +1) */
  barriers_to_entry_score: number
  /** Bubble Chart - y axis (-3 to +3)? */
  fragmentation_score: number
  /** Bubble Chart - x axis (winnability factor; -3 to +3; standard deviation) */
  winnability_score: number

  /** related to Fragmentation */
  hhi_normalized: number
  brand_rms_normalized: number
  review_count_normalized: number
  median_rating_normalized: number
  branded_search_rate_normalized: number
  average_pagescore_normalized: number
}

export type BubbleData = {
  name: string
  x: number
  y: number
  z: number
  bubbleSize: number
  color: string
}

export type TitleProps = {
  text: string
  bold?: boolean
}

export type ReferenceProps = {
  text?: string
  value: number
}

export type ChartProps = {
  /** chart aspect ratio as a number (width/height) */
  aspectRatio?: number
  /** Main center chart title */
  title?: TitleProps
  leftTitle?: TitleProps
  rightTitle?: TitleProps
  bottomTitle?: TitleProps
  /** The width of the chart to display */
  width?: number
  /** The height of the chart to display */
  height?: number
  /** Message to display if no data is available */
  noDataMessage?: string
}

export type BubbleChartProps = {
  /** The minimum bubbleSize over which to display category name (set to 7 for no display names) */
  bubbleSizeToDisplay?: number
  /** general chart props (titles on top, side or bottom), chart width & height */
  chart?: ChartProps
  /** Chart data  */
  data: BubbleData[]
  /** The number of Names to display in the chart (default: 5) */
  numBubbleNamesToDisplay?: number
  /** The background color(s) of the chart quadrants, going clockwise from [top left, top right, bottom right, bottom left] */
  quadrantColors?: string[]
  /** The display title options for the 4 corners of the graph */
  subTitle?: {
    topLeft?: TitleProps
    topRight?: TitleProps
    bottomLeft?: TitleProps
    bottomRight?: TitleProps
  }
  /** object containing the values of the x-axis */
  xAxis?: {
    /** The minimum value of the x-axis */
    min?: number
    /** The maximum value of the x-axis */
    max?: number
    /** The [min, max] values to be used on the x-axis */
    range?: [number, number]
    /** The props for the vertical reference line {value: x value where the line is displayed, text?: display text for reference line} */
    ref?: ReferenceProps
    /** The number of ticks to display on the x-axis */
    ticks?: number
    /** number of decimal places for tick values */
    tickFixed?: number
  }
  /** object containing the values of the y-axis */
  yAxis?: {
    /** The [min, max] values to be used on the y-axis */
    range?: [number, number]
    /** The y-axis middle value */
    ref?: ReferenceProps
    /** Custom number of ticks to display on the y-axis */
    ticks?: number
    /** Determine which side of the chart the Y axis ticks are displayed */
    display?: 'left' | 'right'
  }
  CustomTooltip?: ({
    active,
    payload,
  }: TooltipProps<number, string>) => JSX.Element
  legend?: JSX.Element | (() => JSX.Element)
  loading?: boolean
  showEmptyChart?: boolean
  height?: number
}
