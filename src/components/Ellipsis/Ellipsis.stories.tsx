import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { DocsTemplate } from '../../../.storybook'
import Ellipsis from './Ellipsis'

export default {
  title: 'Components/Text/Ellipsis',
  component: Ellipsis,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate description='This component should be used when the app is in a loading state. It only includes the ellipsis and not the text next to it.' />
      ),
    },
  },
} as ComponentMeta<typeof Ellipsis>

const Template: ComponentStory<typeof Ellipsis> = () => (
  <div>
    Loading
    <Ellipsis />
  </div>
)

export const ellipsis = Template.bind({})
