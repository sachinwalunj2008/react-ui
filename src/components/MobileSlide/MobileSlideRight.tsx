import React from 'react'
import { Sidebar } from '../../module'

type SidebarProps = React.ComponentProps<typeof Sidebar>

type MobileSlideRightProps = {
  /** Callout function to close Sidebar and receive selected options from Sidebar */
  close: () => void
  /** Contents that you need to show in Sidebar options */
  content: SidebarProps['content']
  /** Footer content for Sidebar */
  sidebarFooter: SidebarProps['sidebarFooter']
  /** Children to show in Sidebar */
  header: React.ReactNode
  /** Boolean to decide whether to show options from bottom */
  startAtBottom?: boolean
}

const MobileSlideRight = ({
  close,
  content,
  startAtBottom,
  sidebarFooter,
  header,
}: MobileSlideRightProps): JSX.Element => {
  return (
    <div className='mobile-slide animated slideInRight'>
      <Sidebar
        content={content}
        updatePage={close}
        sidebarFooter={sidebarFooter}
        startAtBottom={startAtBottom}
        activeIdentifier='.mobile-slide .sidebar a.active'
        toggleDisabled
        showMobileMenu
      >
        {header}
      </Sidebar>
    </div>
  )
}

export default MobileSlideRight
