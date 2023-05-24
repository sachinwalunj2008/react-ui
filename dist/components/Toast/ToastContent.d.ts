import React from 'react';
import { ButtonProps } from '../Button/Button';
import { ToastTypes } from './Toast';
export type ToastContentProps = {
    /** The content displayed inside of the component */
    text: React.ReactNode;
    /** Determines the style of the component */
    type: ToastTypes;
    /** Optional array of buttons to be added to the right of the main content. The maximum number of buttons is 2. */
    buttons?: [ButtonProps, ButtonProps?];
};
declare const ToastContent: ({ text, type, buttons, }: ToastContentProps) => JSX.Element;
export default ToastContent;
