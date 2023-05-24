export type StepperProps = {
    /** Array of strings which represent each step title */
    steps: string[];
    /** Indicates current step number. Starts from 1 */
    currentStep: number;
    /** Callout for the back button */
    callout: (currentStep: number) => void;
    /** Optionally hide the "Step" text */
    hideStepText?: boolean;
};
declare const Stepper: ({ steps, currentStep, callout, hideStepText, }: StepperProps) => JSX.Element;
export default Stepper;
