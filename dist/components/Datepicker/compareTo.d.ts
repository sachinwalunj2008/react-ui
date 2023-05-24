import type { PickerDate, SelectionState } from './ComparisonDatePicker';
type PreviousDatesType = {
    previousStartDate: PickerDate;
    previousEndDate: PickerDate;
};
/**
 *    Note:
 *    - This will allow the user to select a custom time period.
 **/
export declare const customTimeSelection: ({ secondRange_startDate, secondRange_endDate, }: SelectionState) => PreviousDatesType;
/**
 *    Note:
 *    - This will automatically select the same number of days going back from the start of the start/end date.
 **/
export declare const previousPeriod: ({ firstRange_startDate, firstRange_endDate, secondRange_startDate, secondRange_endDate, }: SelectionState) => PreviousDatesType;
/**
 *    Note:
 *    - If your selection is less than 7 days, the comparisons should be the 7 days prior to your selection starting on the same day of the week.
 *    - If your selection is longer than 7 days, the functionality should be similar in how it finds the proceeding "same day of the week".
 **/
export declare const previousPeriodMatchDays: ({ firstRange_startDate, firstRange_endDate, secondRange_startDate, secondRange_endDate, }: SelectionState) => PreviousDatesType;
/**
 *    Note:
 *    - This is an exact comparison of days from the previous month.
 *    - It can only be used on any selection less than 30 days.
 **/
export declare const previousMonth: ({ firstRange_startDate, firstRange_endDate, secondRange_startDate, secondRange_endDate, }: SelectionState) => PreviousDatesType;
/**
 *    Note:
 *    - This will compare the same time period in the previous month (4 weeks prior) but match the days of the week
 *    - It can only be used on any selection less than 30 days.
 **/
export declare const previousMonthMatchDays: ({ firstRange_startDate, firstRange_endDate, secondRange_startDate, secondRange_endDate, }: SelectionState) => PreviousDatesType;
/**
 *    Note:
 *    - The comparison should always match the exact time frame starting on the same date the previous year.
 **/
export declare const previousYear: ({ firstRange_startDate, firstRange_endDate, secondRange_startDate, secondRange_endDate, }: SelectionState) => PreviousDatesType;
/**
 *    Note:
 *    - This will compare the same time period in the previous year (52 weeks prior) but match the days of the week
 **/
export declare const previousYearMatchDays: ({ firstRange_startDate, firstRange_endDate, secondRange_startDate, secondRange_endDate, }: SelectionState) => PreviousDatesType;
export declare const compareToOptions: {
    id: number;
    period: string;
    getCompareToDates: ({ secondRange_startDate, secondRange_endDate, }: SelectionState) => PreviousDatesType;
}[];
export {};
