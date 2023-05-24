import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { Button, SideDrawer, FormButtons, toast } from '../../module'

export default {
  title: 'Components/SideDrawer',
  component: SideDrawer,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description={
            <span>
              The <code>SideDrawer</code> should be used to contain all forms
              that were previously handled in popovers. These drawers can be
              used for information, help, and will be in place of popovers that
              are otherwise too large to comfortably fit the screen.
            </span>
          }
          whenToUse={[
            'Many instances of forms that could comfortably fit in a drawer. These would not include very large forms that may need their own page.',
            'In mobile when the popover content cannot easily fit on the screen.',
          ]}
        />
      ),
    },
  },
} as ComponentMeta<typeof SideDrawer>

const PopoverTemplate: ComponentStory<typeof SideDrawer> = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className='flex flex-direction-column align-items center'>
        <Button onClick={toggleDrawer}>Open Side Drawer</Button>
        {args.onlyMobile && (
          <div className='mt-8 fs-12'>
            Resize screen to a mobile view to see the drawer.
          </div>
        )}
      </div>
      <SideDrawer {...args} isOpen={isOpen} closeCallout={toggleDrawer}>
        {args.children ? args.children : <p> Side Drawer Content Goes here</p>}
      </SideDrawer>
    </>
  )
}

export const basic = PopoverTemplate.bind({})
basic.args = {
  headerContent: 'Basic Side Drawer',
}

export const large = PopoverTemplate.bind({})
large.args = {
  headerContent: 'Large Side Drawer',
  size: 'lg',
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

export const footerContent = PopoverTemplate.bind({})
footerContent.args = {
  headerContent: 'Footer Content',
  footerContent: (
    <FormButtons
      resetButtonProps={resetButtonProps}
      cancelButtonProps={cancelButtonProps}
      saveButtonProps={saveButtonProps}
    />
  ),
}

const overflowDummyData = (
  <div>
    {Array.from(Array(40)).map((_, index) => (
      <div className='mb-16' key={index}>
        Body overflow example. Scroll down.
      </div>
    ))}
  </div>
)

export const bodyOverflow = PopoverTemplate.bind({})
bodyOverflow.args = {
  headerContent: 'Body Overflow',
  children: overflowDummyData,
}

export const bodyOverflowWithFooter = PopoverTemplate.bind({})
bodyOverflowWithFooter.args = {
  headerContent: 'Body Overflow With Footer',
  children: overflowDummyData,
  footerContent: (
    <FormButtons
      resetButtonProps={resetButtonProps}
      cancelButtonProps={cancelButtonProps}
      saveButtonProps={{ ...saveButtonProps, children: 'Save Changes' }}
    />
  ),
}

export const withStepper = PopoverTemplate.bind({})
withStepper.args = {
  headerContent: 'With Stepper',
  stepperProps: {
    steps: ['Step 1', 'Step 2', 'Step 3'],
    currentStep: 2,
    callout: () => {
      return
    },
  },
  children: overflowDummyData,
  footerContent: (
    <FormButtons
      resetButtonProps={resetButtonProps}
      cancelButtonProps={cancelButtonProps}
      saveButtonProps={saveButtonProps}
    />
  ),
}

export const onlyMobileVisible = PopoverTemplate.bind({})
onlyMobileVisible.args = {
  headerContent: 'Mobile Only',
  onlyMobile: true,
}
