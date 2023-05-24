import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import LabelAndData from './LabelAndData'

export default {
  title: 'Components/LabelAndData',
  component: LabelAndData,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof LabelAndData>

const Template: ComponentStory<typeof LabelAndData> = (args) => (
  <LabelAndData {...args} />
)

export const labelAndData = Template.bind({})
labelAndData.args = {
  label: 'Label',
  data: 'Add data content here!',
  check: true,
}

export const noData = Template.bind({})
noData.args = {
  label: 'Label',
  data: 'Add data content here!',
  check: false,
}
