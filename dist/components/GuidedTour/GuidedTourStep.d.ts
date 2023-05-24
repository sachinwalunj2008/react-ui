export type GuidedTourStepProps = {
    /** Current step of the Guided Tour parent component. */
    currentStep: number;
    /** Total number of steps for the Guided Tour. */
    totalSteps: number;
    /** We want to display the same text in the step header for all steps. We are using `stepHeaderText` to show a different header in the content. */
    stepHeaderText: string;
    /** Header content for the Guided Tour Step. */
    headerText: string;
    /** Content for the Guided Tour Step. */
    text: string;
    /** Callout to navigate between steps. */
    navigate: (stepNumber: number) => void;
    /** Function to call when the Got It button is clicked. This will close the Guided Tour */
    close: () => void;
};
declare const GuidedTourStep: ({ currentStep, totalSteps, stepHeaderText, headerText, text, navigate, close, }: GuidedTourStepProps) => JSX.Element;
export default GuidedTourStep;
