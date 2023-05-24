type CustomizeTableColumnsProps = {
    /** Array of all the columns that can be displayed in the UI */
    options: string[];
    /** Array of user selected columns that we want displayed in the UI */
    selected: string[];
    /** Updates the array of selected columns after customization has been confirmed */
    selectionCallout: (selectedList: string[]) => void;
    /** The reset function to set the columns back to the default setting */
    setToDefaultCallout: () => void;
};
declare const CustomizeTableColumns: ({ options, selected, selectionCallout, setToDefaultCallout, }: CustomizeTableColumnsProps) => JSX.Element;
export default CustomizeTableColumns;
