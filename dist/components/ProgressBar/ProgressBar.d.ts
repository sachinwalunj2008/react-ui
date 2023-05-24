export type ProgressBarProps = {
    /** Array of strings which represent each step title */
    steps: string[];
    /** Indicates current step number. Starts from 1 */
    currentStep: number;
};
/**
 * @deprecated Please use the new component `Stepper`
 **/
export default function ProgressBar({ steps, currentStep, }: ProgressBarProps): JSX.Element;
