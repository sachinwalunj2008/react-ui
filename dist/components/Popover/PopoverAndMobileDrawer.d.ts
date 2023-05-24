import * as React from 'react';
import { SideDrawer } from '../../module';
import type { TippyProps } from '@tippyjs/react';
type SideDrawerProps = React.ComponentPropsWithoutRef<typeof SideDrawer>;
type PopoverAndMobileDrawerProps = {
    /** Passed directly to the Tippy component */
    tippyProps?: Omit<TippyProps, 'children' | 'content' | 'interactive' | 'trigger'>;
    /** Passed directly to the SideDrawer component */
    sideDrawerProps?: Omit<SideDrawerProps, 'children' | 'isOpen' | 'closeCallout' | 'logoUrl'>;
    /** What shows up in the popup or mobile drawer, depending on screen size */
    content: React.ReactNode;
    /** Class name that will be added to the Button that opens the popover */
    toggleClassName?: string;
    /** What users click on to cause the popup or mobile drawer to appear */
    children: React.ReactNode;
};
/** Meant for interactive popups that use the SideDrawer on mobile. If you don't need something interactive, use Tooltip instead. */
export declare function PopoverAndMobileDrawer({ tippyProps, sideDrawerProps, content, toggleClassName, children, }: PopoverAndMobileDrawerProps): JSX.Element;
type PopoverAndMobileDrawerContextValue = {
    /** If open, will close the popover/drawer. If closed, will open the popover/drawer */
    togglePopoverOrDrawer: () => void;
    /** Explicitly close, even if it's already closed */
    closePopoverOrDrawer: () => void;
    /** Explicitly open, even if it's already open */
    openPopoverOrDrawer: () => void;
    /** Current status of the popover/drawer */
    isOpen: boolean;
};
export declare function usePopoverAndMobileDrawer(): PopoverAndMobileDrawerContextValue;
export {};
