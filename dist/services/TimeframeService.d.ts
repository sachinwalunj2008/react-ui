export function getTimeframeDates(timeframe: any, date: any): string | undefined;
export function checkForCorrectTimeframe(timeframe: any): any;
export const historicalTimeframes: {
    id: number;
    display: string;
    value: number;
    timeValue: string;
}[];
export namespace initialTimeframe {
    const type: string;
    const display: string;
    const value: number;
    const timeValue: string;
}
export function getNextAvailableTimeframeOption({ timeframes, type, disabledTimeframeOptions, year, callout, useTimeframeAggregations, customAggregations, getAggregation, }: {
    timeframes: any;
    type: any;
    disabledTimeframeOptions: any;
    year?: undefined;
    callout: any;
    useTimeframeAggregations: any;
    customAggregations: any;
    getAggregation: any;
}): void;
