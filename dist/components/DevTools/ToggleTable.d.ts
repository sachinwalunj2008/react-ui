import React from 'react';
type DataItem = {
    key: string;
    enabled: boolean;
};
type ToggleTableProps = {
    data: Array<DataItem>;
    rerenderCallout: CalloutType;
};
type CalloutType = React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
declare const ToggleTable: ({ data, rerenderCallout, }: ToggleTableProps) => JSX.Element;
export default ToggleTable;
