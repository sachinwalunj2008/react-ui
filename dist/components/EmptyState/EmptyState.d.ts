import React from 'react';
import { Button } from '../Button/Button';
import { IconStringList } from '../Icons/Icon';
type ButtonProps = React.ComponentProps<typeof Button>;
export type EmptyStateProps = {
    /** Text to display in bold. */
    primaryText: string;
    /** Optional secondary text beneath `primaryText`. */
    secondaryText?: string;
    /** Optional icon to display at the top. */
    icon?: IconStringList;
    /** Optional button to display at bottom. */
    buttonProps?: ButtonProps;
    /** Controls whether to show or hide the light gray background. Shows by default. */
    background?: boolean;
};
declare const EmptyState: ({ primaryText, secondaryText, icon, buttonProps, background, }: EmptyStateProps) => JSX.Element;
export default EmptyState;
