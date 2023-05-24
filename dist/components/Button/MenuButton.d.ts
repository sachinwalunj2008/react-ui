import React from 'react';
import { TippyProps } from '@tippyjs/react';
import type { LinkProps } from 'react-router-dom';
import { TippyHideParams } from '../../hooks';
import { TooltipProps } from '../Tooltip/Tooltip';
type MenuButtonBaseProps = {
    /** Display element in popover for action portion of button; receives a `close` prop */
    actionPopoverElement: (close: {
        close: () => void;
    }) => React.ReactNode;
    /** Overall color of the button (default: secondary) */
    styleType?: 'primary-green' | 'primary-blue' | 'primary-red' | 'secondary' | 'text-red' | 'text-blue';
    /** Optional className for the action button popover */
    actionButtonClassName?: string;
    /** Text to display on main button */
    mainButtonText: string;
    /** Position of the tippy popover */
    tippyPlacement?: TippyProps['placement'];
    /** Selector for the element this button is scrollable on */
    scrollSelector?: TippyHideParams['scrollSelector'];
    /** This is the distance (in px) needed to hide the Tippy popover when scrolling */
    scrollDistance?: TippyHideParams['scrollDistance'];
    /** Function that is called on blur of MenuButton */
    onClickOutside?: () => void;
    /** Optional className for the action tippy container popover */
    mainButtonPopoverClassName?: string;
    /** Optional prop for disabling main tippy button */
    disabledMainButton?: boolean;
    /** Optional prop for disabling secondary action tippy button */
    disabledActionButton?: boolean;
    mainButtonTooltip?: Omit<TooltipProps, 'children'>;
};
type MenuButtonMainButtonTippy = MenuButtonBaseProps & {
    /** Display element in popover for main portion of button; receives a `close` prop */
    children: (close: {
        close: () => void;
    }) => React.ReactNode;
    mainButtonAction?: never;
    mainButtonType: 'popover';
    mainButtonLink?: never;
    mainButtonExternalLink?: never;
};
type MenuButtonMainButtonAction = MenuButtonBaseProps & {
    children?: never;
    /** Callback function to execute if main button is clicked (only use if no popover element is provided) */
    mainButtonAction: () => void;
    /** Type of button to expect for the main button */
    mainButtonType?: 'button';
    mainButtonLink?: never;
    mainButtonExternalLink?: never;
};
type MenuButtonMainButtonLink = MenuButtonBaseProps & {
    children?: never;
    mainButtonAction?: never;
    /** Type of button to expect for the main button */
    mainButtonType: 'link';
    /** Internal link for the main button */
    mainButtonLink: LinkProps['to'];
    mainButtonExternalLink?: never;
};
type MenuButtonMainButtonExternalLink = MenuButtonBaseProps & {
    children?: never;
    mainButtonAction?: never;
    /** Type of button to expect for the main button */
    mainButtonType: 'externalLink';
    mainButtonLink?: never;
    /** External link for the main button */
    mainButtonExternalLink: JSX.IntrinsicElements['a']['href'];
};
type MenuButtonProps = MenuButtonMainButtonTippy | MenuButtonMainButtonAction | MenuButtonMainButtonLink | MenuButtonMainButtonExternalLink;
declare const MenuButton: ({ actionPopoverElement, styleType, mainButtonText, tippyPlacement, children, mainButtonAction, mainButtonType, mainButtonLink, mainButtonExternalLink, actionButtonClassName, scrollSelector, scrollDistance, disabledMainButton, disabledActionButton, onClickOutside, mainButtonPopoverClassName, mainButtonTooltip, }: MenuButtonProps) => JSX.Element;
export default MenuButton;
