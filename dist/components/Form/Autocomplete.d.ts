type InternalAutocompleteProps<Item> = {
    /** Callback to determine text that's displayed if selected item exists */
    getSelectedText: (selectedOption: Item) => string | number;
    /** The callback function for updates to search input */
    onSearchChange: (value: string) => void;
    /** The text for searching in the options */
    searchText: string;
    /** The callback function when an option is selected */
    onChange: (selectedOption?: Item) => void;
    /** Optional callback of the collection of options */
    options?: Item[];
    /** Optional value for the position of the dropdown arrow */
    position?: 'right' | 'left' | 'middle';
    /** Optional value for the direction of the dropdown arrow */
    direction?: 'top' | 'down';
    /** Optional value to determine if input for Autocomplete should automatically focus for typing */
    autoFocus?: boolean;
    /** Optional value to display loading UI */
    loading?: boolean;
    /** Optional object that's selected */
    selectedItem?: Item;
    /** Optional component or string to render as header for dropdown of options */
    headerRender?: string | (() => JSX.Element);
    /** Optional text to display when no options are found */
    noOptionsText?: string;
    /** Optional style class for input component */
    inputClassName?: string;
    /** Optional style class for input label */
    inputLabelText?: string;
    /** Optional placeholder for input UI for Autocomplete */
    placeholder?: string;
};
type AutocompleteWithSingleOptionRender<Item> = InternalAutocompleteProps<Item> & {
    /**  Callback to determine the value of the key for each option element */
    getKey: (option: Item) => string;
    optionRender: (option: Item, onClick: () => void, isSelected: boolean) => JSX.Element | string;
    optionsRender?: never;
};
type AutocompleteWithOptionsRender<Item> = InternalAutocompleteProps<Item> & {
    /** Callback to render all options as a component. Cannot use with optionRender */
    optionsRender: (handleOptionChange: (option: Item) => void, config: {
        options: Item[];
        selectedItem?: Item;
    }) => JSX.Element;
    getKey?: never;
    optionRender?: never;
};
type AutocompleteProps<Item> = AutocompleteWithSingleOptionRender<Item> | AutocompleteWithOptionsRender<Item>;
declare function Autocomplete<Item>({ getSelectedText, onSearchChange, searchText, onChange, position, direction, autoFocus, loading, selectedItem, options, getKey, headerRender, optionRender, optionsRender, noOptionsText, inputClassName, inputLabelText, placeholder, }: AutocompleteProps<Item>): JSX.Element;
export default Autocomplete;
