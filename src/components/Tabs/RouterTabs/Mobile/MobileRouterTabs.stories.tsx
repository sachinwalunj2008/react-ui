import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import MobileRouterTabs from './MobileRouterTabs'
import { useMediaQuery } from '../../../../module'
import { useNavigate } from 'react-router-dom'

const Stories = {
  title: 'Components/Tabs/RouterTabs',
  component: MobileRouterTabs,
} as ComponentMeta<typeof MobileRouterTabs>

export default Stories

const MobileTabsWrapper = (): JSX.Element => {
  const isMobileView = useMediaQuery({ type: 'max', breakpoint: 'md' })
  const args = {
      mobileConfig: [
        {
          label: 'At A Glance',
          link: '/protect/at-a-glance',
        },
        {
          label: 'Buy Box',
          link: '/protect/buybox',
          subrows: [
            {
              label: 'Sellers',
              link: '/protect/buybox/sellers',
            },
            {
              label: 'Products',
              link: '/protect/buybox/products',
            },
            {
              label: 'Suppression',
              link: '/protect/buybox/suppression',
            },
          ],
        },
        {
          label: 'Compliance',
          link: '/protect/compliance',
          subrows: [
            {
              label: 'Sellers',
              link: '/protect/compliance/sellers',
            },
            {
              label: 'Products',
              link: '/protect/compliance/products',
            },
            {
              label: 'Marketplaces',
              link: '/protect/compliance/marketplaces',
            },
          ],
        },
        {
          label: 'Selective Distribution',
          link: '/protect/selective-distribution',
          subrows: [
            {
              label: 'Overview',
              link: '/protect/selective-distribution/overview',
            },
            {
              label: 'Not Authorized',
              link: '/protect/selective-distribution/not-authorized',
            },
            {
              label: 'In Progress',
              link: '/protect/selective-distribution/in-progress',
            },
            {
              label: 'Authorized & Not Compliant',
              link: '/protect/selective-distribution/not-compliant',
            },
            {
              label: 'Authorized',
              link: '/protect/selective-distribution/authorized',
            },
          ],
        },
      ],
    },
    navigate = useNavigate()

  return isMobileView ? (
    <MobileRouterTabs {...args} navigate={navigate} />
  ) : (
    <h2>
      Please check the mobile view by stretching sidebar panel to the right side
      for the referernce
    </h2>
  )
}

const Template: ComponentStory<typeof MobileRouterTabs> = () => (
  <MobileTabsWrapper />
)

export const Mobile = Template.bind({})
