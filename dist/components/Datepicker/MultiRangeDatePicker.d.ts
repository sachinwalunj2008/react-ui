import * as React from 'react';
import type { SelectionState, SelectionStateDispatchActions } from './ComparisonDatePicker';
type MultiRangeDatePickerProps = {
    selectionState: SelectionState;
    selectionStateDispatch: React.Dispatch<SelectionStateDispatchActions>;
};
export declare function MultiRangeDatePicker({ selectionState, selectionStateDispatch, }: MultiRangeDatePickerProps): JSX.Element;
export {};
