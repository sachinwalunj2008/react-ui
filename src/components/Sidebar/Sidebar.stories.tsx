import Sidebar from './Sidebar'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { DocsTemplate } from '../../../.storybook'
import Tippy from '@tippyjs/react'

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Sidebar>

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />

const SideBarContent = (
  <div className='mb-16'>
    <div className='fs-20 mb-8'>Sidebar</div>
    <div className='fs-12'>Content 1</div>
    <div className='fs-12'>Content 2</div>
    <div className='fs-12'>Content 3</div>
  </div>
)

export const DefaultSidebar = Template.bind({})
DefaultSidebar.args = {
  children: SideBarContent,
  updatePage: (page) => {
    return
  },
  content: [
    {
      firstBottomLink: true,
      bottomLink: true,
      link: '',
    },
  ],
  showMobileMenu: true,
}
DefaultSidebar.storyName = 'DefaultSidebar'

export const SidebarWithFooter = Template.bind({})
SidebarWithFooter.args = {
  children: SideBarContent,
  updatePage: (page) => {
    return
  },
  content: [
    {
      firstBottomLink: true,
      bottomLink: true,
      link: '',
    },
  ],
  sidebarFooter: ({ toggleSidebar, updateActiveBar }) => (
    <Tippy
      className='fc-dark-purple pb-16'
      placement='bottom'
      delay={[100, null]}
      trigger='click'
      appendTo={document.body}
      content={<>This is the content</>}
    >
      <span className='fs-10'>Popover Content</span>
    </Tippy>
  ),
}
SidebarWithFooter.storyName = 'Sidebar with Footer'
