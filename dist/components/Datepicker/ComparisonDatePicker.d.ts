import React from 'react';
import { Moment } from 'moment';
type CompareToType = {
    id: number;
    period: string;
    getCompareToDates: (state: SelectionState) => {
        previousStartDate: PickerDate;
        previousEndDate: PickerDate;
    };
};
export type ComparisonDatePickerProps = {
    initial_firstRange_startDate?: PickerDate;
    initial_firstRange_endDate?: PickerDate;
    initial_secondRange_startDate?: PickerDate;
    initial_secondRange_endDate?: PickerDate;
    /** Toggle to determine if  the comparison date range option be visible */
    showComparisonRange?: boolean;
    /** Toggle to determine if the `Compare To` dropdown selector is visible */
    showCompareToSelector?: boolean;
    children?: (
    /** selectionState will include all four dates, compareTo value & resetInputs boolean */
    selectionState: SelectionState, 
    /** dispatch action to update the value of the selectionState */
    selectionStateDispatch: React.Dispatch<SelectionStateDispatchActions>) => React.ReactNode | void;
};
export declare function ComparisonDatePicker(props: ComparisonDatePickerProps): JSX.Element;
export type PickerDate = Moment | null;
export type SelectionStateBase = {
    firstRange_startDate: PickerDate;
    firstRange_endDate: PickerDate;
    secondRange_startDate: PickerDate;
    secondRange_endDate: PickerDate;
    showComparisonRange?: boolean;
};
export type SelectionState = SelectionStateBase & {
    compareTo: CompareToType;
    selecting: keyof SelectionStateBase;
    resetInputs?: boolean;
};
export type SelectionStateDispatchActions = {
    action: 'calendarDateSelected';
    date: Moment | null;
} | {
    action: 'dateInputChanged';
    date: Moment;
    inputName: keyof SelectionStateBase;
} | {
    action: 'resetInputs';
    originalDates: SelectionStateBase;
} | {
    action: 'changeCompareTo';
    compareTo: CompareToType;
} | {
    action: 'selectedDateInputChange';
    inputName: keyof SelectionStateBase;
};
export {};
