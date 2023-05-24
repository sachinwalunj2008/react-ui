import React from 'react'
import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts'
import { useIsMobileView } from '../../../hooks'

type SparkLineType = {
  /** ClassName to be applied to the ResponsiveContainer */
  containerClassName?: string
  /** Object key where the data points are stored */
  dataKey: string
  /** The graph data (example: [{dataKey: number, date: 'YYYY-MM-DD', threshold: dashed_line_value}] ) */
  graphData: Array<Record<string, unknown>>
  /** Props to be passed to the Line component {accepts all Rechart `Line` Props} */
  lineProps?: React.ComponentPropsWithoutRef<typeof Line>
  /** Props to be passed to the LineChart component {accepts all Rechart `LineChart` Props} */
  lineChartProps?: React.ComponentPropsWithoutRef<typeof LineChart>
  /** Line color; expect 'green', 'red', or 'blue' (default: blue) */
  strokeColor?: string
  /** Color of the dashed threshold line; expect 'green', 'red', or 'blue' (default: blue) */
  thresholdColor?: string
  /** Object key where the threshold data value is stored */
  thresholdKey?: string
  /** Props to be passed to the YAxis component {accepts all Rechart `YAxis` Props} */
  yAxisProps?: React.ComponentPropsWithoutRef<typeof YAxis>
}

const DEFAULT_BLUE = 'var(--chart-light-2-blue)'

const SparkLine = ({
  containerClassName,
  dataKey = 'data_point',
  graphData,
  strokeColor,
  thresholdColor,
  thresholdKey,
  lineProps,
  lineChartProps,
  yAxisProps,
}: SparkLineType): JSX.Element => {
  const isMobileView = useIsMobileView()
  const graphLineColor = strokeColor
    ? `var(--chart-standard-${strokeColor})`
    : DEFAULT_BLUE
  const thresholdLineColor = thresholdColor
    ? `var(--chart-standard-${thresholdColor})`
    : DEFAULT_BLUE

  return (
    <ResponsiveContainer
      width={isMobileView ? 80 : 150}
      height={25}
      className={containerClassName}
    >
      <LineChart
        width={isMobileView ? 150 : 300}
        height={100}
        data={graphData}
        {...lineChartProps}
      >
        <YAxis domain={['auto', 'auto']} hide {...yAxisProps} />

        {/* DATA LINE */}
        <Line
          dataKey={dataKey}
          stroke={graphLineColor}
          strokeWidth={1}
          dot={
            graphData.length === 1
              ? {
                  fill: graphLineColor,
                  strokeWidth: 1,
                  r: 2,
                }
              : false
          }
          {...lineProps}
        />

        {/* THRESHOLD (MIDDLE DASHED LINE) */}
        <Line
          dataKey={thresholdKey}
          stroke={thresholdLineColor}
          dot={false}
          strokeDasharray='5,5'
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SparkLine
