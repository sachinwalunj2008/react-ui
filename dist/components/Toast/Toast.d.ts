import React from 'react';
import type { ToastOptions } from 'react-toastify';
import { toast as toastify } from 'react-toastify';
import { ToastContentProps } from './ToastContent';
export type ToastTypes = 'success' | 'error' | 'warning' | 'info';
export type ToastProps = {
    /** Type of toast notification.
     * 'success' | 'error' | 'warning' | 'info'
     */
    type: ToastTypes;
    /** Content to show as message. */
    message: React.ReactNode;
    /** Configuration custom toast options. */
    config?: ToastOptions;
    /** Optional array of buttons to be added to the right of the message. The maximum number of buttons is 2. */
    buttons?: ToastContentProps['buttons'];
};
export declare const toast: ({ type, message, buttons, config, }: ToastProps) => ReturnType<(typeof toastify)[ToastTypes]>;
export declare const dismissToast: (toastId?: string | number) => ReturnType<(typeof toastify)['dismiss']>;
