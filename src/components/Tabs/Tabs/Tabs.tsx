import React, { useEffect, useState } from 'react'
import { useMediaQuery, useToggle } from '../../../module'
import DesktopTabs from './Desktop/DesktopTabs'
import { TabItemProps } from './Desktop/Tab'
import MobileTabs from './Mobile/MobileTabs'

export type TabsProps = {
  /** Array of Tabs to display */
  tabs: Array<TabItemProps>
  /** Style the component with the subtabs design */
  subtabs?: boolean
  /** Determine the active tab */
  active?: number
  /** Optional identifier */
  customId?: string
  /** Optionally add a className to Tabs */
  customClass?: string
  /** Optionally force all tabs to be an equal width across the width of its container */
  equalWidth?: boolean
  /** Function to help set the active tab */
  callout?: (tabId: number) => void
}

const Tabs = (props: TabsProps): JSX.Element => {
  const isMobile = useMediaQuery({ type: 'max', breakpoint: 'md' }),
    isMobileTabsEnabled = useToggle('mobile_tabs'),
    { active, tabs, callout, subtabs } = props,
    [activeTabId, setActiveTabId] = useState<number>(
      active !== undefined ? active : tabs[0].id
    )

  const tabCallout = (tabId: number) => {
    setActiveTabId(tabId)
    callout?.(tabId)
  }

  useEffect(() => {
    if (active !== undefined) {
      setActiveTabId(active)
    }
  }, [active])

  if (isMobile && subtabs && isMobileTabsEnabled) {
    return <></>
  }

  if (isMobile && isMobileTabsEnabled) {
    return (
      <MobileTabs {...props} callout={tabCallout} activeTabId={activeTabId} />
    )
  }

  return (
    <DesktopTabs {...props} callout={tabCallout} activeTabId={activeTabId} />
  )
}

export default Tabs
