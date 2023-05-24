import React, { useEffect, useState } from 'react'
import styles from './_progress-bar.module.scss'

export type ProgressBarProps = {
  /** Array of strings which represent each step title */
  steps: string[]
  /** Indicates current step number. Starts from 1 */
  currentStep: number
}

/**
 * @deprecated Please use the new component `Stepper`
 **/
export default function ProgressBar({
  steps,
  currentStep = 1,
}: ProgressBarProps): JSX.Element {
  const [width, setWidth] = useState(0),
    [step, setStep] = useState(currentStep)

  useEffect(() => {
    setStep(
      currentStep > steps.length
        ? steps.length
        : currentStep <= 0
        ? 1
        : currentStep
    )
  }, [currentStep, steps.length])

  useEffect(() => {
    setWidth(100 / steps.length)
  }, [steps.length])

  return (
    <>
      <div className={styles.stepFontSize}>
        <span className={styles.stepFontColor}>{`Step ${step} of ${
          steps.length
        }: ${steps[step - 1]}`}</span>
      </div>
      <div className={styles.progressBottomBar}>
        <div
          className={styles.progressBottomBarActive}
          style={{
            width: `${(width * step).toFixed(2)}%`,
          }}
        />
      </div>
    </>
  )
}
