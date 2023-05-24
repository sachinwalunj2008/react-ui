import { ReactSwitchProps } from 'react-switch';
type ToggleProps = {
    /** Checked value of the Switch - boolean */
    checked: ReactSwitchProps['checked'];
    /** Disabled state of the Switch - boolean */
    disabled?: ReactSwitchProps['disabled'];
    /** function to be executed when the checked status change */
    callout: ReactSwitchProps['onChange'];
    /** Optional class for the Switch */
    className?: string;
    /** Set as an attribute to the embedded checkbox. This is useful for the associated label, which can point to the id in its htmlFor attribute. */
    customId?: ReactSwitchProps['id'];
};
declare const Toggle: ({ checked, callout, className, customId, disabled, }: ToggleProps) => JSX.Element;
export default Toggle;
