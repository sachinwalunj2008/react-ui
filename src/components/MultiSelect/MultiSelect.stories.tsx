import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { MultiSelect } from '../../module'

export default {
  title: '[Deprecated]/Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description='This component needs to be revamped. It has a bunch of bugs.'
          whenToUse={['This is used when we need a multi select experience.']}
          deprecated
          replacementComponent='MultipleSelection'
        />
      ),
    },
  },
} as ComponentMeta<typeof MultiSelect>

type Option = {
  name: string
  id: string
  isChecked: boolean
}

const Template: ComponentStory<typeof MultiSelect> = (args) => {
  const [checked, setChecked] = useState<Array<Option>>([])

  const update = (name, value) => {
    const option = args.options.find((o: Option) => o.name === name)
    const checkedIndex = checked.findIndex((c) => c.name === name)
    console.log('checkedIndex', checkedIndex)

    if (checkedIndex !== -1) {
      checked.splice(checkedIndex, 1)
      setChecked(checked)
    } else {
      const newArr = checked.concat([option])
      setChecked(newArr)
    }
  }

  return (
    <MultiSelect
      {...args}
      checkedItems={checked}
      callout={update}
      optionKeyName='name'
      label
      searchBar
    />
  )
}

const options = [
  {
    name: 'option 1',
    id: 'option-1',
    isChecked: false,
  },
  {
    name: 'option 2',
    id: 'option-2',
    isChecked: false,
  },
]

export const basic = Template.bind({})
basic.args = {
  options: options,
  clickText: 'Options',
}

export const noOptions = Template.bind({})
noOptions.args = {
  options: [],
  clickText: 'Options',
}
