import { IconStringList } from '../Icons/Icon';
type changeObjectProps = {
    /** This className will be added to the change value */
    className: string;
    /** This className will be added to the text */
    textClassName: string;
    /** Icon to display in determine change */
    icon: IconStringList;
};
/** This function determines the change and reverse logic based on the change percentage */
export declare const determineChange: (changePct: number, reverse?: boolean, isNeutralColor?: boolean) => changeObjectProps;
type TimeframeTypeBase = {
    timeValue: string;
    aggregation: string;
    display: string;
};
type CurrentTimeframeType = TimeframeTypeBase & {
    type: 'current';
    value?: never;
};
type HistoricalTimeframeTypeBase = TimeframeTypeBase & {
    type: 'historical';
};
type CustomHistoricalTimeframeType = HistoricalTimeframeTypeBase & {
    value: 'custom';
    compareDisplay: string;
};
type NumberHistoricalTimeframeType = HistoricalTimeframeTypeBase & {
    value: number;
    compareDisplay?: never;
};
type HistoricalTimeframeType = CustomHistoricalTimeframeType | NumberHistoricalTimeframeType;
type QuarterlyTimeframeType = TimeframeTypeBase & {
    type: 'quarterly';
    year: number;
    quarter: number;
    value?: never;
};
export type TimeframeType = CurrentTimeframeType | HistoricalTimeframeType | QuarterlyTimeframeType;
export declare const getPeriodDisplays: (timeframe: TimeframeType, column: number) => string;
type ComparisonDatesType = {
    startDate: string;
    timeframe: TimeframeType;
};
export declare const getComparisonDates: ({ startDate, timeframe, }: ComparisonDatesType) => {
    startDate: string;
    endDate: string;
} | undefined;
export type DateType = {
    startDate: string;
    endDate: string;
};
export declare const formatDates: (currentPeriodDates: DateType, comparisonPeriodDates: DateType | undefined) => string;
export {};
