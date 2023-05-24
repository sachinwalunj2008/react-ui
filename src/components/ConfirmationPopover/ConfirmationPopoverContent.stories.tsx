import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { ConfirmationPopoverContent, toast } from '../../module'

export default {
  title:
    'Components/Popover/PopoverWithConfirmation/ConfirmationPopoverContent',
  component: ConfirmationPopoverContent,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof ConfirmationPopoverContent>

const Template: ComponentStory<typeof ConfirmationPopoverContent> = (args) => (
  <ConfirmationPopoverContent {...args} />
)

export const green = Template.bind({})
green.args = {
  type: 'green',
  header: 'Are you sure?',
  body: 'This will perform some action. Would you like to continue?',
  confirmCallout: () => {
    toast({ message: 'You clicked confirm!', type: 'success' })
  },
  cancelCallout: () => {
    toast({ message: 'You clicked cancel!', type: 'info' })
  },
}

export const blue = Template.bind({})
blue.args = {
  type: 'blue',
  header: 'Are you sure?',
  body: 'This will perform some action. Would you like to continue?',
  confirmCallout: () => {
    toast({ message: 'You clicked confirm!', type: 'success' })
  },
  cancelCallout: () => {
    toast({ message: 'You clicked cancel!', type: 'info' })
  },
}

export const red = Template.bind({})
red.args = {
  type: 'red',
  header: 'Are you sure?',
  body: 'This will perform some action. Would you like to continue?',
  confirmCallout: () => {
    toast({ message: 'You clicked confirm!', type: 'success' })
  },
  cancelCallout: () => {
    toast({ message: 'You clicked cancel!', type: 'info' })
  },
}

export const customConfirmButtonText = Template.bind({})
customConfirmButtonText.args = {
  type: 'green',
  header: 'Are you sure?',
  body: 'This will perform some action. Would you like to continue?',
  confirmCallout: () => {
    toast({ message: 'You clicked confirm!', type: 'success' })
  },
  cancelCallout: () => {
    toast({ message: 'You clicked cancel!', type: 'info' })
  },
  confirmButtonText: 'Yessir',
}
