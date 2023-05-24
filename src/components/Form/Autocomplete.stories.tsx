import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate, ForDisplayUseOnly } from '../../../.storybook'
import Autocomplete from './Autocomplete'

const displayHeightToAvoidInputBoxOverlap = '225px'

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Autocomplete>

const Template: ComponentStory<typeof Autocomplete> = (args) => (
  <ForDisplayUseOnly height={displayHeightToAvoidInputBoxOverlap}>
    <Autocomplete {...args} />
  </ForDisplayUseOnly>
)

const options = [
  {
    id: 3460493,
    title: 'Title 1',
  },
  {
    id: 3460494,
    title: 'Title 2',
  },
  {
    id: 3460495,
    title: 'Title 3',
  },
]

export const basicOptionWithHeader = Template.bind({})
basicOptionWithHeader.args = {
  searchText: '',
  getSelectedText: () => console.log('getSelectedText'),
  onChange: () => console.log('onChange '),
  options,
  optionRender: (option) => <div>{option.title}</div>,
  onSearchChange: () => console.log('onSearchChange '),
  getKey: (option) => option.id,
  headerRender: 'The header',
}

export const customOptionsRender = Template.bind({})
customOptionsRender.args = {
  searchText: '',
  getSelectedText: () => console.log('getSelectedText'),
  onChange: () => console.log('onChange '),
  options,
  optionsRender: (_, { options }) => (
    <>
      <div className='my-8'>Custom Options Component</div>
      {options.map(({ id, title }) => (
        <div key={id}>{title}</div>
      ))}
    </>
  ),
  onSearchChange: () => console.log('onSearchChange'),
}
