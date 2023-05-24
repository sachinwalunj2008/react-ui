import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import Select from './Select'

export default {
  title: 'Components/FormComponents/Select',
  component: Select,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Select>

const withLabelOptions = [
  { id: 1, text: 'Option 1' },
  {
    id: 2,
    text: 'Option 2',
  },
]

const Template: ComponentStory<typeof Select> = (
  args: React.ComponentProps<typeof Select>
) => <Select {...args} />

export const withLabel = Template.bind({})
withLabel.args = {
  name: 'simple_option_select',
  labelText: 'Select Component',
  options: withLabelOptions,
  optionKeyName: 'text',
  onChange: () => {
    console.log('apply new selection')
  },
  selectedItem: { id: 0, text: 'Select Option' },
}

export const withLabelTooltip = Template.bind({})
withLabelTooltip.args = {
  name: 'simple_option_select',
  labelText: 'Select Component',
  options: withLabelOptions,
  optionKeyName: 'text',
  onChange: () => {
    console.log('apply new selection')
  },
  selectedItem: { id: 0, text: 'Select Option' },
  labelTooltip: {
    tooltipContent: 'This is the tooltip.',
  },
}

export const withRightLabel = Template.bind({})
withRightLabel.args = {
  name: 'right_label_select',
  labelText: 'Select Component',
  options: withLabelOptions,
  optionKeyName: 'text',
  onChange: () => {
    console.log('apply new selection')
  },
  selectedItem: { id: 0, text: 'Select Option' },
  rightLabel: 'Right Label',
}

const optionsWithSecondaryValue = [
  { id: 1, text: 'Option 1', secondaryValue: 'Secondary Value 1' },
  {
    id: 2,
    text: 'Option 2',
    secondaryValue: 'Secondary Value 2',
  },
]

export const secondaryValue = Template.bind({})
secondaryValue.args = {
  name: 'option_select_with_secondary',
  options: optionsWithSecondaryValue,
  optionKeyName: 'text',
  onChange: () => {
    console.log('apply new selection')
  },
  selectedItem: { id: 0, text: 'Select Option' },
  secondaryValuePosition: 'after',
  secondaryValue: 'secondaryValue',
}

const optionsWithSearchBar = [
  { id: 1, text: 'Option 1' },
  {
    id: 2,
    text: 'Option 2',
  },
  {
    id: 3,
    text: 'Option 3',
  },
]

const optionsWithLongText = [
  { id: 1, text: 'Option 1' },
  {
    id: 2,
    text: 'Hover me to know my full name which is tooooo loooooong!!!',
  },
  {
    id: 3,
    text: 'Option 3',
  },
]

export const searchBar = Template.bind({})
searchBar.args = {
  name: 'option_select_with_secondary',
  options: optionsWithSearchBar,
  optionKeyName: 'text',
  onChange: () => {
    console.log('apply new selection')
  },
  selectedItem: { id: 0, text: 'Select Option' },
  searchBar: true,
}

export const longOptionText = Template.bind({})
longOptionText.args = {
  name: 'option_select_with_long_option_text',
  options: optionsWithLongText,
  optionKeyName: 'text',
  onChange: () => {
    console.log('applied new selection')
  },
  selectedItem: { id: 0, text: 'Select Option' },
}
