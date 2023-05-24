import React from 'react';
import { Tooltip } from '../../module';
type CalloutType = (stateName: StateNameType, value: string | number) => void;
type StateNameType = string | number | undefined;
type TooltipProps = React.ComponentProps<typeof Tooltip>;
type TextInputBase = {
    /** The value to display in the input */
    value: string | number;
    /** Optional callback when focus on input is lost */
    onBlurCallout?: (stateName: StateNameType, value: React.SyntheticEvent<HTMLTextAreaElement> | string) => void;
    /** Optional number prop used to delay the execution used in a setTimeout's second param as milliseconds */
    debounce?: number;
    /** Name of the state for the input */
    stateName?: string | number;
    /** Optional callback function to specify when user releases a key on the keyboard */
    keyUp?: (stateName: StateNameType, value: unknown) => void;
    /** Optional label above the input */
    labelText?: React.ReactNode;
    /** Optional label to the top right of the input */
    rightLabel?: React.ReactNode;
    /** Optional placeholder to display inside input */
    placeholder?: string;
    /** Optional identifier for the input */
    id?: string;
    /** Optional className for the input */
    classType?: string;
    /** This gives the input the required attribute and will also display a red asterisk next to the label */
    required?: boolean;
    /** Optional boolean to display the "Clear" text in the input */
    clear?: boolean;
    /** Optional callback when the Clear button is clicked */
    clearCallout?: () => void;
    /** Optional boolean to inidicate if the input should be initialized to the focused state */
    autoFocus?: boolean;
    /** Optional show the browser's autocomplete popover */
    autoComplete?: 'on' | 'off';
    /** Optional label that appears inside the input and aligned to the right */
    endText?: string;
    /** Boolean to know if an error has occured */
    hasError?: boolean;
    /** Optional boolean to specify that an input field is read-only */
    readOnly?: boolean;
    /** Optional boolean used to display full width of the input */
    fullWidth?: boolean;
    /** Optional boolean to specify the maximum number of characters allowed in the input */
    maxLength?: number;
    /** Optional function to specify when the input receives focus */
    setIsOnFocus?: (isOnFocus: boolean) => void;
    /** Optional boolean to not allow the input to remain an empty field */
    noEmpty?: boolean;
    /** The right aligned label in the input e.g. '%', 'in', 'lbs' etc */
    inputLabel?: string;
    /** Optional class to add to the parent div of the input */
    containerClassName?: string;
    /** Optional prop used to display a tooltip for the label  */
    labelTooltip?: Omit<TooltipProps, 'children'>;
    /** Optional prop used to display an error message below the input  */
    errorText?: string;
};
type TextInputNotNumber = TextInputBase & {
    /** Optional prop to indicate the type of the input */
    type?: 'email' | 'password' | 'tel' | 'text' | 'textarea';
    min?: never;
    max?: never;
    step?: never;
    onlyWholeNumbers?: never;
    onlyPositiveNumbers?: never;
    noScrollForNumbers?: never;
    noArrowKeyNumberChange?: never;
    maxDecimalPlaces?: never;
    numberFormat?: never;
};
type TextInputNumber = TextInputBase & {
    /** Required prop to indicate the input is of type `number` */
    type: 'number';
    /** Optional boolean to specify the minimum value for the input */
    min?: number;
    /** Optional boolean to specify the maximum value for the input */
    max?: number;
    /** Optional value to specify the interval between legal numbers in the input */
    step?: number;
    /** Optional prop used to round a number to the nearest integer */
    onlyWholeNumbers?: boolean;
    /** Optional prop used to only accept positive numbers as a value */
    onlyPositiveNumbers?: boolean;
    /** Disable incrementing / decrementing number value with scroll wheel */
    noScrollForNumbers?: boolean;
    /** Disable incrementing / decrementing number value with keyboard arrows (default: false) */
    noArrowKeyNumberChange?: boolean;
    /** Used if we want to restrict a certain number of decimal places. */
    maxDecimalPlaces?: number;
    /** Optional prop used to display currency or percentage input */
    numberFormat?: {
        /** To indicate the type of numberFormat */
        type: 'currency' | 'percentage';
        /** Currency symbol to display in a gray background (e.g: $) */
        currencySymbol?: string;
    };
};
type TextInputTypes = TextInputNotNumber | TextInputNumber;
type DisabledOrNot = {
    disabled: true;
    callout?: CalloutType;
} | {
    disabled?: false;
    callout: CalloutType;
};
export type TextInputProps = TextInputTypes & DisabledOrNot;
declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>>;
export default TextInput;
