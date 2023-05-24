import React from 'react';
import { TippyProps } from '@tippyjs/react';
type UnsortedColumnTooltipProps = {
    /** Define the tooltip content */
    content: React.ReactNode;
    /** Position for the tooltip */
    position?: TippyProps['placement'];
};
type UnsortedColumnProps = {
    /** Unique label for the unsorted column headers. */
    label: string;
    /** Define the tooltip for a column. */
    tooltip?: UnsortedColumnTooltipProps;
    /** Class name for a column. */
    className?: string;
};
declare const UnsortedColumn: ({ label, tooltip, className, }: UnsortedColumnProps) => JSX.Element;
export default UnsortedColumn;
