import React from 'react';
type SearchBarProps = {
    /** The value to be passed into the `SearchBar` */
    value: string;
    /** The function that will update the `value` */
    onChange: (searchInputText: string) => void;
    /** Optionally add a debounce in milliseconds. The default time is DEBOUNCE_STANDARD_TIME (250ms) */
    debounce?: number;
    /** Optionally start with the `SearchBar` in a focused state */
    autoFocus?: boolean;
    /** `SearchBar` placeholder text. The default placeholder is "Search" */
    placeholder?: string;
    /** Optionally add a keyUp callout to perform */
    keyUpCallout?: () => void;
    /** Optionally pass in a minimum width to make the `SearchBar` wider. The default `minWidth` is 300px.
     ** NOTE: This override only applies to tablet and desktop. It should only be used if UX needs to make the `SearchBar` minimum width something other than 300px. */
    minWidth?: number;
};
declare const SearchBar: React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLInputElement>>;
export default SearchBar;
