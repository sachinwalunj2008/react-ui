import * as React from 'react';
import { LinkProps } from 'react-router-dom';
import { TooltipProps } from '../Tooltip/Tooltip';
type BaseProps = {
    /** Content inside of the Button */
    children: React.ReactNode;
    /** Optional class for the Button */
    className?: string;
    /** Style of the Button */
    styleType?: 'primary-red' | 'primary-green' | 'primary-blue' | 'secondary' | 'tertiary' | 'text-red' | 'text-blue' | 'small';
    /** Optional prop for disabling button */
    disabled?: boolean;
    tooltip?: Omit<TooltipProps, 'children'>;
};
type ButtonAsButton = BaseProps & Omit<JSX.IntrinsicElements['button'], keyof BaseProps> & {
    /** Type of Button */
    as?: 'button';
};
type ButtonAsUnstyled = Omit<ButtonAsButton, 'as' | 'styleType'> & {
    /** Type of Button */
    as: 'unstyled';
    styleType?: BaseProps['styleType'];
};
type ButtonAsLink = BaseProps & Omit<LinkProps, keyof BaseProps> & {
    /** Type of Button */
    as: 'link';
};
type ButtonAsExternal = BaseProps & Omit<JSX.IntrinsicElements['a'], keyof BaseProps> & {
    /** Type of Button */
    as: 'externalLink';
};
export type ButtonProps = ButtonAsButton | ButtonAsExternal | ButtonAsLink | ButtonAsUnstyled;
export declare function Button({ as, className, styleType, disabled, tooltip, ...rest }: ButtonProps): JSX.Element;
export {};
