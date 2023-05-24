export const colors: string[];
export function createMonthAgoData(graphData: any, keyName: any, weeklyDataPoints: any): {
    date: number;
    value: any;
};
export function createDataKeyLegend(obj: any, colorSet: any): {
    key: string;
    stroke: any;
}[];
export function dateRangeIncludesTodayCheck(endDate: any): boolean;
export function createYAxisWidth(dataMax: any, prefix: any, suffix: any): number;
export function lineAnimationDelay(length: any): 800 | 600 | undefined;
export function lineAnimationDuration(length: any): 450 | 700 | undefined;
export function statColors(): {
    success: string;
    error: string;
    standard: string;
};
export function getHeight(width: any): 200 | 160;
