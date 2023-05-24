import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BulkActions from './BulkActions'
import { DocsTemplate } from '../../../.storybook'

export default {
  title: '[Deprecated]/Components/BulkActions',
  component: BulkActions,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate deprecated replacementComponent='PrimaryActionButton' />
      ),
    },
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as ComponentMeta<typeof BulkActions>

const Template: ComponentStory<typeof BulkActions> = (args) => {
  const { children } = args
  return <BulkActions>{() => children}</BulkActions>
}

export const bulkActions = Template.bind({})
bulkActions.args = {
  children: <div>Actions go here</div>,
}
bulkActions.storyName = 'BulkActions'
