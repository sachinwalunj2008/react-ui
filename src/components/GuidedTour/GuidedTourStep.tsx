import React from 'react'
import { Stepper, Button } from '../../module'
import styles from './_guided-tour.module.scss'

export type GuidedTourStepProps = {
  /** Current step of the Guided Tour parent component. */
  currentStep: number
  /** Total number of steps for the Guided Tour. */
  totalSteps: number
  /** We want to display the same text in the step header for all steps. We are using `stepHeaderText` to show a different header in the content. */
  stepHeaderText: string
  /** Header content for the Guided Tour Step. */
  headerText: string
  /** Content for the Guided Tour Step. */
  text: string
  /** Callout to navigate between steps. */
  navigate: (stepNumber: number) => void
  /** Function to call when the Got It button is clicked. This will close the Guided Tour */
  close: () => void
}

const GuidedTourStep = ({
  currentStep,
  totalSteps,
  stepHeaderText,
  headerText,
  text,
  navigate,
  close,
}: GuidedTourStepProps): JSX.Element => {
  const steps = Array.from(Array(totalSteps)).map(() => stepHeaderText)

  return (
    <div>
      <Stepper
        currentStep={currentStep}
        callout={navigate}
        steps={steps}
        hideStepText
      />
      <div className={styles.body}>
        <div className={styles.contentHeader}>{headerText}</div>
        <div className={styles.contentBody}>{text}</div>
      </div>
      <div className={styles.buttons}>
        {currentStep < steps.length ? (
          <Button
            onClick={(e) => {
              navigate(currentStep + 1)
              e.currentTarget.blur()
            }}
          >
            Next
          </Button>
        ) : (
          <Button styleType='primary-green' onClick={close}>
            Got It
          </Button>
        )}
      </div>
    </div>
  )
}

export default GuidedTourStep
