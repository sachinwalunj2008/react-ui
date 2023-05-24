import { TippyProps } from '@tippyjs/react';
import React from 'react';
import { MenuButton } from '../../module';
export type ConfigConfirmationItem = {
    /** The type of confirmation. This will set the color and the icon of the confirmation. */
    type: 'green' | 'red' | 'blue';
    /** The text that will appear in the header. */
    header: string;
    /** The text that will appear in the body. */
    body: string;
    /** The text that will appear for the Confirmation button. By default, it will say `Confirm`. */
    confirmButtonText?: string;
    /** The callout function for the Confirmation button. */
    confirmCallout: () => void;
};
export type OptionItem = {
    /** The name of this confirmation option. This is used to show and hide each confirmation. */
    name: string;
    /** The configuration object of the confirmation popover. */
    confirmation?: ConfigConfirmationItem;
    /** The displayed action items that take in the `Show` callback to implement a confirmation popover. */
    children?: (show: {
        show: (name: string) => void;
    }) => React.ReactNode;
};
type PopoverWithConfirmationPropsBase = Pick<MenuButtonProps, 'styleType'> & {
    /** The config array of action options */
    options: OptionItem[];
    /** Check to see if this is a menuButton or Tippy button. */
    isMenuButton?: boolean;
};
type MenuButtonProps = React.ComponentProps<typeof MenuButton>;
type MenuButtonWithConfirmation = PopoverWithConfirmationPropsBase & {
    /** Object of additional MenuButton props needed. */
    menuButtonProps: Omit<MenuButtonProps, 'actionPopoverElement'>;
    buttonContent?: never;
    tippyProps?: never;
};
type TippyWithConfirmation = PopoverWithConfirmationPropsBase & {
    menuButtonProps?: never;
    /** The text that will appear on the main button. */
    buttonContent: React.ReactNode;
    /** Optional remaining Tippy props object. */
    tippyProps?: Omit<TippyProps, 'visible' | 'children' | 'interactive' | 'content'>;
};
type PopoverWithConfirmationProps = MenuButtonWithConfirmation | TippyWithConfirmation;
declare const PopoverWithConfirmation: ({ menuButtonProps, isMenuButton, buttonContent, styleType, tippyProps, options, }: PopoverWithConfirmationProps) => JSX.Element;
export default PopoverWithConfirmation;
