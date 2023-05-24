import { GuidedTourStepProps } from './GuidedTourStep';
type GuidedTourProps = {
    /** We want to display the same text in the step header for all steps. We are using `stepHeaderText` to show a different header in the content. */
    stepHeaderText: string;
    /** Function to call when the Got It button is clicked. This will close the Guided Tour */
    closeCallout: GuidedTourStepProps['close'];
    /** Determines whether to show the Guided Tour or not. */
    show: boolean;
    /** Steps for the Guided Tour */
    steps: Array<{
        /** Header text for a specific tour step. */
        header: string;
        /** Body text for a specific tour step. */
        body: string;
        /** CSS selector for the element highlighted in a tour step. */
        selector: string;
    }>;
};
export type HighlightState = {
    width: number;
    height: number;
    top: number;
    left: number;
};
declare const GuidedTour: ({ stepHeaderText, closeCallout, show, steps, }: GuidedTourProps) => JSX.Element;
export default GuidedTour;
