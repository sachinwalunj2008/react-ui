import React from 'react';
import { Tooltip } from '../../module';
type SliderProps = {
    /** The number value to display slider */
    value: number;
    /** Function to update the required of slider */
    updateValue: (value: number) => void;
    /** Label above the slider */
    label: string;
    /** min slider range */
    min?: number;
    /** max slider range */
    max?: number;
    /** steps between number on slider */
    step?: string | number;
    /** passes back the current value of the slider */
    callout?: (value: number | string) => void;
    /** used to format the values text displayed on right of the slider */
    prefix?: string;
    /** used to format the values text displayed on right of the slider */
    suffix?: string;
    /** set width of slider */
    width?: string;
    /** Optional tooltip to display when hovering over the slider */
    tooltip?: Omit<TooltipProps, 'children'>;
    /** Optional tooltip for to display when hovering over the label */
    labelTooltip?: Omit<TooltipProps, 'children'>;
    /** Optional label to display on the top right side of the slider */
    rightLabel?: React.ReactNode;
    /** Optionally show a red asterisk if this field should be required */
    required?: boolean;
};
type TooltipProps = React.ComponentProps<typeof Tooltip>;
declare const Slider: ({ label, tooltip, labelTooltip, rightLabel, value, updateValue, min, max, step, callout, prefix, suffix, width, required, }: SliderProps) => JSX.Element;
export default Slider;
