import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../../.storybook'
import Tabs from './Tabs'
import { TabItemProps } from './Desktop/Tab'

export default {
  title: 'Components/Tabs/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => {
  return (
    <div
      style={{
        ...(args.equalWidth ? { width: '400px' } : {}),
      }}
    >
      <Tabs {...args} />
    </div>
  )
}

const tabsArr = [
  {
    id: 0,
    tabName: 'First',
    content: 'First tab content',
  },
  {
    id: 1,
    tabName: 'Second',
    content: 'Second tab content',
  },
  {
    id: 2,
    tabName: 'Third',
    content: 'Third tab content',
  },
]

const tabsWithPills = [
  {
    id: 0,
    tabName: 'First',
    content: 'First tab content',
    tag: 5,
  },
  {
    id: 1,
    tabName: 'Second',
    content: 'Second tab content',
    tag: 50,
  },
  {
    id: 2,
    tabName: 'Third',
    content: 'Third tab content',
    tag: 500,
  },
]

export const basic = Template.bind({})
basic.args = {
  tabs: tabsArr,
  active: 0,
}

export const subTabs = Template.bind({})
subTabs.args = {
  tabs: tabsArr,
  subtabs: true,
}

export const equalWidthTabs = Template.bind({})
equalWidthTabs.args = {
  tabs: tabsArr,
  equalWidth: true,
}

export const tabsWithPill = Template.bind({})
tabsWithPill.args = {
  tabs: tabsWithPills,
  active: 0,
}

export const subTabsWithPill = Template.bind({})
subTabsWithPill.args = {
  tabs: tabsWithPills,
  subtabs: true,
}

const TemplateTabsWithSubtabs: ComponentStory<typeof Tabs> = (args) => {
  return (
    <div>
      <Tabs {...args} />
    </div>
  )
}

const subTabGeneric = () => {
  const array: Array<TabItemProps> = []
  for (let i = 1; i <= 3; i++) {
    array.push({
      tabName: `Subtab ${i}`,
      id: 10 + i,
    })
  }
  return array
}

const tabsWithSubtabsArr = [
  {
    id: 0,
    tabName: 'First',
    content: <Tabs tabs={subTabGeneric()} subtabs />,
    subrows: [
      {
        tabName: 'Subtab 1',
        content: 'This is the content for Subtab 1',
        id: 11,
      },
      {
        tabName: 'Subtab 2',
        content: 'This is the content for Subtab 2',
        id: 12,
      },
      {
        tabName: 'Subtab 3',
        content: 'This is the content for Subtab 3',
        id: 13,
      },
    ],
  },
  {
    id: 1,
    tabName: 'Second',
    content: 'Second tab content',
  },
  {
    id: 2,
    tabName: 'Third',
    content: 'Third tab content',
  },
]

export const tabsWithSubtabs = TemplateTabsWithSubtabs.bind({})
tabsWithSubtabs.args = {
  tabs: tabsWithSubtabsArr,
}
