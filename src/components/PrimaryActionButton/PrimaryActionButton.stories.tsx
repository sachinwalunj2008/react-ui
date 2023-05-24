import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import PrimaryActionButton from './PrimaryActionButton'
import { Button } from '../Button/Button'

export default {
  title: 'Components/PrimaryActionButton',
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

const actions = [
  {
    displayText: 'Action 1',
    handleClick: () => console.log('Action 1 clicked'),
    icon: 'pencil',
    disabled: false,
  },
  {
    displayText: 'Action 2',
    handleClick: () => console.log('Action 2 clicked'),
    icon: 'plus',
    disabled: true,
  },
  {
    icon: 'download',
    csv: {
      linkName: 'Download',
      csvName: 'In Stock Protection Optimization',
      csvFormat: {
        api: () => console.log('api call'),
        callout: () => console.log('callout'),
        params: {},
      },
    },
  },
]

export const menuButton = Template.bind({})
menuButton.args = {
  buttonText: 'Main Action',
  actions: actions,
  mainActionCallout: () => console.log('Main button clicked'),
  disableMainButton: false,
  disableSecondaryButton: false,
}
menuButton.storyName = 'Menu Button'

export const button = Template.bind({})
button.args = {
  buttonText: 'Main Action',
  mainActionCallout: () => console.log('Main button clicked'),
  disableMainButton: false,
}

export const menuButtonAsPopover = Template.bind({})
menuButtonAsPopover.args = {
  buttonText: 'Menu Button with Popover',
  actions: actions,
  mainActionCallout: () => console.log('Main button clicked'),
  disableMainButton: false,
  disableSecondaryButton: false,
  mainButtonType: 'popover',
  children: ({ close }) => (
    <div className='flex flex-direction-column'>
      <Button as='unstyled' key={`popover-action-1`} onClick={() => close()}>
        Action 1
      </Button>
      <Button as='unstyled' key={`popover-action-2`} onClick={() => close()}>
        Action 2
      </Button>
    </div>
  ),
}
