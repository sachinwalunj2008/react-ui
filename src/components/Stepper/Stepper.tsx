import React from 'react'
import { Button, Icon } from '../../module'
import styles from './_stepper.module.scss'

export type StepperProps = {
  /** Array of strings which represent each step title */
  steps: string[]
  /** Indicates current step number. Starts from 1 */
  currentStep: number
  /** Callout for the back button */
  callout: (currentStep: number) => void
  /** Optionally hide the "Step" text */
  hideStepText?: boolean
}

const Stepper = ({
  steps,
  currentStep,
  callout,
  hideStepText,
}: StepperProps): JSX.Element => {
  const cStep =
      currentStep <= 0
        ? 1
        : currentStep > steps.length
        ? steps.length
        : currentStep,
    hasBackButton = currentStep > 1 ? styles.hasBackButton : ''
  document.documentElement.style.setProperty('--steps', steps.length.toString())

  return (
    <div className={styles.container}>
      <div className={`${styles.topRowGrid} ${hasBackButton}`}>
        {cStep > 1 && (
          <Button as='unstyled' onClick={() => callout(currentStep)}>
            <Icon icon='arrowLong' customClass={styles.iconStyles} />
          </Button>
        )}
        <div className={`${styles.header} ${hasBackButton}`}>
          <div className={styles.title}>{steps[cStep - 1]}</div>
          <div>
            {!hideStepText ? 'Step' : null} {cStep} of {steps.length}
          </div>
        </div>
      </div>
      <div className={styles.stepper}>
        {steps.map((step, index) => (
          <Step
            key={`${step}${index}`}
            active={cStep === index + 1}
            highlighted={cStep > index + 1}
          />
        ))}
      </div>
    </div>
  )
}

export default Stepper

type StepProps = {
  active: boolean
  highlighted: boolean
}

const Step = ({ active, highlighted }: StepProps): JSX.Element => {
  return (
    <div className={styles.step}>
      <div
        className={`${styles.activePlaceholder} ${
          active ? styles.active : ''
        } ${highlighted ? styles.highlighted : ''}`.trim()}
      />
    </div>
  )
}
