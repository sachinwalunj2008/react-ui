export type DisplaySelectionProps = {
    /** Array of all the items that can be displayed in the UI */
    totalDisplayList: string[];
    /** Array of user selected items that we want displayed in the UI */
    selectedDisplayList: string[];
    /** Function to set array of selected items saved by the user */
    customSelectionCallout: (selectedList: string[]) => void;
    /** The text that will display at the top of the popover */
    headerText: string;
    /** Custom placeholder text for the searchbar */
    searchPlaceholder?: string;
    /** Custom text that will display if no items match the search input */
    noListDataText?: string;
    /** The callout that will be made when the `Set to Default` button is clicked. */
    setToDefaultCallout: () => void;
};
/**
 * @deprecated This component is no longer being used.
 **/
declare const CustomDisplay: ({ selectedDisplayList, totalDisplayList, customSelectionCallout, headerText, searchPlaceholder, noListDataText, setToDefaultCallout, }: DisplaySelectionProps) => JSX.Element;
export default CustomDisplay;
