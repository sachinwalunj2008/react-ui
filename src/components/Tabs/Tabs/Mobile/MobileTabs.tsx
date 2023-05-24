import React, { useEffect, useState } from 'react'
import {
  PopoverAndMobileDrawer,
  usePopoverAndMobileDrawer,
} from '../../../Popover/PopoverAndMobileDrawer'
import { TabsProps } from '../Tabs'
import styles from '../../MobileTabs/_mobile-tabs.module.scss'
import popoverStyles from '../../../SideDrawer/MobileSideDrawerOptions/_mobile-side-drawer-options.module.scss'
import Icon from '../../../Icons/Icon'
import { Button } from '../../../Button/Button'

type MobileTabsProps = TabsProps & {
  activeTabId: number
}

const MobileTabs = ({
  tabs,
  activeTabId,
  callout,
}: MobileTabsProps): JSX.Element => {
  const [display, setDisplay] = useState<string>(tabs[0].tabName),
    [content, setContent] = useState<string | JSX.Element>()

  useEffect(() => {
    tabs.forEach((tab) => {
      if (tab.id === activeTabId && !tab.subrows) {
        setDisplay(tab.tabName)
        setContent(tab.content)
      } else if (tab.subrows) {
        if (tab.id === activeTabId) {
          setDisplay(`${tab.tabName} > ${tab.subrows[0].tabName}`)
          setContent(tab.subrows[0].tabName)
          callout?.(tab.subrows[0].id)
        } else {
          tab.subrows.forEach((sub) => {
            if (sub.id === activeTabId) {
              setDisplay(`${tab.tabName} > ${sub.tabName}`)
              setContent(sub.content)
            }
          })
        }
      }
    })
  }, [tabs, activeTabId, callout])

  return (
    <div>
      <PopoverAndMobileDrawer
        content={
          <TabOptions tabs={tabs} active={activeTabId} callout={callout} />
        }
        toggleClassName={styles.selectContainer}
        sideDrawerProps={{
          headerContent: 'Select a Tab',
        }}
      >
        <div className={styles.mobileTabsSelect}>
          <span>{display}</span>
          <Icon icon='carat' size='10px' customClass={styles.iconColor} />
        </div>
      </PopoverAndMobileDrawer>
      {content && <div className={styles.tabContent}>{content}</div>}
    </div>
  )
}

export default MobileTabs

const TabOptions = ({ tabs, callout, active }: TabsProps): JSX.Element => {
  const { closePopoverOrDrawer } = usePopoverAndMobileDrawer()

  const updateTab = (tabId: number) => {
    callout?.(tabId)
    closePopoverOrDrawer()
  }

  return (
    <div>
      {tabs.map((tab) => (
        <>
          <div key={tab.id}>
            <Button
              as='unstyled'
              onClick={() => {
                updateTab(tab.id)
              }}
              className={popoverStyles.mobileRowContainer}
            >
              <div
                className={`${popoverStyles.optionRow} ${
                  active === tab.id ? popoverStyles.activeMobileRow : ''
                }`}
              >
                {tab.tabName}
              </div>
            </Button>
          </div>
          {tab.subrows &&
            tab.subrows.map((s) => (
              <div key={s.tabName}>
                <Button
                  as='unstyled'
                  onClick={() => updateTab(s.id)}
                  className={popoverStyles.mobileRowContainer}
                >
                  <div
                    className={`${popoverStyles.verticalPadding} ${
                      popoverStyles.horizontalPadding
                    } ${active === s.id ? popoverStyles.activeMobileRow : ''}
                    `}
                  >
                    <div className={popoverStyles.subrowOptionIcon}>
                      <Icon
                        icon='l'
                        customClass={popoverStyles.iconL}
                        size='6px'
                      />
                      {s.tabName}
                    </div>
                  </div>
                </Button>
              </div>
            ))}
        </>
      ))}
    </div>
  )
}
