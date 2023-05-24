import React from 'react';
import { TooltipProps } from '../Tooltip/Tooltip';
export default function ToggleOptions<OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>, StateGeneric>({ options, state, callout, stateName, customClass, valuesAreBooleans, disabled, }: StateAndStateNameProps<OptionGeneric, StateGeneric>): JSX.Element;
export default function ToggleOptions<OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>, StateGeneric>({ options, selected, callout, customClass, valuesAreBooleans, disabled, }: SelectedProps<OptionGeneric, StateGeneric>): JSX.Element;
interface RequiredOptionKeys<ValueTypeGeneric> {
    id?: number;
    text?: string;
    value: ValueTypeGeneric;
}
type Selected = string | number | boolean;
type ToggleBaseProps<OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>> = {
    options: OptionGeneric[];
    customClass?: string;
    valuesAreBooleans?: boolean;
    disabled?: boolean;
    labelText?: string;
    rightLabel?: React.ReactNode;
    labelTooltip?: Omit<TooltipProps, 'children'>;
    required?: boolean;
    noBorder?: boolean;
};
type StateAndStateNameCallout<Param2Generic> = (param1: string, param2: Param2Generic) => void;
type StateAndStateNameProps<OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>, StateGeneric> = ToggleBaseProps<OptionGeneric> & {
    state: StateGeneric;
    stateName: string;
    selected?: Selected;
    callout: StateAndStateNameCallout<OptionGeneric['value']>;
};
type SelectedPropsCallout<Param1Generic> = (param1: Param1Generic) => void;
type SelectedProps<OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>, StateGeneric> = ToggleBaseProps<OptionGeneric> & {
    state?: StateGeneric;
    stateName?: string;
    selected?: Selected;
    callout: SelectedPropsCallout<OptionGeneric['value']>;
};
export {};
