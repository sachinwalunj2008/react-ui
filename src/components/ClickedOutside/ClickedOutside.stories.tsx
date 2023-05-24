import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import ClickedOutside from './ClickedOutside'
import { toast } from '../Toast/Toast'

export default {
  title: '[Deprecated]/Components/ClickedOutside',
  component: ClickedOutside,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description='This could be useful for elements that are not inherently built as popovers. However, we do not have many use cases for that.'
          deprecated
        />
      ),
    },
  },
} as ComponentMeta<typeof ClickedOutside>

const Template: ComponentStory<typeof ClickedOutside> = (args) => (
  <ClickedOutside {...args} />
)

export const clickedOutside = Template.bind({})
clickedOutside.args = {
  clicked: () =>
    toast({
      message: 'You clicked outside of the box!',
      type: 'success',
    }),
  children: <div className='box'>Click outside of this box.</div>,
}
clickedOutside.storyName = 'ClickedOutside'
