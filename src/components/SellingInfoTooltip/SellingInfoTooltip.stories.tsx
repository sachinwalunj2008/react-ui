import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import SellingInfoTooltip from './SellingInfoTooltip'

export default {
  title: '[Deprecated]/Components/SellingInfoTooltip',
  component: SellingInfoTooltip,
  parameters: {
    docs: {
      page: () => <DocsTemplate deprecated />,
    },
  },
} as ComponentMeta<typeof SellingInfoTooltip>

const Template: ComponentStory<typeof SellingInfoTooltip> = (args) => {
  return <SellingInfoTooltip {...args} />
}

export const basic = Template.bind({})
basic.args = {
  product: {
    sold_by_iserve: true,
    sold_by_pattern: false,
    sold_by_threepn: false,
  },
}

export const soldByAll = Template.bind({})
soldByAll.args = {
  product: {
    sold_by_iserve: true,
    sold_by_pattern: true,
    sold_by_threepn: true,
  },
}

export const soldByIserve = Template.bind({})
soldByIserve.args = {
  product: {
    sold_by_iserve: true,
    sold_by_pattern: false,
    sold_by_threepn: false,
  },
}
soldByIserve.storyName = 'Sold By iServe'

export const soldByPattern = Template.bind({})
soldByPattern.args = {
  product: {
    sold_by_iserve: false,
    sold_by_pattern: true,
    sold_by_threepn: false,
  },
}

export const soldBy3PN = Template.bind({})
soldBy3PN.args = {
  product: {
    sold_by_iserve: false,
    sold_by_pattern: false,
    sold_by_threepn: true,
  },
}
soldBy3PN.storyName = 'Sold By 3PN'

export const customIconSize = Template.bind({})
customIconSize.args = {
  product: {
    sold_by_iserve: true,
    sold_by_pattern: false,
    sold_by_threepn: false,
  },
  iconSize: '32px',
}

export const openTop = Template.bind({})
openTop.args = {
  product: {
    sold_by_iserve: true,
    sold_by_pattern: false,
    sold_by_threepn: false,
  },
  position: 'top',
}

export const openRight = Template.bind({})
openRight.args = {
  product: {
    sold_by_iserve: true,
    sold_by_pattern: false,
    sold_by_threepn: false,
  },
  position: 'right',
}

export const openBottom = Template.bind({})
openBottom.args = {
  product: {
    sold_by_iserve: true,
    sold_by_pattern: false,
    sold_by_threepn: false,
  },
  position: 'bottom',
}
