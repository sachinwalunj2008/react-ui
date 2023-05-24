type OptionBase = {
    name: string;
};
type SelectRowProps<Option extends OptionBase> = {
    highlightedIndex: number;
    index: number;
    selectedItems: Option[];
    option: Option;
    hasCheckbox?: boolean;
};
declare const SelectRow: <Option extends OptionBase>({ highlightedIndex, index, selectedItems, option, hasCheckbox, ...rest }: SelectRowProps<Option>) => JSX.Element;
export default SelectRow;
