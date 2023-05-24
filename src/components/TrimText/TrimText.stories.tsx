import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TrimText } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export default {
  title: 'Components/Text/TrimText',
  component: TrimText,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof TrimText>

const Template: ComponentStory<typeof TrimText> = (args) => (
  <TrimText {...args} />
)

export const trimmedText = Template.bind({})
trimmedText.args = {
  text: 'This is a really long text string that will need to be trimmed.',
  limit: 30,
}

export const fullText = Template.bind({})
fullText.args = {
  text: 'This string has a longer limit.',
  limit: 100,
}
fullText.storyName = 'Full Text - No Tooltip'
