import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TabsProps } from '../Tabs'
import Tab from './Tab'
import styles from './_tabs.module.scss'

type DesktopTabsProps = TabsProps & {
  activeTabId: number
}

const DesktopTabs = ({
  tabs,
  subtabs,
  activeTabId,
  customId = '',
  customClass = '',
  equalWidth,
  callout,
}: DesktopTabsProps): JSX.Element => {
  // 27 is a magic number for the initial subtabHeight
  const defaultSubtabHeight = 27,
    [sizing, setSizing] = useState<SizingProps>({
      position: 0,
      width: 0,
      subtabHeight: defaultSubtabHeight,
    }),
    ulRef = useRef<HTMLUListElement>(null),
    tabRefs = useRef<Record<string, HTMLLIElement | null>>({}),
    availableTabIds = useMemo(() => tabs.map((tab) => tab.id), [tabs])

  const getTab = useCallback(
    (tabId: number) => tabRefs.current[tabKey(tabId, customId)],
    [customId]
  )

  const getTabWidth = useCallback(
    (tabId: number) => {
      const tab = getTab(tabId)
      return tab?.offsetWidth ?? 0
    },
    [getTab]
  )

  const getTabPosition = useCallback(
    (tabId: number) => {
      const firstTab = getTab(tabs[0].id),
        thisTab = getTab(tabId)

      return Math.round(
        (thisTab?.getBoundingClientRect().left ?? 0) -
          (firstTab?.getBoundingClientRect().left ?? 0)
      )
    },
    [getTab, tabs]
  )

  const getSubtabHeight = useCallback(
    (previousSubtabHeight: number) => {
      if (customId === undefined || ulRef.current === null)
        return previousSubtabHeight

      const calculatedHeight = Math.round(
        ulRef.current.getBoundingClientRect().height
      )
      // Magically add 4 to the calculatedHeight for subtabHeight per past implementations/the designs
      return calculatedHeight + 4
    },
    [customId]
  )

  const updateSizing = useCallback(
    (tabId: number) => {
      setSizing((prevProps) => ({
        width: getTabWidth(tabId),
        position: getTabPosition(tabId),
        subtabHeight: getSubtabHeight(prevProps.subtabHeight),
      }))
    },
    [getSubtabHeight, getTabPosition, getTabWidth]
  )

  const changePage = (tabId: number) => {
    if (activeTabId !== tabId) callout?.(tabId)
    updateSizing(tabId)
    callout?.(tabId)
  }

  useEffect(() => {
    // 500ms is the magic number for the tab slideout animation
    const timeoutId = setTimeout(() => updateSizing(activeTabId), 500)
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [activeTabId, updateSizing])

  useEffect(() => {
    if (activeTabId !== undefined) {
      updateSizing(activeTabId)
    }
  }, [activeTabId, updateSizing])

  useEffect(() => {
    if (!availableTabIds.includes(activeTabId)) {
      callout?.(0)
    }
  }, [activeTabId, availableTabIds, callout, tabs])

  return (
    <div>
      <ul
        className={`${styles.tabsList} ${
          subtabs ? styles.tabsListSubtabs : ''
        } ${customClass} ${equalWidth ? styles.equalWidth : ''} ${customId}`}
        ref={ulRef}
      >
        {tabs.map((tab) => {
          const tKey = tabKey(tab.id, customId)
          return (
            <Tab
              key={tKey}
              ref={(element) => (tabRefs.current[tKey] = element)}
              tab={tab}
              onTabClick={() => changePage(tab.id)}
              active={activeTabId === tab.id}
              subtabs={subtabs}
            />
          )
        })}
      </ul>
      <div>
        <div
          className={`${styles.tabsBarBackground} ${
            subtabs ? styles.tabsBarBackgroundSubtabs : ''
          }`}
        >
          <div
            className={styles.tabsActiveBar}
            style={{
              left: sizing.position,
              width: `${sizing.width}px`,
              height: `${subtabs ? sizing.subtabHeight : 5}px`,
            }}
          />
        </div>
      </div>
      {tabs[activeTabId]?.content && (
        <div className={styles.tabContent}>{tabs[activeTabId].content}</div>
      )}
    </div>
  )
}

export default DesktopTabs

const tabKey = (tabId: number, customTabId: string) =>
  `tab-${tabId}-${customTabId}`

type SizingProps = {
  position: number
  width: number
  subtabHeight: number
}
