import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import CustomDisplay from './CustomDisplay'

export default {
  title: '[DEPRECATED]/Components/CustomDisplay',
  component: CustomDisplay,
  parameters: {
    docs: {
      page: () => <DocsTemplate deprecated />,
    },
  },
} as ComponentMeta<typeof CustomDisplay>

const Template: ComponentStory<typeof CustomDisplay> = (args) => (
  <CustomDisplay {...args} />
)

export const customDisplay = Template.bind({})
customDisplay.args = {
  totalDisplayList: ['Ad Sales', 'Clicks', 'Roas'],
  selectedDisplayList: ['Clicks'],
  customSelectionCallout: () => {
    //retrieve selection list and update selected list in your repository
  },
  headerText: 'Add Or Remove Columns',
}
