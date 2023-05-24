import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import PrimaryActionButton from './PrimaryActionButton'
import { toast } from '../Toast/Toast'

export default {
  title: 'Components/PrimaryActionButton/PopoverWithConfirmation',
  component: PrimaryActionButton,
  parameters: {
    docs: {
      // TODO: update description when problem is fixed
      page: () => (
        <DocsTemplate description='Need to find solution for the overlapping button issue. Check the canvas to see it better.' />
      ),
    },
    controls: { sort: 'requiredFirst' },
  },
} as ComponentMeta<typeof PrimaryActionButton>

const Template: ComponentStory<typeof PrimaryActionButton> = (args) => (
  <PrimaryActionButton {...args} />
)

export const buttonAsConfirmation = Template.bind({})
buttonAsConfirmation.args = {
  buttonText: 'Button with Confirmation',
  mainConfirmation: {
    confirmation: {
      header: 'Are you sure?',
      body: 'This user will no longer have access to Amplifi. Are you sure you want to continue?',
      type: 'red',
      confirmButtonText: 'Confirm',
      confirmCallout: () => {
        toast({
          type: 'success',
          message: 'Main button clicked',
        })
      },
    },
  },
  disableMainButton: false,
  disableSecondaryButton: false,
  mainButtonPopoverClassName: 'no-padding',
}

export const menuButtonAsConfirmation = Template.bind({})
menuButtonAsConfirmation.args = {
  buttonText: 'Button with Confirmation',
  actions: [
    {
      displayText: 'Edit Profile',
      icon: 'pencil',
      confirmation: {
        header: 'Are you sure?',
        body: 'This user will no longer have access to Amplifi. Are you sure you want to continue?',
        type: 'red',
        confirmButtonText: 'Activate User',
        confirmCallout: () => {
          toast({
            type: 'success',
            message: 'Edit Profile Confirm clicked',
          })
        },
      },
    },
    {
      displayText: 'Another Option',
      icon: 'info',
      confirmation: {
        header: 'Are you sure?',
        body: 'This is a great idea, but are you sure you want to continue?',
        type: 'green',
        confirmButtonText: 'Confirm',
        confirmCallout: () => {
          toast({
            type: 'success',
            message: 'Another Option Confirm clicked',
          })
        },
      },
    },
    {
      displayText: 'Send Password Reset',
      icon: 'paperPlane',
      handleClick: () => {
        toast({
          type: 'success',
          message: 'Send Password Reset Confirm clicked',
        })
      },
    },
  ],
  mainConfirmation: {
    confirmation: {
      header: 'Are you sure?',
      body: 'This user will no longer have access to Amplifi. Are you sure you want to continue?',
      type: 'red',
      confirmButtonText: 'Confirm',
      confirmCallout: () => {
        toast({
          type: 'success',
          message: 'Main button clicked',
        })
      },
    },
  },
  disableMainButton: false,
  disableSecondaryButton: false,
  mainButtonPopoverClassName: 'no-padding',
}
