type TableCheckboxProps = {
    name: string;
    checked: boolean;
    handleCheck: () => void;
};
declare const TableCheckbox: ({ name, checked, handleCheck, }: TableCheckboxProps) => JSX.Element;
export default TableCheckbox;
