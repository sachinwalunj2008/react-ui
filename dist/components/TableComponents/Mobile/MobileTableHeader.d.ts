import React from 'react';
import { SortColumnProps } from '../../SortColumn/SortColumnProps';
import StandardTable from '../StandardTable';
import { ConfigItemType } from '../StandardTableTypes';
type MobileTableHeaderProps = {
    /** Ref to keep track of header position */
    headerPositionRef: React.Ref<HTMLDivElement>;
    /** Props needed if the table has checkboxes. Mostly just here for CheckboxTable */
    checkboxProps?: {
        checkAll: boolean;
        loading: boolean;
        handleCheck: ({ checked, name }: {
            checked: boolean;
            name: string;
        }) => void;
    };
    /** Main column to display on left */
    mainColumn: ConfigItemType<unknown, Record<string, unknown>>;
    /** Secondary column to display on right */
    activeColumn: ConfigItemType<unknown, Record<string, unknown>>;
    /** If the table has data */
    hasData: boolean;
    /** SortColumn's 'sorter' prop - function to update the state of the sortBy prop */
    sort: SortColumnProps['sorter'];
    /** This gets passed down to SortColumn's 'active' prop */
    sortBy: SortColumnProps['active'];
    /** Name by which the active mobile column is stored */
    localStorageName: string;
    /** Used for displaying active custom filters if any */
    activeFilters: React.ComponentProps<typeof StandardTable>['activeFilters'];
    /** Active column selected */
    activeSecondaryColumn: string;
};
declare const MobileTableHeader: ({ headerPositionRef, checkboxProps, mainColumn, activeColumn, hasData, sort, sortBy, localStorageName, activeFilters, activeSecondaryColumn, }: MobileTableHeaderProps) => JSX.Element;
export default MobileTableHeader;
