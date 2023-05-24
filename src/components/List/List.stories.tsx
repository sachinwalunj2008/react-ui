import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import List from './List'

export default {
  title: '[Deprecated]/Components/List',
  component: List,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate deprecated replacementComponent='StandardTable' />
      ),
    },
  },
} as ComponentMeta<typeof List>

const Template: ComponentStory<typeof List> = (args) => <List {...args} />

export const list = Template.bind({})
list.args = {
  children: (
    <>
      <li>Row 1</li>
      <li>Row 2</li>
      <li>Row 3</li>
      <li>Row 4</li>
      <li>Row 5</li>
    </>
  ),
}
