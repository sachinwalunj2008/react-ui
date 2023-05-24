import type { Moment } from 'moment';
import type { SelectionState } from './ComparisonDatePicker';
export declare function backgroundClassNames(dayStatus: DayStatus): string;
export declare function foregroundClassNames(dayStatus: DayStatus): string;
type DayStatus = {
    /** Whether this day is included in the first range, second range, or both/none ranges */
    rangeType: 'none' | 'first' | 'second' | 'both';
    /** Whether this day is a start date, end date, or both/none. Also which range it belongs to */
    startEndType: 'none' | 'first-start' | 'first-end' | 'second-start' | 'second-end' | 'same-day' | 'multiple';
    /** Information on which range starts before the other range; important to know for colors */
    rangeThatStartsFirst: 'first' | 'second' | 'none';
};
export declare function getDayStatus(day: Moment, selectionState: SelectionState): DayStatus;
export {};
