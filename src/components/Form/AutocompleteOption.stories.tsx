import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import AutocompleteOption from './AutocompleteOption'

export default {
  title: 'Components/Autocomplete/AutocompleteOption',
  component: AutocompleteOption,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof AutocompleteOption>

const Template: ComponentStory<typeof AutocompleteOption> = (args) => (
  <AutocompleteOption {...args} />
)

export const basic = Template.bind({})
basic.args = {
  text: 'Option',
  onClick: () => {
    return
  },
  searchText: 'Option 1',
}

export const matchingText = Template.bind({})
matchingText.args = {
  text: 'Option 1',
  onClick: () => {
    return
  },
  searchText: 'Option 1',
}

export const selectedOption = Template.bind({})
selectedOption.args = {
  text: 'Option',
  onClick: () => {
    return
  },
  searchText: 'Option 1',
  isSelected: true,
}
