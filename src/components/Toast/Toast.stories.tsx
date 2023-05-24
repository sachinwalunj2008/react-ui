import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { DocsTemplate } from '../../../.storybook'
import { Button } from '../../module'
import PatternToastContainer from './PatternToastContainer'
import { toast, ToastProps } from './Toast'

export default {
  title: 'Components/Toast',
  component: PatternToastContainer,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description="Toasts display short feedback consisting of a confirmation message that appears as a result of the user's action. Toasts can auto dismiss. They float above everything else on the page."
          whenToUse={[
            <span key='first-line'>
              The <strong>information</strong> variant should provide additional
              information to the user in regards to the current context or
              action they are about to take.
            </span>,
            <span key='second-line'>
              The <strong>success</strong> variant should reaffirm to the user
              that a prior action they have taken, often in a different location
              within the application, has been successful.
            </span>,
            <span key='third-line'>
              The <strong>warning</strong> variant should be used to display
              cautious information that may need the user's attention but may
              not be critical.
            </span>,
            <span key='fourth-line'>
              The <strong>error</strong> variant should be used to alert the
              user about an error in the current/prior context that needs
              immediate attention.
            </span>,
          ]}
        />
      ),
    },
  },
  argTypes: {
    type: {
      options: ['success', 'error', 'warning', 'info'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof PatternToastContainer>

const ToastStoryComponent = ({ type, message }: ToastProps): JSX.Element => {
  return <>{toast({ type, message })}</>
}

const Template: ComponentStory<typeof ToastStoryComponent> = (args) => {
  const colorMap = {
    error: 'primary-red',
    success: 'primary-green',
    warning: 'secondary',
    info: 'primary-blue',
  } as const

  return (
    <Button
      styleType={colorMap[args.type]}
      onClick={() =>
        toast({
          type: args.type,
          message: args.message,
          buttons: args.buttons,
        })
      }
    >
      Show Toast
    </Button>
  )
}

export const success = Template.bind({})
success.args = {
  type: 'success',
  message: 'This is the toast message! It is awesome.',
}

export const error = Template.bind({})
error.args = {
  type: 'error',
  message: 'This is the error toast message!',
}

export const warning = Template.bind({})
warning.args = {
  type: 'warning',
  message: 'This is the warning toast message!',
}

export const info = Template.bind({})
info.args = {
  type: 'info',
  message: 'This is the info toast message!',
}

const buttons = [
  {
    children: 'Button 1',
    onClick: () => {
      toast({ message: 'You clicked the button!', type: 'success' })
    },
  },
  {
    children: 'Button 2',
    onClick: () => {
      toast({ message: 'You clicked the button!', type: 'success' })
    },
  },
]

export const successWithButtons = Template.bind({})
successWithButtons.args = {
  type: 'success',
  message: 'This is the success toast message!',
  buttons,
}

export const errorWithButtons = Template.bind({})
errorWithButtons.args = {
  type: 'error',
  message: 'This is the error toast message!',
  buttons,
}

export const warningWithButtons = Template.bind({})
warningWithButtons.args = {
  type: 'warning',
  message: 'This is the warning toast message!',
  buttons,
}

export const infoWithButtons = Template.bind({})
infoWithButtons.args = {
  type: 'info',
  message: 'This is the info toast message!',
  buttons,
}
