import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import SearchBar from './SearchBar'
import { toast } from '../Toast/Toast'
import { notEmpty } from '../../module'

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = (args) => {
  const [value, setValue] = useState(args.value)

  const updateValue = (value: string) => {
    setValue(value)
    if (args.debounce && notEmpty(value)) {
      toast({
        type: 'success',
        message: `The debounce of ${args.debounce} has been executed!`,
      })
    }
  }

  useEffect(() => {
    if (args.value) {
      setValue(args.value)
    }
  }, [args.value])

  return <SearchBar {...args} value={value} onChange={updateValue} />
}

export const basic = Template.bind({})
basic.args = {
  value: '',
}

export const clearExample = Template.bind({})
clearExample.args = {
  value: 'Clear is visible',
}

export const debounce = Template.bind({})
debounce.args = {
  value: '',
  debounce: 300,
}

export const autoFocus = Template.bind({})
autoFocus.args = {
  value: '',
  autoFocus: true,
}

export const withPlaceholder = Template.bind({})
withPlaceholder.args = {
  placeholder: 'Placeholder Text Here',
}

export const withLongPlaceholder = Template.bind({})
withLongPlaceholder.args = {
  value: '',
  placeholder:
    'This is a long placeholder so we need to add an ellipsis for it.',
}

export const minWidthOverride = Template.bind({})
minWidthOverride.args = {
  value: '',
  minWidth: 500,
}

export const keyUp = Template.bind({})
keyUp.args = {
  value: '',
  placeholder: 'Press Enter to see the keyUpCallout',
  keyUpCallout: () => {
    toast({
      type: 'success',
      message: 'The keyUpCallout has been executed!',
    })
  },
}
