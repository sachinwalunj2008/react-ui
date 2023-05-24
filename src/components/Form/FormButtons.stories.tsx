import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { FormButtons, toast, Button } from '../../module'

export default {
  title: 'Components/FormComponents/FormButtons',
  component: FormButtons,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate description='This component should be used as actions for a form. The most common implementation for this would be in the footer of a SideDrawer.' />
      ),
    },
  },
} as ComponentMeta<typeof FormButtons>

const PopoverTemplate: ComponentStory<typeof FormButtons> = (args) => {
  return (
    <div style={{ width: '500px' }}>
      <FormButtons {...args} />
    </div>
  )
}

const resetButtonProps = {
    onClick: () => {
      toast({
        type: 'success',
        message: 'You clicked the Reset button!',
      })
    },
  },
  cancelButtonProps = {
    onClick: () => {
      toast({
        type: 'success',
        message: 'You clicked the Cancel button!',
      })
    },
  },
  saveButtonProps = {
    onClick: () => {
      toast({
        type: 'success',
        message: 'You clicked the Save button!',
      })
    },
  }

export const basic = PopoverTemplate.bind({})
basic.args = {
  resetButtonProps,
  cancelButtonProps,
  saveButtonProps,
}

export const noResetButton = PopoverTemplate.bind({})
noResetButton.args = {
  cancelButtonProps,
  saveButtonProps,
}

export const disabledButtons = PopoverTemplate.bind({})
disabledButtons.args = {
  resetButtonProps: {
    ...resetButtonProps,
    disabled: true,
  },
  cancelButtonProps: {
    ...cancelButtonProps,
    disabled: true,
  },
  saveButtonProps: {
    ...saveButtonProps,
    disabled: true,
  },
}

export const customText = PopoverTemplate.bind({})
customText.args = {
  resetButtonProps: {
    ...resetButtonProps,
    children: 'Reset Form',
  },
  cancelButtonProps: {
    ...cancelButtonProps,
    children: 'Cancel Everything',
  },
  saveButtonProps: {
    ...saveButtonProps,
    children: 'Save Changes',
  },
}

export const saveConfirmationSingle = PopoverTemplate.bind({})
saveConfirmationSingle.args = {
  resetButtonProps,
  cancelButtonProps,
  saveButtonProps: {
    popoverWithConfirmationProps: {
      tippyPlacement: 'right',
      options: [
        {
          name: 'confirmation-action',
          confirmation: {
            type: 'green',
            header: 'Are you sure?',
            body: 'This will perform some action. Would you like to continue?',
            confirmCallout: () => {
              toast({ message: 'You did it!', type: 'success' })
            },
          },
        },
      ],
    },
  },
}
saveConfirmationSingle.storyName = 'Save Confirmation - Single'

export const saveConfirmationMultiple = PopoverTemplate.bind({})
saveConfirmationMultiple.args = {
  resetButtonProps,
  cancelButtonProps,
  saveButtonProps: {
    popoverWithConfirmationProps: {
      tippyPlacement: 'top',
      options: [
        {
          name: 'confirmation-action',
          children: ({ show }: { show: (name: string) => void }) => (
            <Button as='unstyled' onClick={() => show('confirmation-action')}>
              Action Option
            </Button>
          ),
          confirmation: {
            type: 'green',
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
            <Button
              as='unstyled'
              onClick={() => console.log('Option 2 clicked')}
            >
              Option 2
            </Button>
          ),
        },
        {
          name: 'option3',
          children: () => (
            <Button
              as='unstyled'
              onClick={() => console.log('Option 3 clicked')}
            >
              Option 3
            </Button>
          ),
        },
      ],
    },
  },
}
saveConfirmationMultiple.storyName = 'Save Confirmation - Multiple'
