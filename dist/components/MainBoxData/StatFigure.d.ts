import React from 'react';
import { IconStringList } from '../../module';
/**
 * @deprecated Please use HeaderMetric instead
 **/
export interface StatFigureProps {
    /** string or JSX to display a stat title */
    title?: React.ReactNode | string;
    /** string or JSX to display a stat subtitle */
    subtitle?: React.ReactNode | string;
    /** string or JSX to display a stat list_heading */
    list_heading?: React.ReactNode;
    /** determine what metric type is being used for the stat value */
    metric?: 'percentage' | 'currency' | 'units';
    /** custom string value appended to the stat value */
    suffix?: string;
    /** use a thousand separator for large numbers */
    thousandSeparator?: boolean;
    /** custom className values to be included with individual stats */
    customClass?: string;
    /** icon name to be appended after the stat value */
    icon?: IconStringList;
    /** are stat values in a loading state */
    loading?: boolean;
    multipleStats?: boolean;
    multipleStatsVertical?: boolean;
    /** does the stat value have a decimal value; if so, the number of decimal places must be set with `decimalScale` */
    fixedDecimalScale?: boolean;
    /** number of decimal places to display */
    decimalScale?: number;
    useCustomDecimalScale?: boolean;
    showLessThanZero?: boolean;
    roundNumber?: boolean;
    noConversion?: boolean;
    currency?: string;
    /** the numerical value to display */
    stat?: number;
    /** second stat (utilizes many of the same props as original stat) */
    subStat?: StatFigureProps;
}
declare const StatFigure: ({ title, subtitle, list_heading, stat, subStat, metric, suffix, currency, thousandSeparator, customClass, icon, loading, multipleStats, fixedDecimalScale, decimalScale, useCustomDecimalScale, roundNumber, noConversion, showLessThanZero, multipleStatsVertical, }: StatFigureProps) => JSX.Element;
export default StatFigure;
