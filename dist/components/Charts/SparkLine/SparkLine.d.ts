import React from 'react';
import { Line, LineChart, YAxis } from 'recharts';
type SparkLineType = {
    /** ClassName to be applied to the ResponsiveContainer */
    containerClassName?: string;
    /** Object key where the data points are stored */
    dataKey: string;
    /** The graph data (example: [{dataKey: number, date: 'YYYY-MM-DD', threshold: dashed_line_value}] ) */
    graphData: Array<Record<string, unknown>>;
    /** Props to be passed to the Line component {accepts all Rechart `Line` Props} */
    lineProps?: React.ComponentPropsWithoutRef<typeof Line>;
    /** Props to be passed to the LineChart component {accepts all Rechart `LineChart` Props} */
    lineChartProps?: React.ComponentPropsWithoutRef<typeof LineChart>;
    /** Line color; expect 'green', 'red', or 'blue' (default: blue) */
    strokeColor?: string;
    /** Color of the dashed threshold line; expect 'green', 'red', or 'blue' (default: blue) */
    thresholdColor?: string;
    /** Object key where the threshold data value is stored */
    thresholdKey?: string;
    /** Props to be passed to the YAxis component {accepts all Rechart `YAxis` Props} */
    yAxisProps?: React.ComponentPropsWithoutRef<typeof YAxis>;
};
declare const SparkLine: ({ containerClassName, dataKey, graphData, strokeColor, thresholdColor, thresholdKey, lineProps, lineChartProps, yAxisProps, }: SparkLineType) => JSX.Element;
export default SparkLine;
