import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import MdashCheck from './MdashCheck'
import { DocsTemplate } from '../../../.storybook'

const Stories = {
  title: 'Components/Mdash/MdashCheck',
  component: MdashCheck,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof MdashCheck>

export default Stories

const TemplateGroup: ComponentStory<typeof MdashCheck> = (args) => {
  return <MdashCheck {...args}>Content to hide or show</MdashCheck>
}

export const Check = TemplateGroup.bind({})
Check.args = {
  check: true,
}
Check.storyName = 'MdashCheck'
