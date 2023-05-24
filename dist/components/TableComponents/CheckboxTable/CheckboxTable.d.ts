import { ConfigItemType } from '../StandardTableTypes';
import { CheckboxTableProps } from './CheckboxTableTypes';
declare const CheckboxTable: <DataItem, ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>>({ data, selectedBoxes, setSelectedBoxes, unselectedBoxes, setUnselectedBoxes, checkAll, setCheckAll, config, dataKey, hasData, hasMore, successStatus, loading, customColumnProps, stickyTableConfig, customHeight, customWidth, widthOffset, activeFilters, removeFilters, sort, sortBy, getData, tableId, emptyStateProps, bulkActions, stringColumns, refreshData, }: CheckboxTableProps<DataItem, ConfigItem>) => JSX.Element;
export default CheckboxTable;
