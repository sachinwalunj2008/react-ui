import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { toast, Button, PopoverWithConfirmation } from '../../module'

export default {
  title: 'Components/Popover/PopoverWithConfirmation',
  component: PopoverWithConfirmation,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof PopoverWithConfirmation>

const Template: ComponentStory<typeof PopoverWithConfirmation> = (args) => (
  <PopoverWithConfirmation {...args} />
)

const multipleOptions = (color: 'green' | 'blue' | 'red') => {
  return [
    {
      name: 'confirmation-action',
      children: ({ show }: { show: (name: string) => void }) => (
        <Button as='unstyled' onClick={() => show('confirmation-action')}>
          Action Option
        </Button>
      ),
      confirmation: {
        type: color,
        header: 'Are you sure?',
        body: 'This will perform some action. Would you like to continue?',
        confirmCallout: () => {
          toast({ message: 'You did it!', type: 'success' })
        },
      },
    },
    {
      name: 'option2',
      children: () => (
        <Button as='unstyled' onClick={() => console.log('Option 2 clicked')}>
          Option 2
        </Button>
      ),
    },
    {
      name: 'option3',
      children: () => (
        <Button as='unstyled' onClick={() => console.log('Option 3 clicked')}>
          Option 3
        </Button>
      ),
    },
  ]
}

const singleOption = (color: 'green' | 'blue' | 'red') => {
  return [
    {
      name: 'confirmation-action',
      confirmation: {
        type: color,
        header: 'Are you sure?',
        body: 'This will perform some action. Would you like to continue?',
        confirmCallout: () => {
          toast({ message: 'You did it!', type: 'success' })
        },
      },
    },
  ]
}

export const MenuButtonGreen = Template.bind({})
MenuButtonGreen.args = {
  isMenuButton: true,
  options: multipleOptions('green'),
  menuButtonProps: {
    mainButtonType: 'button',
    mainButtonText: 'View Details',
    mainButtonAction: () => console.log('main button clicked'),
  },
}
MenuButtonGreen.storyName = 'MenuButton - Green'

export const MenuButtonBlue = Template.bind({})
MenuButtonBlue.args = {
  isMenuButton: true,
  options: multipleOptions('blue'),
  menuButtonProps: {
    mainButtonType: 'button',
    mainButtonText: 'View Details',
    mainButtonAction: () => console.log('main button clicked'),
  },
}
MenuButtonBlue.storyName = 'MenuButton - Blue'

export const MenuButtonRed = Template.bind({})
MenuButtonRed.args = {
  isMenuButton: true,
  options: multipleOptions('red'),
  menuButtonProps: {
    mainButtonType: 'button',
    mainButtonText: 'View Details',
    mainButtonAction: () => console.log('main button clicked'),
  },
}
MenuButtonRed.storyName = 'MenuButton - Red'

export const TippyGreen = Template.bind({})
TippyGreen.args = {
  options: multipleOptions('green'),
  buttonContent: 'Open Popover',
  tippyProps: {
    appendTo: document.body,
  },
}
TippyGreen.storyName = 'Tippy - Green'

export const TippyBlue = Template.bind({})
TippyBlue.args = {
  options: multipleOptions('blue'),
  buttonContent: 'Open Popover',
  tippyProps: {
    appendTo: document.body,
  },
}
TippyBlue.storyName = 'Tippy - Blue'

export const TippyRed = Template.bind({})
TippyRed.args = {
  options: multipleOptions('red'),
  buttonContent: 'Open Popover',
  tippyProps: {
    appendTo: document.body,
  },
}
TippyRed.storyName = 'Tippy - Red'

export const SingleConfirmationGreen = Template.bind({})
SingleConfirmationGreen.args = {
  options: singleOption('green'),
  buttonContent: 'Open Popover',
  tippyProps: {
    appendTo: document.body,
  },
}
SingleConfirmationGreen.storyName = 'Single Confirmation - Green'

export const SingleConfirmationBlue = Template.bind({})
SingleConfirmationBlue.args = {
  options: singleOption('blue'),
  buttonContent: 'Open Popover',
  tippyProps: {
    appendTo: document.body,
  },
}
SingleConfirmationBlue.storyName = 'Single Confirmation - Blue'

export const SingleConfirmationRed = Template.bind({})
SingleConfirmationRed.args = {
  options: singleOption('red'),
  buttonContent: 'Open Popover',
  tippyProps: {
    appendTo: document.body,
  },
}
SingleConfirmationRed.storyName = 'Single Confirmation - Red'

export const SingleConfirmationTextRed = Template.bind({})
SingleConfirmationTextRed.args = {
  styleType: 'text-red',
  options: singleOption('red'),
  buttonContent: 'Open Popover',
  tippyProps: {
    appendTo: document.body,
  },
}
SingleConfirmationTextRed.storyName = 'Single Confirmation - Text Red'

export const SingleConfirmationTextBlue = Template.bind({})
SingleConfirmationTextBlue.args = {
  styleType: 'text-blue',
  options: singleOption('blue'),
  buttonContent: 'Open Popover',
  tippyProps: {
    appendTo: document.body,
  },
}
SingleConfirmationTextBlue.storyName = 'Single Confirmation - Text Blue'
