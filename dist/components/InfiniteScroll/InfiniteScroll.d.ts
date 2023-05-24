import React from 'react';
/**
 * @deprecated Please use tables to handle infinite loading
 **/
declare const InfiniteScroll: ({ callout, loadingLazy, children, longList, noLoader, listLength, count, noBackToTop, goToTop, feedOffset, useTable, loadingContainerHeight, onLastPage, }: InfiniteScrollProps) => JSX.Element;
export default InfiniteScroll;
type InfiniteScrollProps = {
    callout: () => void;
    loadingLazy?: boolean;
    children?: React.ReactNode;
    longList?: boolean;
    noLoader?: boolean;
    listLength?: number;
    count?: string | number;
    noBackToTop?: boolean;
    goToTop?: string;
    feedOffset?: string;
    onLastPage?: boolean;
    useTable?: boolean;
    loadingContainerHeight?: string;
};
