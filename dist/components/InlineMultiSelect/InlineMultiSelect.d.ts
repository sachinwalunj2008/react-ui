import * as React from 'react';
import type { CheckboxProps } from '../Form/Checkbox';
type ListItems = Record<string, React.ReactNode[]> | React.ReactNode[];
type InlineMultiSelectProps = {
    CustomSearch?: React.ReactNode | boolean;
    CustomList?: React.ReactNode | boolean;
    listItems?: ListItems;
    search?: InlineMultiSelectSearchProps['search'];
    searchCallout?: InlineMultiSelectSearchProps['searchCallout'];
    CustomGroupHeader?: React.ReactNode;
    CustomRow?: React.ReactNode;
    CustomSelectAll?: React.ReactNode;
    selectAllCallout?: (...rest: unknown[]) => void;
    selectAllChecked?: boolean;
    noBorder?: boolean;
    /** Allow the list to not have a set height and overflow in mobile when set to `true` */
    noOverflow?: boolean;
    showNoListData?: boolean;
    noListDataProps?: {
        primaryText?: string;
        secondaryText?: string;
        headers?: string[];
    };
    width?: number;
    exposed?: boolean;
    className?: string;
    style?: React.CSSProperties;
    showGradient?: boolean;
};
export declare function InlineMultiSelect({ CustomSearch, CustomList, CustomGroupHeader, CustomRow, CustomSelectAll, listItems, search, searchCallout, selectAllCallout, selectAllChecked, noBorder, showNoListData, noListDataProps, noOverflow, width, exposed, className, style, showGradient, }: InlineMultiSelectProps): JSX.Element;
type InlineMultiSelectSearchProps = {
    placeholder: string;
    search: string;
    searchCallout: (searchInputText: string) => void;
    autoFocus?: boolean;
    open?: boolean;
};
export declare function InlineMultiSelectSearch({ placeholder, search, searchCallout, autoFocus, open, }: InlineMultiSelectSearchProps): JSX.Element;
type InlineMultiSelectListProps = {
    defaultClassName?: string;
    additionalClassName?: string;
    listItems: ListItems;
    CustomGroupHeader: React.ReactNode;
    CustomRow: React.ReactNode;
    showNoListData?: boolean;
    noListDataProps?: {
        primaryText?: string;
        secondaryText?: string;
        headers?: string[];
    };
};
export declare function InlineMultiSelectList({ defaultClassName, additionalClassName, listItems, CustomGroupHeader, CustomRow, showNoListData, noListDataProps, }: InlineMultiSelectListProps): JSX.Element;
type InlineMultiSelectListGroupHeaderProps = {
    name?: string;
    children?: React.ReactNode;
    recordsLength?: number;
};
export declare function InlineMultiSelectListGroupHeader({ name, children, recordsLength, }: InlineMultiSelectListGroupHeaderProps): JSX.Element;
interface InlineMultiSelectListRowProps extends CheckboxProps<number | string> {
    customClass?: string;
}
export declare const InlineMultiSelectListRow: React.NamedExoticComponent<InlineMultiSelectListRowProps>;
interface InlineMultiSelectAllCheckboxProps extends CheckboxProps<number | string> {
    containerClassName?: string;
    label: string;
    checked: boolean;
    callout: (stateName: string | number | undefined, check: boolean) => void;
    stateName?: string;
}
export declare function InlineMultiSelectAllCheckbox({ containerClassName, label, callout, checked, stateName, }: InlineMultiSelectAllCheckboxProps): JSX.Element;
export {};
