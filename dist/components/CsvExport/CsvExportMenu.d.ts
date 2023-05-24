import React from 'react';
import SingleCsv from './SingleCsv';
type SingleCsvProps = React.ComponentProps<typeof SingleCsv>;
type CsvExportMenuProps = {
    options: SingleCsvProps['csv'][];
    close: () => void;
    customClass?: string;
    csvId?: string;
};
declare const CsvExportMenu: ({ options, close, customClass, csvId, }: CsvExportMenuProps) => JSX.Element;
export default CsvExportMenu;
