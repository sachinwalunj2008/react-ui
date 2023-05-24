import React from 'react';
import type { Actions, ControllerStateAndHelpers } from 'downshift';
/**
 * @deprecated This component should be deprecated with `Popover` and we should use `PopoverAndMobileDrawer`
 **/
declare const PopoverMenu: <ItemGeneric>(props: PopoverMenuProps<ItemGeneric>) => JSX.Element;
export default PopoverMenu;
type PopoverMenuProps<ItemGeneric> = {
    children: React.ReactNode;
    downshift?: ControllerStateAndHelpers<ItemGeneric>;
    customClass?: string;
    customStyles?: Record<string, unknown>;
    position?: 'left' | 'right' | 'middle';
    selectAllItem?: string;
    verticalDisplay?: 'up' | 'down';
    direction?: 'top' | 'down';
    animationType?: string;
    fullWidth?: boolean;
    unsetHeight?: boolean;
    top?: number;
    stationary?: boolean;
    closeMenu: Actions<ItemGeneric>['closeMenu'];
    parent?: React.RefObject<any>;
    offset?: number;
    optionKeyName?: string;
    selectAllPrefix?: string;
    selectAllSuffix?: string;
    hasLabel?: boolean;
    dropdownClassName?: string;
    mobilePopover?: boolean;
    setRef?: React.RefCallback<HTMLDivElement>;
};
