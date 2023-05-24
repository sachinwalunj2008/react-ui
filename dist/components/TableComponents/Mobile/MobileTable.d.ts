import React from 'react';
import { StandardTable } from '../../../module';
import { ConfigItemType, StandardTableProps } from '../StandardTableTypes';
type TableProps = React.ComponentProps<typeof StandardTable>;
type MobileTableProps<DataItem, ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>> = Pick<StandardTableProps<DataItem, ConfigItem>, 'sort' | 'sortBy' | 'data' | 'activeFilters' | 'hasMore' | 'successStatus' | 'getData' | 'loading' | 'hasData' | 'groups' | 'showGroups'> & {
    localStorageName: string;
    config: TableProps['config'];
    dataKey: TableProps['dataKey'];
    totalRowKey: TableProps['totalRowKey'];
    mainColumnClassName?: string;
    hasCheckboxes?: boolean;
};
declare const MobileTable: <DataItem extends {
    groupDataKey?: string | undefined;
}, ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>>({ config, sort, sortBy, localStorageName, activeFilters, data, dataKey, groups, showGroups, hasMore, successStatus, getData, loading, hasData, totalRowKey, hasCheckboxes, mainColumnClassName, }: MobileTableProps<DataItem, ConfigItem>) => JSX.Element;
export default MobileTable;
