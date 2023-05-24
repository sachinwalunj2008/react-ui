import React from 'react';
type FilterProps = {
    /** Objects with key value pairs about what filter options can render in Filter body */
    filterStates: unknown;
    /** Function to save selected filter options */
    filterCallout: (...params: unknown[]) => void;
    resetButton?: boolean;
    /** Function to reset filter options to default */
    resetCallout?: (...params: unknown[]) => void;
    /** Function to reset date selected from filter options */
    resetDate?: (...params: unknown[]) => void;
    /** Display applied filter count if filter options are selected */
    appliedFilters?: unknown;
    /** Function to call on change of any filter options */
    onChangeCallout?: (...params: unknown[]) => void;
    /** Function to cancel  */
    cancelCallout?: (...params: unknown[]) => void;
    /** Function to open  */
    openCallout?: (...params: unknown[]) => void;
    /** Anything which you would like to add in addition to Filter otions  */
    children?: React.ReactNode;
    /** Set boolean for loading state of filter */
    loading?: boolean;
    /** Set boolean to enable/disable tab indexing */
    noTabIndex?: boolean;
    /** The text that will display at the top of the popover */
    headerText?: string;
    /** Enable/disable Filter button based on API status either loading or success */
    apiStatus?: string;
    /** Disables the filter button */
    disabled?: boolean;
    /** Render filter children above other filter elements rather than the default of below */
    topChildren?: boolean;
};
declare const Filter: ({ filterStates, filterCallout, resetButton, resetCallout, resetDate, appliedFilters, onChangeCallout, cancelCallout, openCallout, children, loading, noTabIndex, headerText, apiStatus, disabled, topChildren, }: FilterProps) => JSX.Element;
export default Filter;
