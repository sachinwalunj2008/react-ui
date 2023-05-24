import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../../.storybook'
import RouterTabs from './RouterTabs'
import { NavLink } from 'react-router-dom'

export default {
  title: 'Components/Tabs/RouterTabs',
  component: RouterTabs,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof RouterTabs>

const Template: ComponentStory<typeof RouterTabs> = (args) => (
  <RouterTabs {...args}>
    <NavLink to='/primary'>First</NavLink>
    <NavLink to='/second'>Second</NavLink>
    <NavLink to='/third'>Third</NavLink>
  </RouterTabs>
)

const mobileConfig = {
  mobileConfig: [
    {
      label: 'Link 1',
      link: '/link1-path',
    },
    {
      label: 'Link 2',
      link: '/link2-path',
      subrows: [
        {
          label: 'Sub Link 1',
          link: '/sublink1-path',
        },
        {
          label: 'Sub Link 2',
          link: '/sublink2-path',
        },
      ],
    },
  ],
}

export const basic = Template.bind({})
basic.args = {
  ...mobileConfig,
}

export const subTabs = Template.bind({})
subTabs.args = {
  subtabs: true,
  ...mobileConfig,
}
