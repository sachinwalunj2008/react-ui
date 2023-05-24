import React from 'react';
import { PopoverWithConfirmation } from '../../module';
import { ButtonProps } from '../Button/Button';
type FormButtonProps = {
    /** Required callout for each button */
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    /** Optionally disable a button */
    disabled?: ButtonProps['disabled'];
    /** Optionally pass in children for a button */
    children?: React.ReactNode;
};
type SaveButtonWithConfirmationProps = Omit<FormButtonProps, 'onClick'> & {
    popoverWithConfirmationProps: Omit<PopoverWithConfirmationProps, 'styleType' | 'menuButtonProps'>;
};
type SaveButtonWithoutConfirmationProps = FormButtonProps & {
    popoverWithConfirmationProps?: never;
};
type SaveButtonProps = SaveButtonWithoutConfirmationProps | SaveButtonWithConfirmationProps;
type PopoverWithConfirmationProps = React.ComponentProps<typeof PopoverWithConfirmation>;
type FormButtonsProps = {
    /** Cancel button props */
    cancelButtonProps: FormButtonProps;
    /** Save button props */
    saveButtonProps: SaveButtonProps;
    /** Reset button props */
    resetButtonProps?: FormButtonProps;
};
declare const FormButtons: ({ cancelButtonProps, saveButtonProps, resetButtonProps, }: FormButtonsProps) => JSX.Element;
export default FormButtons;
