import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../../.storybook'
import LineTooltip from './LineTooltip'

export default {
  title: 'Components/Tooltips/LineTooltip',
  component: LineTooltip,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description='NOTE: The styles here look bad because of how we implemented styles initially for this component. When used in Predict or Shelf, the styles work. We need to fix this and encapsulate the styles to this component and not tie them to the apps that use the library.'
          whenToUse={[
            'Used with recharts line graphs',
            'NOTE: This is only the content of the tooltip. It does not generate a tooltip.',
          ]}
        />
      ),
    },
  },
} as ComponentMeta<typeof LineTooltip>

const Template: ComponentStory<typeof LineTooltip> = (args) => (
  <LineTooltip {...args} />
)

const payload = [
  {
    dataKey: 'value_label_here',
    tooltipId: 1,
    value: 32,
  },
]

export const basic = Template.bind({})
basic.args = {
  active: true,
  label: '10-25-2022',
  payload,
}

export const withPrefix = Template.bind({})
withPrefix.args = {
  active: true,
  label: '10-25-2022',
  payload,
  prefix: '*@!',
}

export const withCurrencyPrefix = Template.bind({})
withCurrencyPrefix.args = {
  active: true,
  label: '10-25-2022',
  payload,
  prefix: '$',
}

export const withSuffix = Template.bind({})
withSuffix.args = {
  active: true,
  label: '10-25-2022',
  payload,
  prefix: '$',
  suffix: 'CAD',
}
