import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../../.storybook'
import SelectDisplay from './SelectDisplay'

export default {
  title: 'Components/SelectDisplay',
  component: SelectDisplay,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof SelectDisplay>

const Template: ComponentStory<typeof SelectDisplay> = (args) => (
  <SelectDisplay {...args} />
)

export const withoutBorder = Template.bind({})
withoutBorder.args = {
  options: [
    { name: 'option_1', label: 'Option with a long name' },
    { name: 'option_2', label: 'Option 2' },
    { name: 'option_3', label: 'Option 3' },
  ],
  active: 'option_1',
}

export const withBorder = Template.bind({})
withBorder.args = {
  options: [
    { name: 'option_1', label: 'Option with a long name' },
    { name: 'option_2', label: 'Option 2' },
    { name: 'option_3', label: 'Option 3' },
  ],
  active: 'option_2',
  hasBorder: true,
}

export const withTippy = Template.bind({})
withTippy.args = {
  options: [
    { name: 'option_1', label: 'Option with a long name' },
    { name: 'option_2', label: 'Option 2' },
    {
      name: 'option_3',
      label: 'Option 3',
      showTippyOnOption: true,
      children: {
        options: [
          { name: 'tippy_option_1', label: 'Tippy Option 1' },
          { name: 'tippy_option_2', label: 'Tippy Option 2' },
          { name: 'tippy_option_3', label: 'Tippy Option 3' },
        ],
      },
    },
  ],
  hasTippy: true,
  callout: (option) => console.log('Selected Option =>', option),
}
