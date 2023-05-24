import React from 'react';
import { StandardTable } from '../../../module';
import { ConfigItemType } from '../StandardTableTypes';
type TableProps = React.ComponentProps<typeof StandardTable>;
type MobileTableRowPropsBase<DataItem, StyleGeneric> = {
    activeColumn: ConfigItemType<DataItem, StyleGeneric>;
    mainColumn: ConfigItemType<DataItem, StyleGeneric>;
    columns: TableProps['config'];
    sortBy: TableProps['sortBy'];
    data: DataItem;
    rowIndex: number;
    totalRowKey?: TableProps['totalRowKey'];
    scrollPositionRef: React.RefObject<HTMLDivElement>;
    headerPositionRef: React.RefObject<HTMLDivElement>;
};
type MobileTableRowPropsHasCheckboxes<DataItem, StyleGeneric> = MobileTableRowPropsBase<DataItem, StyleGeneric> & HasCheckboxes<DataItem>;
type MobileTableRowPropsNoCheckboxes<DataItem, StyleGeneric> = MobileTableRowPropsBase<DataItem, StyleGeneric> & NoCheckboxes;
type MobileTableRowProps<DataItem, StyleGeneric> = MobileTableRowPropsHasCheckboxes<DataItem, StyleGeneric> | MobileTableRowPropsNoCheckboxes<DataItem, StyleGeneric>;
type HasCheckboxes<DataItem> = {
    hasCheckboxes: true;
    checkboxCallout: ({ checked, dataObj, name, index, }: {
        checked: boolean;
        dataObj?: DataItem | undefined;
        name?: string | undefined;
        index?: number | undefined;
    }) => void;
    loading: boolean;
    checked: boolean;
};
type NoCheckboxes = {
    hasCheckboxes?: never;
    checkboxCallout?: never;
    loading?: never;
    checked?: never;
};
declare const MobileTableRow: <DataItem, StyleGeneric>({ activeColumn, mainColumn, columns, data, sortBy, rowIndex, totalRowKey, scrollPositionRef, headerPositionRef, hasCheckboxes, checkboxCallout, loading, checked, }: MobileTableRowProps<DataItem, StyleGeneric>) => JSX.Element;
export default MobileTableRow;
