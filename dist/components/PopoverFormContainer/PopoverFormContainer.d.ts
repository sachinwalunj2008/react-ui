import React from 'react';
type PopoverFormContainerProps = {
    /** Text for the header */
    header: string;
    /** Children inserted into the body of this popover container. */
    children: React.ReactNode;
    /** Any necessary children elements would go here. */
    footerChildren?: React.ReactNode;
    /** Optional width to pass if you need to define a specific width. */
    width?: string;
    /** Optional `noPadding` prop is used to remove the padding of the body content. */
    noPadding?: boolean;
    /** We need to know if this is used with `SideDrawer` because we need to remove the header in mobile if it is used. */
    usedWithMobileDrawer?: boolean;
    /** Optional className applied to the footer. */
    footerCustomClass?: string;
    testId?: string;
};
declare const PopoverFormContainer: ({ width, header, children, footerChildren, noPadding, usedWithMobileDrawer, footerCustomClass, testId, }: PopoverFormContainerProps) => JSX.Element;
export default PopoverFormContainer;
