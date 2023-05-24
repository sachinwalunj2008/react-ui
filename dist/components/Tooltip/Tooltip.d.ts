import React from 'react';
import { TippyProps } from '@tippyjs/react';
import { TippyHideParams } from '../../hooks';
export type TooltipProps = {
    /** The element that you need to hover to show the tooltip. */
    children: React.ReactNode;
    /** The content inside of the tooltip. */
    tooltipContent: React.ReactNode;
    /** The position of the tooltip. */
    position?: TippyProps['placement'];
    /** Optional className for the tooltip. */
    customClass?: string;
    /** Optional Tippy props to be passed into the tooltip. */
    extraProps?: Omit<TippyProps, 'placement'>;
    /** Optional prop to restrict the max width of the tooltip. */
    maxWidth?: string;
    /** Optional prop to show the `SideDrawer` when in a mobile view. */
    useSideDrawerForMobile?: boolean;
    /** An optional selector to be passed in - this is needed if you need to dynamically close the tooltip when scrolling by using `useTippyHide`. */
    scrollSelector?: TippyHideParams['scrollSelector'];
    /** An optional number to be passed in - this is needed if you need to dynamically close the tooltip when scrolling by using `useTippyHide`. */
    scrollDistance?: TippyHideParams['scrollDistance'];
};
declare const Tooltip: ({ children, tooltipContent, position, customClass, extraProps, maxWidth, useSideDrawerForMobile, scrollSelector, scrollDistance, }: TooltipProps) => JSX.Element;
export default Tooltip;
