import { ConfigConfirmationItem } from '../ConfirmationPopover/PopoverWithConfirmation';
import { ToastContentProps } from '../Toast/ToastContent';
export type AlertTypes = 'success' | 'error' | 'warning' | 'info';
type BaseAlertProps = ToastContentProps & {
    /** Optional class can be added */
    customClass?: string;
};
type AlertPropsWithoutCloseButton = BaseAlertProps & {
    close?: never;
};
type AlertPropsWithCloseButton = BaseAlertProps & {
    close: {
        /** Close `Alert` function. */
        callout: () => void;
        /** Hide or show the close button. */
        show: boolean;
        /** Optionally change the behavior for the close button. If set to `confirmation`, then a confirmation will appear when the close button is clicked. */
        confirmation?: ConfigConfirmationItem;
    };
};
type AlertProps = AlertPropsWithoutCloseButton | AlertPropsWithCloseButton;
declare const Alert: ({ customClass, close, ...rest }: AlertProps) => JSX.Element;
export default Alert;
