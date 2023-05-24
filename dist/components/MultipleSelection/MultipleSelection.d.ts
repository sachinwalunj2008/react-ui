import React from 'react';
import { TooltipProps } from '../Tooltip/Tooltip';
type MultipleSelectionBaseProps = {
    /** Array of options displayed in the UI */
    options: string[];
    /** Array of user selected options that we want selected when the component mounts */
    selectedOptions: string[];
    /** Function to set the array of selected options */
    callout: (selectedList: string[]) => void;
    /** Label text */
    labelText: string;
    /** Optional Right aligned Label */
    rightLabel?: React.ReactNode;
    /** Label tooltip */
    labelTooltip?: Omit<TooltipProps, 'children'>;
    /** Option to make this field required */
    required?: boolean;
    /** Custom placeholder text for the SearchBar */
    searchPlaceholder?: string;
    /** Custom text that will display if no items match the search input */
    noListDataText?: string;
};
type ExposedProps = MultipleSelectionBaseProps & {
    /** Option to make the component exposed and displayed similar to what the `InlineMultiSelect` looks like. */
    exposed: boolean;
    /** Optionally override the maxHeight for the exposed container. */
    maxHeight?: number | string;
    appendTo?: never;
    selectPlaceholder?: never;
};
type StandardProps = MultipleSelectionBaseProps & {
    /** Useful when we want to attach this to another component making use of Tippy */
    appendTo?: 'parent' | ((element: Element) => Element);
    /** Custom placeholder text for the Select Dropdown */
    selectPlaceholder: string;
    exposed?: never;
    maxHeight?: never;
};
type MultipleSelectionProps = ExposedProps | StandardProps;
declare const MultipleSelction: ({ appendTo, selectedOptions, options, callout, selectPlaceholder, labelText, searchPlaceholder, noListDataText, required, labelTooltip, rightLabel, exposed, maxHeight, }: MultipleSelectionProps) => JSX.Element;
export default MultipleSelction;
