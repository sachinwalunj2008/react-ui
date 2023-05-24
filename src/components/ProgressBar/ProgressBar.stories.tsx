import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import ProgressBar from './ProgressBar'

export default {
  title: '[Deprecated]/Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description='The ProgressBar component is our standard for implementing a progress bar. This feature includes the step title and step count. As the user navigates between steps, the progress bar will reflect the current step.'
          whenToUse={[
            'When we have multiple actions to perform',
            'All the actions should be in a sequence',
          ]}
          deprecated
          replacementComponent='Stepper'
        />
      ),
    },
  },
} as ComponentMeta<typeof ProgressBar>

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
)

export const step1 = Template.bind({})
step1.args = {
  steps: ['One', 'Two', 'Three', 'Four'],
  currentStep: 1,
}
step1.storyName = 'Step 1'

export const step2 = Template.bind({})
step2.args = {
  steps: ['One', 'Two', 'Three', 'Four'],
  currentStep: 2,
}
step2.storyName = 'Step 2'

export const step3 = Template.bind({})
step3.args = {
  steps: ['One', 'Two', 'Three', 'Four'],
  currentStep: 3,
}
step3.storyName = 'Step 3'

export const step4 = Template.bind({})
step4.args = {
  steps: ['One', 'Two', 'Three', 'Four'],
  currentStep: 4,
}
step4.storyName = 'Step 4'
