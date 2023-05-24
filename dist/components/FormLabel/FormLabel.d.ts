import React from 'react';
import { TooltipProps } from '../Tooltip/Tooltip';
type FormLabelProps = {
    label: React.ReactNode;
    rightLabel?: React.ReactNode;
    tooltip?: Omit<TooltipProps, 'children'>;
    required?: boolean;
    active?: boolean;
    error?: boolean;
    id?: string;
};
declare const FormLabel: ({ label, rightLabel, tooltip, required, active, error, id, }: FormLabelProps) => JSX.Element;
export default FormLabel;
