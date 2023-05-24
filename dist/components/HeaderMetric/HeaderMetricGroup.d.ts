import { HeaderMetricProps, CalloutProps } from './HeaderMetric';
export type HeaderMetricGroupProps = {
    /** Header metric array of data */
    data: Array<Omit<HeaderMetricProps, 'checkboxColor' | 'loading'>>;
    /** Boolean to determine loading state */
    loading: boolean;
    /** Show radio button */
    showRadio?: boolean;
    /** When showRadio is true, use this prop to handle the function that needs to be called when the radio is clicked */
    mainCallOut?: ({ ...param }: CalloutProps) => void;
    /** The number of metrics above the HeaderMetricGroup that will offset the colors accordingly. */
    otherMetricCount?: number;
    /** The metrics currently active. */
    activeMetrics?: string[];
    /** For styling purposes: when there are no elements below this component we need to handle the styles correctly. */
    styleBottom?: boolean;
    /** Optional array of colors if the order of the colors needs to be manually defined instead of using the default defined here. */
    colors?: chartColors[];
    /** Optionally move the change metrics below the main metric for the entire group. */
    showChangeBelowMainMetric?: boolean;
};
export declare const checkboxColorOptions: readonly ["chart-standard-royal", "chart-standard-pink", "chart-standard-blue", "chart-standard-orange", "chart-standard-purple", "chart-standard-teal", "chart-standard-yellow", "chart-standard-green", "chart-standard-red", "chart-light-3-royal", "chart-light-3-pink", "chart-light-3-blue", "chart-light-3-orange", "chart-light-3-purple", "chart-light-3-teal", "chart-light-3-yellow", "chart-light-3-green", "chart-light-3-red", "chart-light-5-royal", "chart-light-5-pink", "chart-light-5-blue", "chart-light-5-orange", "chart-light-5-purple", "chart-light-5-teal", "chart-light-5-yellow", "chart-light-5-green", "chart-light-5-red", "chart-dark-2-royal", "chart-dark-2-pink", "chart-dark-2-blue", "chart-dark-2-orange", "chart-dark-2-purple", "chart-dark-2-teal", "chart-dark-2-yellow", "chart-dark-2-green", "chart-dark-2-red", "chart-dark-3-royal", "chart-dark-3-pink", "chart-dark-3-blue", "chart-dark-3-orange", "chart-dark-3-purple", "chart-dark-3-teal", "chart-dark-3-yellow", "chart-dark-3-green", "chart-dark-3-red", "chart-light-2-royal", "chart-light-2-pink", "chart-light-2-blue", "chart-light-2-orange", "chart-light-2-purple", "chart-light-2-teal", "chart-light-2-yellow", "chart-light-2-green", "chart-light-2-red", "purple", "blue", "red", "dark-yellow"];
export type chartColors = typeof checkboxColorOptions[number];
declare const HeaderMetricGroup: ({ data, mainCallOut, showRadio, otherMetricCount, activeMetrics, loading, styleBottom, colors, showChangeBelowMainMetric, }: HeaderMetricGroupProps) => JSX.Element;
export default HeaderMetricGroup;
