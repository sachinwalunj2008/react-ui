import { SortByProps } from '../components/SortColumn/SortColumn';
export declare const capitalize: (string: string) => string;
export declare const hasValue: (item: unknown) => boolean;
export declare const notEmpty: (item: unknown) => boolean;
export declare const trimText: (text: string | undefined, characterLength: number) => string;
export declare const debounce: <T extends unknown[], U>(callback: (...args: T) => U | PromiseLike<U>, wait: number) => VoidFunction;
export type ActiveCellClassProps = {
    /** activeName - The key that is active for sorting */
    activeName: string;
    /** cells - A single key OR an array of keys that contain the keys for a column cell */
    cells: string | string[];
    /** color - If you want a background color other than light-blue.
     * To use this, you need to create a style in _table.module.scss
     * and pass that class name in as the string */
    color?: string;
};
export declare const activeCellClass: ({ cells, activeName, color, }: ActiveCellClassProps) => string;
type HasStickyColumnStyleProps = {
    colIndex: number;
    stickyLeftColumn?: number;
    stickyRightColumn?: number;
    tableHeadersLength: number;
};
export declare const hasStickyColumnStyle: ({ colIndex, stickyLeftColumn, stickyRightColumn, tableHeadersLength, }: HasStickyColumnStyleProps) => string;
/**
 * List of columns that have string to be sorted, ex: ['seller_name', 'marketplace'];
 * Pattern has determined that alpha-numeric values be sorted opposite to convention so that `desc` is A-Z, 0-9 and `asc` is 9-0, Z-A
 **/
type ColumnsWithStringArray = string[];
/** string format: `prop:value` or `prop:value:lowercase` */
type ParamString = string;
export declare const standardSortParams: (sortBy: SortByProps, columnsWithStrings?: ColumnsWithStringArray) => ParamString;
export declare const largeNumConversion: (num?: string | number) => {
    val: number;
    suffix?: string | undefined;
};
export declare const snakeCaseToTitle: (string: string) => string;
export declare const DEBOUNCE_STANDARD_TIME = 250;
export {};
