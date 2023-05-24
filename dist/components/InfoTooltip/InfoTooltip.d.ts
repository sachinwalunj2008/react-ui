import React from 'react';
import type { TooltipProps } from '../Tooltip/Tooltip';
export type InfoTooltipProps = {
    /** The title displayed inside the tooltip */
    title: string | React.ReactNode;
    /** The text or element displayed inside the tooltip */
    text: string[] | React.ReactNode;
    /** Optional image to display inside the tooltip */
    image?: string;
    /** Optional className for the tooltip */
    customClass?: string;
    /** Optionally replace the content inside the tooltip - probably should not use this. Will likely deprecate this. */
    customNode?: React.ReactNode;
    /** Determines the position of the tooltip */
    position?: TooltipProps['position'];
    /** Optional className inside the tooltip */
    tooltipCustomClass?: TooltipProps['customClass'];
    /** Optionally add other Tippy props */
    extraProps?: TooltipProps['extraProps'];
    /** Optionally change the size of the tooltip */
    size?: 'standard' | 'xs' | 'sm';
    /** Option to add a maximum width for the tooltip */
    maxWidth?: TooltipProps['maxWidth'];
    /** Optionally use SideDrawer when in a mobile view */
    useSideDrawerForMobile?: TooltipProps['useSideDrawerForMobile'];
};
declare const InfoTooltip: ({ image, title, text, position, customClass, customNode, tooltipCustomClass, extraProps, size, maxWidth, useSideDrawerForMobile, }: InfoTooltipProps) => JSX.Element;
export default InfoTooltip;
