export type SelectDisplayOption = {
    /** Identifier for an option */
    name: string;
    /** Label display for an option */
    label: string;
    /** Tippy value to match and show on condition */
    showTippyOnOption?: boolean;
    /** Object of tippy to show chidren on option value */
    children?: {
        /** Array of options for tippy */
        options: SelectDisplayOption[];
    };
};
type SelectDisplayProps<OptionItem extends SelectDisplayOption> = {
    /** Array of options */
    options: OptionItem[];
    /** Function to be called when an option is clicked */
    callout: (option: OptionItem) => void;
    /** Determines if there is an active option to be highlighted */
    active?: OptionItem['name'];
    /** Adds a border around the component */
    hasBorder?: boolean;
    /** Adds a tippy style around the component */
    hasTippy?: boolean;
};
declare const SelectDisplay: <OptionItem extends SelectDisplayOption>({ options, callout, active, hasBorder, hasTippy, }: SelectDisplayProps<OptionItem>) => JSX.Element;
export default SelectDisplay;
