import { TippyProps } from '@tippyjs/react';
import React from 'react';
import SingleCsv from '../CsvExport/SingleCsv';
import { IconStringList } from '../Icons/Icon';
import { TooltipProps } from '../Tooltip/Tooltip';
import { ConfigConfirmationItem } from '../ConfirmationPopover/PopoverWithConfirmation';
type ActionWithCSV = ActionBase & {
    /** Optional CSV action */
    csv: SingleCsvProps['csv'];
    displayText?: never;
    handleClick?: never;
};
type ActionWithoutCSV = ActionBase & {
    csv?: never;
    /** Text that will display as the button's text */
    displayText: string;
    /** Click handler */
    handleClick: () => void;
};
/** Each Action will correspond to a button on the popover */
type ActionBase = {
    /** Toggle for disabling the button */
    disabled?: boolean;
    /** Icon string */
    icon: IconStringList;
    tooltip?: Omit<TooltipProps, 'children'>;
    /** Optional props for showing confirmation popover in secondary option */
    confirmation?: ConfigConfirmationItem;
};
type Action = ActionWithCSV | ActionWithoutCSV;
type SingleCsvProps = React.ComponentProps<typeof SingleCsv>;
type PrimaryActionButtonProps = {
    /** The text that will render for the `MenuButton`'s `mainButtonText` prop or for the `Button`'s children. */
    buttonText: string;
    /** Array of actions to display in the popover. Each action corresponds to a button. If this prop is not defined, then a `Button` will be displayed instead of the `MenuButton`. */
    actions?: Action[];
    /** Callout for the main action button */
    mainActionCallout: () => void;
    /** Toggle to disable main button. */
    disableMainButton?: boolean;
    /** Toggle to disable secondary action button */
    disableSecondaryButton?: boolean;
    /** Allow main button to be Tippy popover*/
    mainButtonType?: 'popover' | 'link' | 'button' | 'externalLink';
    /** Display element in popover for main portion of button */
    children?: (close: {
        close: () => void;
    }) => React.ReactNode;
    /** Position of the tippy popover */
    tippyPlacement?: TippyProps['placement'];
    /** Function that is called on blur of MenuButton */
    onClickOutside?: () => void;
    /** Optional className for the action tippy container popover */
    mainButtonPopoverClassName?: string;
    /** Optional props for showing tooltip when main Menu button disabled */
    mainButtonTooltip?: {
        tooltipContent: React.ReactNode;
        position?: TippyProps['placement'];
    };
    /** Optional props for showing confirmation */
    mainConfirmation?: {
        confirmation: ConfigConfirmationItem;
    };
};
declare const PrimaryActionButton: ({ buttonText, actions, disableMainButton, mainActionCallout, disableSecondaryButton, mainButtonType, children, tippyPlacement, onClickOutside, mainButtonPopoverClassName, mainButtonTooltip, mainConfirmation, }: PrimaryActionButtonProps) => JSX.Element;
export default PrimaryActionButton;
