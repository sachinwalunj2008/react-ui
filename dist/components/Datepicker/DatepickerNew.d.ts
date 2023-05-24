import { Moment } from 'moment';
import { OrientationShape } from 'react-dates';
type DatepickerNewProps = {
    startDate: Moment | null;
    endDate?: Moment | null;
    preSelected?: string;
    selected?: string;
    startDateId?: string;
    endDateId?: string;
    focused?: boolean;
    showAllDates?: boolean;
    resetDate?: () => void;
    startDateReset?: Moment;
    endDateReset?: Moment;
    onDatesChange?: (startDate: Moment | null, endDate: Moment | null) => void;
    onDateChange?: (startDate: Moment | null) => void;
    hasFutureDates?: boolean;
    specifiedDay?: Moment;
    isOutsideRangeHandler?: (startDate: Moment) => boolean;
    dateRangeFormat?: string;
    /** customizable display format for date (default: 'MMMM DD, YYYY') */
    singleDateDisplayFormat?: string;
    startDatePlaceholder?: string;
    endDatePlaceholder?: string;
    /** Placeholder for single date input (default: 'Date') */
    placeholder?: string;
    /** identifies that the input is for a single date */
    isSingle?: boolean;
    /** unique identifier for date input; needed if manual input option is desired */
    customId?: string;
    reopenOnClear?: boolean;
    monthsNum?: number;
    customClass?: string;
    reset?: boolean;
    orientation?: OrientationShape | undefined;
    /** Allow for manual entry / typing date into input (default: false) */
    manualInput?: boolean;
    /** Show the native component's `X` to clear the date field (default: false) */
    showClearDate?: boolean;
};
declare const DatepickerNew: ({ customClass, customId, dateRangeFormat, endDate, endDateId, endDatePlaceholder, endDateReset, focused, hasFutureDates, isOutsideRangeHandler, isSingle, manualInput, monthsNum, onDateChange, onDatesChange, orientation, placeholder, reopenOnClear, reset, resetDate, showAllDates, showClearDate, singleDateDisplayFormat, specifiedDay, startDate, startDateId, startDatePlaceholder, startDateReset, }: DatepickerNewProps) => JSX.Element;
export default DatepickerNew;
