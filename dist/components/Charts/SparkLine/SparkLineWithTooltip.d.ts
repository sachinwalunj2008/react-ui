import type { HeaderMetricProps } from '../../HeaderMetric/HeaderMetric';
type HeaderMetricType = {
    /** Display title for popover chart */
    title: string;
    /** Main numerical display value at the top of the chart */
    value: number;
    /** Is the chart loading */
    loading?: boolean;
    /** The change value to be displayed (second displayed metric) */
    change?: number;
    /** Currency object that includes currency code & symbol */
    currency?: {
        currencyCode: string;
        currencySymbol: string;
    };
    /** The change percentage (third displayed metric) */
    pctChange?: number;
    /** Value type of display numbers (must be either percentage or number) */
    formatType?: 'percentage' | 'number';
} & HeaderMetricProps;
type SparklinePropsBase = {
    /** Array of graph data object [{data_key: value, period_key: date }, ...] */
    graphData: Array<Record<string, unknown>>;
    /** Main graph line color (default = 'blue') */
    graphColor: string;
    /** The string format for the display date (default: 'MMM Do'); for hours:minutes use 'h:mm' */
    customDateFormat?: string;
    /** The change value to be displayed (second displayed metric) */
    changeValue?: number;
    /** connects valid data points across null values (no data point is given to null values) */
    connectNulls?: boolean;
    /** The key for the values of the data in the chartData object (default = 'data_point') */
    dataKey?: string;
    /** Type of data (default: 'number') */
    dataType?: 'number' | 'currency' | 'percentage' | 'sales';
    /** Max domain value to display (must provide domainMin also) */
    domainMax?: number;
    /** Min domain value to display (must provide domainMax also) */
    domainMin?: number;
    /** All HeaderMetric props allowed */
    headerMetricProps: HeaderMetricType;
    /** Hide sparkline preview */
    hideSparklinePreview?: boolean;
    /** Y-axis domain inverted */
    invertYAxis?: boolean;
    /** Time period object key (default: 'date') */
    periodKey?: string;
    /** Secondary display object */
    secondaryDisplay?: () => JSX.Element;
    /** Show trophy icon in front of display value in header */
    showTrophy?: boolean;
    /** Average/Threshold line color (default is the same as labelColor) */
    thresholdColor?: 'green' | 'red' | 'blue';
    /** The key for the data value representing the average/threshold value in the graph (default = 'threshold') */
    thresholdKey?: string;
};
declare const Sparkline: ({ customDateFormat, connectNulls, dataType, dataKey, domainMax, domainMin, graphColor, graphData, headerMetricProps, hideSparklinePreview, invertYAxis, periodKey, secondaryDisplay, thresholdColor, thresholdKey, }: SparklinePropsBase) => JSX.Element;
export default Sparkline;
