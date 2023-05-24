import type { ConfigItemType, StandardTableProps } from './StandardTableTypes';
declare const StandardTable: <DataItem, ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>>(props: StandardTableProps<DataItem, ConfigItem>) => JSX.Element;
export default StandardTable;
export declare const color: {
    red: any;
    gray: any;
};
export declare const backgroundColor: {
    red: any;
    gray: any;
};
