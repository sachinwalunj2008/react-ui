import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { DocsTemplate } from '../../../.storybook'
import { toast } from '../Toast/Toast'
import Alert from './Alert'

export default {
  title: 'Components/Alerts',
  component: Alert,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description='Alerts are system generated and contextual, and may appear without the user initiating an action. Alerts can be dismissable. Generally, they appear within the page section/container.'
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
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />

export const success = Template.bind({})
success.args = {
  type: 'success',
  text: 'This is an Alert!',
}

export const error = Template.bind({})
error.args = {
  type: 'error',
  text: 'This is an Alert!',
}

export const warning = Template.bind({})
warning.args = {
  type: 'warning',
  text: 'This is an Alert!',
}

export const info = Template.bind({})
info.args = {
  type: 'info',
  text: 'This is an Alert!',
}

export const infoWithClose = Template.bind({})
infoWithClose.args = {
  type: 'info',
  text: 'This is an Alert!',
  close: {
    show: true,
    callout: () => {
      toast({ message: 'You clicked the close button!', type: 'info' })
    },
  },
}

export const closeSuccessConfirmation = Template.bind({})
closeSuccessConfirmation.args = {
  type: 'info',
  text: 'This is an Alert!',
  close: {
    show: true,
    callout: () => {
      toast({ message: 'You clicked the close button!', type: 'info' })
    },
    confirmation: {
      type: 'green',
      header: 'Are you sure?',
      body: 'This will perform some action. Would you like to continue?',
      confirmCallout: () => {
        toast({ message: 'You did it!', type: 'success' })
      },
    },
  },
}

export const closeErrorConfirmation = Template.bind({})
closeErrorConfirmation.args = {
  type: 'info',
  text: 'This is an Alert!',
  close: {
    show: true,
    callout: () => {
      toast({ message: 'You clicked the close button!', type: 'info' })
    },
    confirmation: {
      type: 'red',
      header: 'Are you sure?',
      body: 'This will perform some action. Would you like to continue?',
      confirmCallout: () => {
        toast({ message: 'You did it!', type: 'success' })
      },
    },
  },
}

export const closeInfoConfirmation = Template.bind({})
closeInfoConfirmation.args = {
  type: 'info',
  text: 'This is an Alert!',
  close: {
    show: true,
    callout: () => {
      toast({ message: 'You clicked the close button!', type: 'info' })
    },
    confirmation: {
      type: 'blue',
      header: 'Are you sure?',
      body: 'This will perform some action. Would you like to continue?',
      confirmCallout: () => {
        toast({ message: 'You did it!', type: 'success' })
      },
    },
  },
}

const buttons = [
  {
    as: 'link',
    to: '/',
    children: 'Link Button',
  },
  {
    children: 'Button',
    onClick: () => {
      toast({ message: 'You clicked the button!', type: 'success' })
    },
  },
]

export const ButtonsAndClose = Template.bind({})
ButtonsAndClose.args = {
  type: 'success',
  text: 'This is an Alert!',
  buttons,
  close: {
    show: true,
    callout: () => {
      toast({ message: 'You clicked the close button!', type: 'info' })
    },
  },
}

export const successWithButtons = Template.bind({})
successWithButtons.args = {
  type: 'success',
  text: 'This is an Alert!',
  buttons,
}

export const errorWithButtons = Template.bind({})
errorWithButtons.args = {
  type: 'error',
  text: 'This is an Alert!',
  buttons,
}

export const warningWithButtons = Template.bind({})
warningWithButtons.args = {
  type: 'warning',
  text: 'This is an Alert!',
  buttons,
}

export const infoWithButtons = Template.bind({})
infoWithButtons.args = {
  type: 'info',
  text: 'This is an Alert!',
  buttons,
}
