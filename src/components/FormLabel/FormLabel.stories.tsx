import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { DocsTemplate } from '../../../.storybook'
import FormLabel from './FormLabel'

export default {
  title: 'Components/FormComponents/FormLabel',
  component: FormLabel,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description='This component is to be used with all form components. It is meant to clean up the inconsistent form label experiences that exist amongst the various components.'
          whenToUse={[
            <code key='bullet-1'>TextInput</code>,
            <code key='bullet-2'>Select</code>,
            <code key='bullet-3'>MultipleSelection</code>,
            <code key='bullet-4'>Slider</code>,
            <code key='bullet-5'>ToggleOptions</code>,
          ]}
        />
      ),
    },
  },
} as ComponentMeta<typeof FormLabel>

const Template: ComponentStory<typeof FormLabel> = (args) => (
  <FormLabel {...args} />
)

export const basic = Template.bind({})
basic.args = {
  label: 'The Label',
}

export const active = Template.bind({})
active.args = {
  label: 'The Label',
  active: true,
}

export const error = Template.bind({})
error.args = {
  label: 'The Label',
  error: true,
}

export const required = Template.bind({})
required.args = {
  label: 'The Label',
  required: true,
}

export const tooltip = Template.bind({})
tooltip.args = {
  label: 'The Label',
  tooltip: {
    tooltipContent: 'This is the tooltip content.',
  },
}

export const rightLabel = Template.bind({})
rightLabel.args = {
  label: 'The Label',
  rightLabel: 'The Right Label',
}
