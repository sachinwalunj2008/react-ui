import React from 'react';
import { SortColumnProps, StandardTable } from '../../../module';
type StandardTableProps = React.ComponentProps<typeof StandardTable>;
type MobileColumnOptionsProps = {
    config: StandardTableProps['config'];
    localStorageName: string;
    sort: SortColumnProps['sorter'];
    sortBy: SortColumnProps['active'];
    setActiveColumn: (header: SortColumnProps['label']) => void;
    activeSecondaryColumn: SortColumnProps['label'];
};
declare const MobileColumnOptions: ({ config, localStorageName, sort, setActiveColumn, sortBy, activeSecondaryColumn, }: MobileColumnOptionsProps) => JSX.Element;
export default MobileColumnOptions;
