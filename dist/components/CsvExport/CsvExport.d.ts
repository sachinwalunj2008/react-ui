import React from 'react';
import SingleCsv from './SingleCsv';
type SingleCsvProps = React.ComponentProps<typeof SingleCsv>;
type CsvExportProps = {
    /** The download options that are defined in the SingleCsvProps. Includes `csvName`, `linkName`, `csvData` (if we create the CSV on our end), `csvFormat` (if the backend creates the CSV), and other options. */
    csvDownloadOptions: SingleCsvProps['csv'][];
    /** Determines if this component is shown immediately. A reason why this would be `false` is if we have to wait for an api to finish so that the data will be available for the CSV. This only happens when the frontend generates the CSV and should never be false when the backend generates the CSV. */
    initialDisplay: boolean;
    /** Determines when to show the download icon. */
    show: boolean;
    /** Boolean value that opens popover even when there is only one download option */
    alwaysShowDropdown?: boolean;
    /** Optional custom id for the HTML id attribute that corresponds to the component */
    csvId?: string;
    /** Position of the popover */
    position?: 'right' | 'left' | 'middle';
};
declare const CsvExport: ({ csvDownloadOptions, initialDisplay, show, alwaysShowDropdown, csvId, position, }: CsvExportProps) => JSX.Element;
export default CsvExport;
