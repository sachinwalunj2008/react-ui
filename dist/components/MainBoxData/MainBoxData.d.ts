import React from 'react';
import type { StatFigureProps } from './StatFigure';
import type { TooltipProps } from '../Tooltip/Tooltip';
import type { InfoTooltipProps } from '../InfoTooltip/InfoTooltip';
type MainBoxDataProps = {
    /** array of stats to display */
    statFigures?: StatFigureProps[];
    /** Custom JSX element that will display on the left side of the element */
    customLeftChild?: React.ReactNode;
    /** Custom JSX element that will display on the right side of the element */
    customRightChild?: React.ReactNode;
    customPreStatFigureChild?: React.ReactNode;
    /** tooltip associated with an info icon on the right side of the element */
    tooltipData?: InfoTooltipProps & {
        img?: string;
    };
    reportLink?: string;
    /** JSX element that will display on the right side of the display element but on the left of the separation bar */
    downloads?: React.ReactNode;
    /** JSX element that will display on the right side of the display element but on the right of the separation bar */
    timeframeFilter?: React.ReactNode;
    /** JSX element that will display on the right side of the display element but on the right of the separation bar */
    filters?: React.ReactNode;
    loading?: boolean;
    customClass?: string;
    CustomStatFiguresWrapper?: React.ReactNode;
    maxStatsInTheHeader?: number;
    statTooltipClass?: string;
    statTooltipText?: string;
    tooltipStatContainerClass?: string;
    tooltipPosition?: TooltipProps['position'];
    showMultipleStatsVertically?: boolean;
};
declare const MainBoxData: ({ statFigures, customLeftChild, customRightChild, customPreStatFigureChild, tooltipData, reportLink, downloads, timeframeFilter, filters, loading, customClass, CustomStatFiguresWrapper, maxStatsInTheHeader, statTooltipClass, statTooltipText, tooltipStatContainerClass, tooltipPosition, showMultipleStatsVertically, }: MainBoxDataProps) => JSX.Element;
export default MainBoxData;
