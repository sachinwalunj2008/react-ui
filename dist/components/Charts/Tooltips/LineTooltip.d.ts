import React from 'react';
type LineTooltipProps = {
    /** Determines whether to show the tooltip */
    active: boolean;
    /** Payload from the graph data */
    payload: Array<{
        dataKey: string;
        tooltipId: number;
        color?: string;
        value: number | string;
    }>;
    /** This is always a date */
    label: string;
    /** Optional classname */
    className?: string;
    /** Optional prefix added to the values */
    prefix?: React.ReactNode;
    /** Optional suffix added to the values */
    suffix?: React.ReactNode;
    /** Optional secondary date value */
    tooltipSecondDate?: boolean;
    /** Optionally arrange the order of the values in the tooltip */
    tooltipOrder?: Array<string>;
};
declare const LineTooltip: ({ active, payload, label, className, prefix, suffix, tooltipSecondDate, tooltipOrder, }: LineTooltipProps) => JSX.Element;
export default LineTooltip;
