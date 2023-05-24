import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import Heading1 from './Heading1'

export default {
  title: '[DEPRECATED]/Components/Heading1',
  component: Heading1,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate deprecated replacementComponent='TextUnderline' />
      ),
    },
  },
} as ComponentMeta<typeof Heading1>

const Template: ComponentStory<typeof Heading1> = (args) => (
  <Heading1 {...args} />
)

export const base = Template.bind({})
base.args = {
  text: 'Pattern',
}

export const customClass = Template.bind({})
customClass.args = {
  text: 'Pattern',
  customClass: 'p-16 bdr bdrr-4',
}

export const option = Template.bind({})
option.args = {
  text: 'Pattern',
  option: true,
}

export const withoutBottomMargin = Template.bind({})
withoutBottomMargin.args = {
  text: 'Pattern',
  noBottomMargin: true,
}

export const withFirstWord = Template.bind({})
withFirstWord.args = {
  text: 'Welcome To Pattern World',
  combineFirstWord: true,
}

export const customUnderlineHeight = Template.bind({})
customUnderlineHeight.args = {
  text: 'Pattern',
  underlineHeight: '2px',
}
