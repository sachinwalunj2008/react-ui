import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import ReportLoader from './ReportLoader'

export default {
  title: '[Deprecated]/Components/ReportLoader',
  component: ReportLoader,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          deprecated
          description='We force a top position of 50% which pushes the loader down. It is really bad...'
        />
      ),
    },
  },
} as ComponentMeta<typeof ReportLoader>

const Template: ComponentStory<typeof ReportLoader> = (args) => (
  <div style={{ height: '700px' }}>
    <ReportLoader {...args} />
  </div>
)

export const basic = Template.bind({})
basic.args = {}
