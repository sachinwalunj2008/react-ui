type TimeframeFilterProps = {
    /** Function to be called when an option is clicked */
    callout: () => void;
    /** Selected time frame */
    timeframe: {
        type: string;
        display: string;
        value?: number;
        timeValue: string;
        quarter?: number;
        year?: string;
    };
    /** historical time frame options in a array */
    historicalTimeframes?: {
        id: number;
        display: string;
        value: number;
        timeValue: string;
    }[];
    /** Show/hide the Current timeframe sections based on this boolean value */
    currentTimeframe?: boolean;
    /** Show/hide the Quartely/Yearly timeframe sections based on this boolean value  */
    quarterlyTimeframe?: boolean;
};
declare const TimeframeFilter: ({ callout, historicalTimeframes, timeframe, currentTimeframe, quarterlyTimeframe, }: TimeframeFilterProps) => JSX.Element;
export default TimeframeFilter;
