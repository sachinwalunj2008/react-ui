import React from 'react'
// import { createPortal } from 'react-dom'
import GuidedTourStep, { GuidedTourStepProps } from './GuidedTourStep'
import styles from './_guided-tour.module.scss'
import Tour, { ReactourStep } from 'reactour'

type GuidedTourProps = {
  /** We want to display the same text in the step header for all steps. We are using `stepHeaderText` to show a different header in the content. */
  stepHeaderText: string
  /** Function to call when the Got It button is clicked. This will close the Guided Tour */
  closeCallout: GuidedTourStepProps['close']
  /** Determines whether to show the Guided Tour or not. */
  show: boolean
  /** Steps for the Guided Tour */
  steps: Array<{
    /** Header text for a specific tour step. */
    header: string
    /** Body text for a specific tour step. */
    body: string
    /** CSS selector for the element highlighted in a tour step. */
    selector: string
  }>
}

export type HighlightState = {
  width: number
  height: number
  top: number
  left: number
}

const GuidedTour = ({
  stepHeaderText,
  closeCallout,
  show,
  steps,
}: GuidedTourProps): JSX.Element => {
  const tourSteps: ReactourStep[] = steps.map((step) => {
    return {
      selector: step.selector,
      content: ({ close, goTo, step: currentStep }) => {
        const navigate = (stepNumber: number) => {
          // The steps from reactour are index based and start from 0. Our steps start at 1. The stepIndex will convert our steps to index based steps.
          const stepIndex = currentStep - 1
          if (stepNumber > currentStep) {
            goTo(stepIndex + 1)
          } else {
            goTo(stepIndex - 1)
          }
        }
        return (
          <GuidedTourStep
            currentStep={currentStep}
            totalSteps={steps.length}
            stepHeaderText={stepHeaderText}
            headerText={step.header}
            text={step.body}
            navigate={navigate}
            close={close}
          />
        )
      },
    }
  })

  const scrollToElement = () => {
    document.querySelector(steps[0].selector)?.scrollIntoView()
  }

  return (
    <Tour
      steps={tourSteps}
      isOpen={show}
      onRequestClose={closeCallout}
      showNavigation={false}
      showNavigationNumber={false}
      showNumber={false}
      showButtons={false}
      closeWithMask={false}
      showCloseButton={false}
      className={styles.reactourOverride}
      disableInteraction
      inViewThreshold={5}
      rounded={4}
      scrollDuration={250}
      onAfterOpen={scrollToElement}
    />
  )
}

export default GuidedTour
