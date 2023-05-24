import { ConfigConfirmationItem } from './PopoverWithConfirmation';
type ConfirmationPopoverContentProps = Pick<ConfigConfirmationItem, 'type' | 'confirmCallout' | 'header' | 'body' | 'confirmButtonText'> & {
    /** The callout function for the Cancel button. */
    cancelCallout: () => void;
};
declare const ConfirmationPopoverContent: ({ type, header, body, cancelCallout, confirmCallout, confirmButtonText, }: ConfirmationPopoverContentProps) => JSX.Element;
export default ConfirmationPopoverContent;
