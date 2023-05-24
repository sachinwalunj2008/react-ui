import React from 'react';
import { SortColumnProps } from '../../SortColumn/SortColumnProps';
import StandardTable from '../StandardTable';
type MobileColumnPickerProps = {
    /** Table configuration that will handle column headers and rendering column children. */
    config: React.ComponentProps<typeof StandardTable>['config'];
    /** Name by which the active mobile column is stored */
    localStorageName: string;
    /** SortColumn's 'sorter' prop - function to update the state of the sortBy prop */
    sort: SortColumnProps['sorter'];
    /** This gets passed down to SortColumn's 'active' prop */
    sortBy: SortColumnProps['active'];
    /** Function used to update the selected column */
    updateActiveColumn: (header: string) => void;
    /** Active column selected */
    activeSecondaryColumn: string;
    /** Ref to keep track of scoll position */
    scrollPositionRef: React.Ref<HTMLDivElement>;
    /** Optional class to apply to main column */
    mainColumnClassName?: string;
};
declare const MobileColumnPicker: ({ config, localStorageName, sort, sortBy, updateActiveColumn, activeSecondaryColumn, scrollPositionRef, mainColumnClassName, }: MobileColumnPickerProps) => JSX.Element;
export default MobileColumnPicker;
