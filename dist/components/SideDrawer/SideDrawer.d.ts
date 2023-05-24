import React from 'react';
import { StepperProps } from '../Stepper/Stepper';
type SideDrawerWithText = SideDrawerBase & {
    /** The text to be rendered within the header. */
    headerContent: string;
    logoUrl?: never;
};
type SideDrawerWithLogo = SideDrawerBase & {
    headerContent?: never;
    /** Optional logo to be passed in place of `headerContent` */
    logoUrl: string;
};
type SideDrawerBase = {
    /** The content to be rendered within the component. */
    children: React.ReactNode | (({ height }: {
        height: number;
    }) => JSX.Element);
    /** The open state of SideDrawer. */
    isOpen: boolean;
    /** Callout function to close the SideDrawer. */
    closeCallout: React.MouseEventHandler<HTMLButtonElement> & (() => void);
    /** Optional className for the SideDrawer container */
    containerClassName?: string;
    /** Optional className for the content */
    contentClassName?: string;
    /** The content to be rendered within the footer. */
    footerContent?: React.ReactNode;
    /** Optionally render SideDrawer in a mobile view only. */
    onlyMobile?: boolean;
    /** Size of the drawer */
    size?: 'sm' | 'lg';
    /** Optionally add the `Stepper` component. */
    stepperProps?: StepperProps;
    /** Optionally remove the gradient from the `SideDrawer`. This is useful when the background of the content is something other than white. */
    noGradient?: boolean;
};
type SideDrawerProps = SideDrawerWithText | SideDrawerWithLogo;
export declare function SideDrawer({ children, closeCallout, containerClassName, contentClassName, footerContent, headerContent, logoUrl, isOpen, onlyMobile, size, stepperProps, noGradient, }: SideDrawerProps): React.ReactPortal | null;
export {};
