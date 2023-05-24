export type ActiveFilterProps = {
    [key: string]: {
        /** If the value is a list, it will be displayed on a tooltip */
        value: number | number[] | string[];
        comparison_value: string;
        label: string;
    };
};
type TableFilterProps = {
    activeFilters: ActiveFilterProps;
    remove: (filter?: string) => void;
};
declare const TableFilter: ({ activeFilters, remove, }: TableFilterProps) => JSX.Element;
export default TableFilter;
