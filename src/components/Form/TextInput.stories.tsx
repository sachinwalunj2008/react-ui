import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { DocsTemplate } from '../../../.storybook'
import { toast } from '../Toast/Toast'
import TextInput from './TextInput'

export default {
  title: 'Components/FormComponents/TextInput',
  component: TextInput,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => (
  <>
    <div style={{ width: '300px' }}>
      <TextInput {...args} />
    </div>
  </>
)

const genericProps = {
  callout: (value) =>
    toast({
      type: 'info',
      message: `callout stateName: ${value}`,
    }),
  debounce: 1000,
  value: '',
}

export const basic = Template.bind({})
basic.args = {
  ...genericProps,
  id: 'text',
  type: 'text',
  labelText: 'Basic Text Input',
  stateName: 'basic_text_state',
}

export const requiredLabel = Template.bind({})
requiredLabel.args = {
  ...genericProps,
  id: 'text',
  type: 'text',
  labelText: 'Label With Tooltip',
  stateName: 'required_state',
  required: true,
}

export const LabelTooltip = Template.bind({})
LabelTooltip.args = {
  ...genericProps,
  id: 'text',
  type: 'text',
  labelText: 'Label With Tooltip',
  stateName: 'label_tooltip_state',
  labelTooltip: {
    tooltipContent: 'This is a tooltip.',
  },
}

export const RightLabel = Template.bind({})
RightLabel.args = {
  ...genericProps,
  id: 'text',
  type: 'text',
  labelText: 'Label With Tooltip',
  labelTooltip: {
    tooltipContent: 'This is a tooltip.',
  },
  stateName: 'right_label_state',
  rightLabel: 'Right Label',
}

export const NumericTextInput = Template.bind({})
NumericTextInput.args = {
  ...genericProps,
  id: 'number',
  type: 'number',
  labelText: 'Basic Number Input',
  stateName: 'basic_number_state',
}

export const EmailInput = Template.bind({})
EmailInput.args = {
  ...genericProps,
  id: 'email',
  type: 'email',
  labelText: 'Email Input',
  stateName: 'email_input_state',
}

export const PasswordInput = Template.bind({})
PasswordInput.args = {
  ...genericProps,
  id: 'password',
  type: 'password',
  labelText: 'Password Input',
  stateName: 'password_input_state',
}

export const CurrencyTextInput = Template.bind({})
CurrencyTextInput.args = {
  ...genericProps,
  id: 'number',
  type: 'number',
  labelText: 'Currency Input',
  stateName: 'currency_input_state',
  numberFormat: {
    type: 'currency',
    currencySymbol: '$',
  },
}

export const PercentageTextInput = Template.bind({})
PercentageTextInput.args = {
  ...genericProps,
  id: 'number',
  type: 'number',
  labelText: 'Percentage Input',
  stateName: 'percentage_input_state',
  numberFormat: {
    type: 'percentage',
  },
  inputLabel: '%',
}

export const Textarea = Template.bind({})
Textarea.args = {
  ...genericProps,
  id: 'textarea',
  type: 'textarea',
  labelText: 'Textarea',
  stateName: 'textarea_input_state',
}
