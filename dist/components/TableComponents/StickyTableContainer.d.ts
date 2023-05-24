import React from 'react';
type StickyTableContainerProps = {
    children: React.ReactNode;
    hasData: boolean;
    loading: boolean;
    customWidth?: number | string;
    customHeight?: number | string;
    /** If the table is next to another element, the computed width of the table will be incorrect. Use this to input the width of the element (including padding, margin, and other spacing) to have the correct width for the table. */
    widthOffset?: number;
};
export declare const StickyTableContainer: ({ children, hasData, loading, customWidth, customHeight, widthOffset, }: StickyTableContainerProps) => JSX.Element;
export default StickyTableContainer;
