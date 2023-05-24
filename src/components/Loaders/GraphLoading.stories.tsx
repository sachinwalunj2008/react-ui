import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import GraphLoading from './GraphLoading'

export default {
  title: 'Components/Loaders/GraphLoading',
  component: GraphLoading,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate description='This component will likely be deprecated, but leaving it out of the deprecated group until we confirm with UX.' />
      ),
    },
  },
} as ComponentMeta<typeof GraphLoading>

const Template: ComponentStory<typeof GraphLoading> = (args) => (
  <GraphLoading {...args} />
)

export const basic = Template.bind({})
basic.args = {
  size: 'large',
  height: 200,
}
