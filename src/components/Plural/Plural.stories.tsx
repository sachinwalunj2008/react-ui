import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { Plural } from '../../module'

export default {
  title: 'Components/Text/Plural',
  component: Plural,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Plural>

const Template: ComponentStory<typeof Plural> = (args) => <Plural {...args} />

export const multipleCounts = Template.bind({})
multipleCounts.args = {
  text: 'Product',
  number: 2,
}

export const singleCount = Template.bind({})
singleCount.args = {
  text: 'Product',
  number: 1,
}

export const zeroCount = Template.bind({})
zeroCount.args = {
  text: 'Product',
  number: 0,
}

const InlineTemplate: ComponentStory<typeof Plural> = (args) => (
  <div>
    There {args.number === 1 ? 'is' : 'are'} {args.number} <Plural {...args} />
  </div>
)

export const inlineMultipleCounts = InlineTemplate.bind({})
inlineMultipleCounts.args = {
  text: 'Product',
  number: 2,
}

export const inlineSingleCount = InlineTemplate.bind({})
inlineSingleCount.args = {
  text: 'Product',
  number: 1,
}

export const inlineZeroCount = InlineTemplate.bind({})
inlineZeroCount.args = {
  text: 'Product',
  number: 0,
}
