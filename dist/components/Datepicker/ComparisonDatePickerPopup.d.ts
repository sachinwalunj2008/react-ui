import type { ComparisonDatePickerProps, SelectionStateBase } from './ComparisonDatePicker';
type ComparisonDatePickerPopupProps = ComparisonDatePickerProps & {
    /** method will receive two values, `selectionState` and `selectionStateDispatch`; (selectionState, selectionStateDispatch) => void */
    onApply: OnApply;
    /** indicates if the custom date range has been selected with valid dates */
    selectedCustomDateRange?: boolean;
};
export declare function ComparisonDatePickerPopup(props: ComparisonDatePickerPopupProps): JSX.Element;
type OnApply = (dates: SelectionStateBase) => void;
export {};
