import type { ConfigItemType, NestedRowPropsType } from './StandardTableTypes';
type NestedRowProps<DataItem, ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>> = NestedRowPropsType<DataItem, ConfigItem>;
declare const NestedRow: <DataItem, ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>>({ data, nestedDataKey, nestedRowProps, config, sortBy, customColumnProps, stickyTableConfig, selectedNestedRowData, totalRowKey, showStickyClasses, }: NestedRowProps<DataItem, ConfigItem>) => JSX.Element;
export default NestedRow;
