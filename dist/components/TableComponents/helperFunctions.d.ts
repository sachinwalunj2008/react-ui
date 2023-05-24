/// <reference types="react" />
import { TooltipProps } from '../Tooltip/Tooltip';
import type { groupAccordionType, GroupColorType } from './StandardTableTypes';
type Groups<DataItem> = Array<{
    /** The string value to display in the group Header row */
    groupHeader: string | ((count: number) => string);
    /** Custom JSX to display info icon in the group Header row (groupHeader) */
    tooltipContent?: TooltipProps['tooltipContent'];
    /** Determines the background color of the row (Default: grey) */
    type?: GroupColorType;
    /** Method to determine if a data set belongs to the group */
    check: (dataItem: DataItem, checkedBoxes?: DataItem[]) => boolean;
    /** boolean to add Clear button in the selection */
    includeClearButton?: boolean;
    /** Function to perform the required action after clearing the selections */
    clearCallout?: () => void;
    /** Custom JSX at the last column of the group header to replace clearButton */
    customClearButton?: React.ReactNode;
    /** Adds an expand/collapse functionality to entire groups  */
    groupAccordion?: groupAccordionType;
}>;
export declare const getDataGroups: <DataItem>(data: DataItem[], groups: Groups<DataItem>, checkBoxes: {
    hasCheckboxes?: boolean | undefined;
    checkedBoxes?: DataItem[] | undefined;
}, totalRowKey?: keyof DataItem | undefined) => DataItem[];
export {};
