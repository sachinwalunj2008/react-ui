/// <reference types="react" />
import { SortColumnProps } from '../../../module';
import { ConfigItemType } from '../StandardTableTypes';
import { StickyTableConfigType } from './CheckboxTableTypes';
export declare const headerStyle: (isStickyLeftColumn: boolean, isMobileView: boolean, heightOfHeaderRow?: number) => React.CSSProperties;
export declare const stickyTableHeaderCount: (stickyTableConfig?: StickyTableConfigType) => number;
export declare const getStickyRightCount: (stickyTableConfig?: StickyTableConfigType, customColumnProps?: boolean) => number;
export declare const customColumnStickyStyles: string;
export declare const getStickyLeftCount: (stickyTableConfig?: StickyTableConfigType) => number;
export declare function useMobileCheckboxes(config: ConfigItemType<unknown, Record<string, unknown>>[], sort: SortColumnProps['sorter'], sortBy: SortColumnProps['active']): {
    mainColumn: ConfigItemType<unknown, Record<string, unknown>>;
    activeColumn: ConfigItemType<unknown, Record<string, unknown>>;
    scrollPositionRef: React.RefObject<HTMLDivElement>;
    headerPositionRef: React.RefObject<HTMLDivElement>;
    sortColumnsCount: number;
    heightOfHeaderRow: number;
    isMobileView: boolean;
    updateActiveColumn: (header: string) => void;
    activeSecondaryColumn: string;
};
