import React from 'react'
import MobileSideDrawerOptions from '../../SideDrawer/MobileSideDrawerOptions/MobileSideDrawerOptions'
import { usePopoverAndMobileDrawer } from '../../../module'
import { useLocation } from 'react-router-dom'
import { RouteConfig } from '../RouterTabs/RouterTabs'

export type MobileTabsOptionsProps = {
  /** Array of the RouteConfig object. Needed to render the tab options for mobile. */
  mobileConfig: RouteConfig[]
  /** The option that is currently selected. */
  active: string
  /** Callout function to set the active option */
  setActive: (label: string) => void
  /** Pass in a navigate function (useHistory or useNavigate hook functions) depending on the version of react-router-dom the app is using. */
  navigate?: (link: string) => void
}

const MobileTabsOptions = ({
  mobileConfig,
  active,
  setActive,
  navigate,
}: MobileTabsOptionsProps): JSX.Element => {
  const { closePopoverOrDrawer } = usePopoverAndMobileDrawer(),
    location = useLocation()

  const goToPage = (option: { label: string; link?: string }) => {
    setActive(option.label)
    option.link && navigate?.(option.link)
    closePopoverOrDrawer()
  }

  return (
    <MobileSideDrawerOptions
      options={mobileConfig}
      callout={goToPage}
      activeRow={active}
      currentPage={location.pathname}
    />
  )
}

export default MobileTabsOptions
