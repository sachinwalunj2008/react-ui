import { chartColors } from '../HeaderMetric/HeaderMetricGroup';
export interface CheckboxProps<StateNameType extends number | string> {
    /** Label for the checkbox */
    label: string;
    /** Determines whether the checkbox is checked */
    checked?: boolean;
    /** Optional function on checkbox click */
    callout?: (stateName: StateNameType | undefined, check: boolean) => void;
    /** Unique name for the checkbox */
    name?: string;
    /** Name of the state for the checkbox. This would be defined in the component consuming this one. */
    stateName?: StateNameType;
    /** Used to show an error state */
    error?: boolean;
    /** Used to show a disabled state */
    disabled?: boolean;
    /** Optional className that can be provided for styling */
    customClass?: string;
    /** Optional className for the label */
    labelClass?: string;
    /** Type of checkbox style */
    type?: 'checkbox' | 'radio';
    /** Size of the radio checkbox */
    radioSize?: string;
    /** Option to hide the label */
    hideLabel?: boolean;
    /** Potential colors that can be used for the checkbox */
    checkboxColor?: chartColors;
}
declare const Checkbox: <StateNameType extends string | number>({ name, checked, label, callout, customClass, stateName, type, disabled, error, radioSize, labelClass, hideLabel, checkboxColor, }: CheckboxProps<StateNameType>) => JSX.Element;
export default Checkbox;
