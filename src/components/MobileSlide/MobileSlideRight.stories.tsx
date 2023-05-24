import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import MobileSlideRight from './MobileSlideRight'
import { useMediaQuery, Icon, Button } from '../../module'

export default {
  title: 'Components/MobileSlideRight',
  component: MobileSlideRight,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof MobileSlideRight>

const MobileFilterWrapper = (args): JSX.Element => {
  const [showComponent, setShowComponent] = useState(false)

  const showComponentFn = () => {
    setShowComponent(true)
  }
  const isMobileView = useMediaQuery({ type: 'max', breakpoint: 'md' })

  useEffect(() => {
    if (!isMobileView) {
      setShowComponent(false)
    }
  }, [isMobileView])

  return isMobileView ? (
    <>
      {!showComponent && (
        <Button as='unstyled' onClick={showComponentFn}>
          <Icon icon='hamburger' />
        </Button>
      )}
      {showComponent && <MobileSlideRight {...args} />}
    </>
  ) : (
    <h2>
      This view is available when the viewport is &lt; 768px. Please resize the
      screen to see the mobile MobileSlideRight.
    </h2>
  )
}

const Template: ComponentStory<typeof MobileSlideRight> = (args) => (
  <MobileFilterWrapper {...args} />
)

export const mobileSlideRight = Template.bind({})
mobileSlideRight.args = {
  close: () => null,
  header: <span>Header</span>,
  content: [
    {
      page: 'Page 1',
      link: '/',
    },
    {
      page: 'Page 2',
      link: '/',
    },
    {
      page: 'Page 3',
      link: '/',
    },
    {
      page: 'Page 4',
      link: '/',
    },
  ],
  sidebarFooter: () => {
    //function to return jsx
    return <p>Footer content</p>
  },
}
mobileSlideRight.storyName = 'MobileSlideRight'
