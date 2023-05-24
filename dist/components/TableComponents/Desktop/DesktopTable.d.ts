import type { ConfigItemType, StandardTableProps } from '../StandardTableTypes';
type DesktopTableProps<DataItem, ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>> = Omit<StandardTableProps<DataItem, ConfigItem>, 'tableId' | 'noDataFields'> & {
    localStorageName: string;
    totalRowKey: string;
    isGroupHeader?: boolean;
};
declare const DesktopTable: <DataItem extends {
    groupDataKey?: string | undefined;
}, ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>>({ data, config, dataKey, nestedDataKey, groups, showGroups, hasData, hasMore, successStatus, loading, nestedRowProps, customColumnProps, headerChildren, stickyTableConfig, customHeight, customWidth, widthOffset, removeFilters, activeFilters, sort, sortBy, getData, localStorageName, totalRowKey, shortListLoading, hasCheckboxes, handleCheckedBoxes, isResetCheckboxes, equalColumnWidth, }: DesktopTableProps<DataItem, ConfigItem>) => JSX.Element;
export default DesktopTable;
