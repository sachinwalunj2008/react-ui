import React from 'react';
import { IconStringList } from '../../module';
import type { ControllerStateAndHelpers } from 'downshift';
import { TooltipProps } from '../Tooltip/Tooltip';
type ObjWithId = {
    [key in string | number]: unknown;
} & {
    id: string | number;
};
/**
 * @deprecated ...
 **/
declare const PopoverToggle: <ItemGeneric extends ObjWithId>({ downshift, callout, optionKeyName, customClass, labelText, rightLabel, leftIcon, clickText, position, isError, hideCarat, disabled, defaultText, required, clickTextCustomClass, actionType, clickRender, labelTooltip, }: PopoverToggleProps<ItemGeneric>) => JSX.Element;
export default PopoverToggle;
interface PopoverToggleProps<ItemGeneric> {
    downshift: ControllerStateAndHelpers<ItemGeneric>;
    callout: (event: React.SyntheticEvent<HTMLDivElement>) => void;
    optionKeyName: string | number;
    customClass?: string;
    labelText?: string;
    rightLabel?: React.ReactNode;
    leftIcon?: IconStringList;
    clickText?: React.ReactNode;
    position?: 'left' | 'right' | 'middle';
    isError?: boolean;
    hideCarat?: boolean;
    disabled?: boolean;
    defaultText?: string;
    actionType?: 'click' | 'hover';
    clickTextCustomClass?: string;
    clickRender?: ({ clickText, dsSelectedItem, }: {
        clickText?: React.ReactNode;
        dsSelectedItem: ItemGeneric | null;
    }) => JSX.Element;
    required?: boolean;
    labelTooltip?: Omit<TooltipProps, 'children'>;
}
