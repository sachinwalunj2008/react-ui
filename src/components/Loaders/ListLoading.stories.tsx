import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import ListLoading from './ListLoading'

export default {
  title: 'Components/Loaders/ListLoading',
  component: ListLoading,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof ListLoading>

const Template: ComponentStory<typeof ListLoading> = (args) => (
  <div
    className='container'
    style={{
      width: '900px',
      padding: '24px',
    }}
  >
    <ListLoading {...args} />
  </div>
)

export const Standard = Template.bind({})
export const longList = Template.bind({})
longList.args = {
  longList: true,
}
export const CustomHeightAndGridGap = Template.bind({})
CustomHeightAndGridGap.args = {
  longList: true,
  customHeight: '24px',
  customGridGap: '4px',
}
