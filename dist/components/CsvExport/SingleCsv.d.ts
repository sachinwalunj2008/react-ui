import { IconStringList } from '../../module';
type CsvFormat<CsvParams> = {
    /** Api to get the CSV data */
    api: (apiArg?: string | number | undefined | unknown, csvParams?: unknown) => Promise<Blob>;
    /** Optional api arguments */
    apiArg?: string | number | unknown;
    /** Api parameters to be passed in for response filtering */
    params: CsvParams;
    /** Optional async downloading. This is useful if the CSV download takes a long time to generate. */
    asyncDownload?: boolean;
    /** Optional callout after clicking on the csv link */
    callout?: () => void;
};
type CSV<CsvItem extends Record<string, unknown>, CsvParams, HeaderItem> = CsvFormatType<CsvParams> | CsvDataType<CsvItem, HeaderItem>;
type CsvBase = {
    /** CSV name to be displayed on the downloaded spreadsheet */
    csvName: string;
    /** Link name to be displayed in the UI */
    linkName: string;
    /** Optional file type for CSV */
    ['xls_file']?: 'xls' | 'csv';
    /** Optional boolean to let us know if there was an error in the consuming component */
    error?: boolean;
    /** If there was an error, then we would want to alert the consuming component with this callback */
    errorCallback?: () => void;
    /** Optional className */
    customClass?: string;
    /** Optional button className */
    btnCustomClass?: string;
    /** @deprecated - Optional prop to show a button instead of a link - this should not be used. */
    variant?: 'button';
    /** Optional icon to use instead of the default `download` icon. */
    icon?: IconStringList;
};
type CsvDataType<CsvItem extends Record<string, unknown>, HeaderItem> = CsvBase & {
    /** Formatted CSV data. This data is generated on the consuming component and passed in. */
    csvData: CsvItem[];
    csvFormat?: never;
    /** Optional callout after clicking the csv link */
    callout?: (link?: HTMLDivElement | string) => void;
    /** Optional headers to be passed into the CSV */
    headers?: HeaderItem[];
    /** Optional className for the csv link */
    hiddenClass?: string;
};
type CsvFormatType<CsvParams> = CsvBase & {
    csvData?: never;
    /** This will generate a CSV by utilizing an api. Not generated on the front end. */
    csvFormat: CsvFormat<CsvParams>;
};
type SingleCsvProps<CsvItem extends Record<string, unknown>, CsvParams, HeaderItem> = {
    /** Determines how the CSV will be generated. */
    csv: CSV<CsvItem, CsvParams, HeaderItem>;
    /** Optional close function */
    close?: () => void;
    /** Optional prop to show just the download icon when a single option exists. */
    onlyOption?: boolean;
    /** Optionally hide this component until some condition is met. */
    hidden?: boolean;
    /** Optional identifier */
    csvId?: string;
    /** Optionally hide the download icon */
    hideIcon?: boolean;
};
declare const SingleCsv: <CsvItem extends Record<string, unknown>, CsvParams, HeaderItem>({ csv, close, onlyOption, hidden, csvId, hideIcon, }: SingleCsvProps<CsvItem, CsvParams, HeaderItem>) => JSX.Element;
export default SingleCsv;
