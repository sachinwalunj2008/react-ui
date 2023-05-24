import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { TextUnderline } from './TextUnderline'

export default {
  title: 'Components/TextUnderline',
  component: TextUnderline,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof TextUnderline>

const Template: ComponentStory<typeof TextUnderline> = (args) => (
  <TextUnderline {...args} />
)

export const basic = Template.bind({})
basic.args = {
  text: 'Storybook',
}

export const shortWord = Template.bind({})
shortWord.args = {
  text: 'Hi',
}

export const multipleWords = Template.bind({})
multipleWords.args = {
  text: 'Hello World',
}

export const shortFirstWord = Template.bind({})
shortFirstWord.args = {
  text: 'Hi World',
}

export const combineWords = Template.bind({})
combineWords.args = {
  text: 'Hello World',
  combineWords: true,
}

export const smallSize = Template.bind({})
smallSize.args = {
  text: 'Hello World',
  small: true,
}

export const regularFont = Template.bind({})
regularFont.args = {
  text: 'Hello World',
  regularFont: true,
}
