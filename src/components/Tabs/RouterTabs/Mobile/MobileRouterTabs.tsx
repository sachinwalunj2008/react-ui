import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PopoverAndMobileDrawer, Icon } from '../../../../module'
import { RouteConfig } from '../RouterTabs'
import MobileTabsOptions, {
  MobileTabsOptionsProps,
} from '../../MobileTabs/MobileTabsOptions'
import styles from '../../MobileTabs/_mobile-tabs.module.scss'

type MobileRouterTabsProps = {
  /** Array of the RouteConfig object. Needed to render the tab options for mobile. */
  mobileConfig: RouteConfig[]
  navigate: MobileTabsOptionsProps['navigate']
}

const MobileRouterTabs = ({
  mobileConfig,
  navigate,
}: MobileRouterTabsProps): JSX.Element => {
  const location = useLocation(),
    [active, setActive] = useState(mobileConfig[0].label),
    [display, setDisplay] = useState(mobileConfig[0].label)

  useEffect(() => {
    mobileConfig.forEach((mc) => {
      if (mc.link === location.pathname) {
        setActive(mc.label)
        setDisplay(mc.label)
      }

      if (mc.link === location.pathname && mc.subrows) {
        setActive(mc.subrows[0]?.label)
        setDisplay(`${mc.label} > ${mc.subrows[0]?.label}`)
      }
      if (mc.link !== location.pathname && mc.subrows) {
        mc.subrows.forEach((sub) => {
          if (sub.link === location.pathname) {
            setActive(sub.label)
            setDisplay(`${mc.label} > ${sub.label}`)
          }
        })
      }
    })
  }, [location.pathname, mobileConfig, active])

  return (
    <PopoverAndMobileDrawer
      content={
        <MobileTabsOptions
          mobileConfig={mobileConfig}
          active={active}
          setActive={setActive}
          navigate={navigate}
        />
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
  )
}

export default MobileRouterTabs
