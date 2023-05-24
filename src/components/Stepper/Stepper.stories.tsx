import React, { useState, useEffect } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import Stepper from './Stepper'

export default {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Stepper>

const Template: ComponentStory<typeof Stepper> = (args) => {
  const { currentStep } = args
  const [step, setStep] = useState(currentStep)

  const goBack = () => {
    setStep((prevState) => prevState - 1)
  }

  useEffect(() => {
    setStep(currentStep)
  }, [currentStep])

  return (
    <div style={{ width: '400px' }}>
      <Stepper {...args} currentStep={step} callout={goBack} />
    </div>
  )
}

export const basic = Template.bind({})
basic.args = {
  steps: ['One', 'Two', 'Three', 'Four', 'Five'],
  currentStep: 1,
}
