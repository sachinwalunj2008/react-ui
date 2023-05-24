import React from 'react'
import { Button, Pill } from '../../../../module'
import styles from './_tabs.module.scss'

export type TabItemProps = {
  id: number
  tabName: string
  tag?: number
  subtabs?: boolean
  content?: string | JSX.Element
  subrows?: Array<{
    id: number
    tabName: string
    content?: string | JSX.Element
  }>
}

type TabProps = {
  tab: TabItemProps
  active: boolean
  subtabs?: boolean
  onTabClick: () => void
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  (
    { tab, active, onTabClick, subtabs }: TabProps,
    ref: React.ForwardedRef<HTMLLIElement>
  ) => {
    return (
      <li
        ref={ref}
        className={`${styles.singleTab} ${active ? styles.active : ''} ${
          tab.tag ? styles.withPill : ''
        }`}
        data-text={tab.tabName}
      >
        <Button as='unstyled' className={styles.tab} onClick={onTabClick}>
          <span className={styles.tabText}>{tab.tabName}</span>
          {tab.tag && (
            <Pill
              color={
                active ? (subtabs ? 'dark-purple' : 'purple') : 'medium-purple'
              }
              number={tab.tag}
            />
          )}
        </Button>
      </li>
    )
  }
)

export default Tab
