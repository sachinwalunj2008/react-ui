import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from './Button'
import MenuButton from './MenuButton'
import { DocsTemplate } from '../../../.storybook'

export default {
  title: 'Components/MenuButton',
  component: MenuButton,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof MenuButton>

const Template: ComponentStory<typeof MenuButton> = (args) => (
  <MenuButton {...args} />
)

const renderActionPopover = (close) => (
  <div className='flex flex-direction-column'>
    <Button as='unstyled' key={`popover-action-1`} onClick={() => close()}>
      Action 1
    </Button>
    <Button as='unstyled' key={`popover-action-2`} onClick={() => close()}>
      Action 2
    </Button>
  </div>
)

const renderMenuActions = (close) => (
  <div className='flex flex-direction-column'>
    <Button
      as='unstyled'
      onClick={close}
      disabled
      tooltip={{
        tooltipContent: (
          <span>Tooltip will appear when action is disabled</span>
        ),
      }}
    >
      Action 1
    </Button>
    <Button as='unstyled' onClick={close}>
      Action 2
    </Button>
  </div>
)

export const secondary = Template.bind({})
secondary.args = {
  styleType: 'secondary',
  mainButtonText: 'Secondary',
  actionPopoverElement: ({ close }) => renderActionPopover(close),
  children: ({ close }) => renderActionPopover(close),
}

export const primaryGreen = Template.bind({})
primaryGreen.args = {
  styleType: 'primary-green',
  mainButtonText: 'Primary Green',
  actionPopoverElement: ({ close }) => renderActionPopover(close),
  children: ({ close }) => renderActionPopover(close),
}
primaryGreen.storyName = 'Primary Green'

export const primaryBlue = Template.bind({})
primaryBlue.args = {
  styleType: 'primary-blue',
  mainButtonText: 'Primary Blue',
  actionPopoverElement: ({ close }) => renderActionPopover(close),
  children: ({ close }) => renderActionPopover(close),
}

export const primaryRed = Template.bind({})
primaryRed.args = {
  styleType: 'primary-red',
  mainButtonText: 'Primary Red',
  actionPopoverElement: ({ close }) => renderActionPopover(close),
  children: ({ close }) => renderActionPopover(close),
}

export const actionButtonDisabled = Template.bind({})
actionButtonDisabled.args = {
  styleType: 'primary-green',
  mainButtonText: 'Primary Green',
  actionPopoverElement: ({ close }) => renderActionPopover(close),
  children: ({ close }) => renderActionPopover(close),
  disabledActionButton: true,
}

export const mainButtonDisabled = Template.bind({})
mainButtonDisabled.args = {
  styleType: 'primary-green',
  mainButtonText: 'Primary Green',
  actionPopoverElement: ({ close }) => renderActionPopover(close),
  children: ({ close }) => renderActionPopover(close),
  disabledMainButton: true,
}

export const disabledMenuButton = Template.bind({})
disabledMenuButton.args = {
  styleType: 'primary-green',
  mainButtonText: 'Primary Green',
  actionPopoverElement: ({ close }) => renderActionPopover(close),
  children: ({ close }) => renderActionPopover(close),
  disabledMainButton: true,
  disabledActionButton: true,
}

export const disabledMainButtonWithTooltip = Template.bind({})
disabledMainButtonWithTooltip.args = {
  styleType: 'primary-green',
  mainButtonText: 'Primary Green',
  actionPopoverElement: ({ close }) => renderActionPopover(close),
  children: ({ close }) => renderActionPopover(close),
  disabledMainButton: true,
  mainButtonType: 'popover',
  mainButtonTooltip: {
    tooltipContent: (
      <span>Tooltip will appear when main button is disabled</span>
    ),
    position: 'top',
  },
}

export const mainButtonAsPopover = Template.bind({})
mainButtonAsPopover.args = {
  styleType: 'secondary',
  mainButtonText: 'Secondary',
  actionPopoverElement: ({ close }) => renderActionPopover(close),
  mainButtonType: 'popover',
  children: ({ close }) => renderActionPopover(close),
}

export const disabledMenuActionsWithTooltip = Template.bind({})
disabledMenuActionsWithTooltip.args = {
  styleType: 'secondary',
  mainButtonText: 'Primary Green',
  actionPopoverElement: ({ close }) => renderMenuActions(close),
  mainButtonType: 'popover',
  children: ({ close }) => renderMenuActions(close),
}
