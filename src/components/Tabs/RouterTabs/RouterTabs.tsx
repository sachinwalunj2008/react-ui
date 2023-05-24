import * as React from 'react'
import { useMediaQuery } from '../../../module'
import { MobileTabsOptionsProps } from '../MobileTabs/MobileTabsOptions'
import DesktopRouterTabs from './Desktop/DesktopRouterTabs'
import MobileRouterTabs from './Mobile/MobileRouterTabs'

type BaseRouteConfig = {
  /** The label that will display for the link label */
  label: string
  /** The route link */
  link: string
}

export type RouteConfig = BaseRouteConfig & {
  /** Array of the BaseRouteConfig objects. Object includes label and link. */
  subrows?: BaseRouteConfig[]
}

type RouterTabsBaseProps = {
  /** Multiple children. Typically in the form of NavLink components */
  children: React.ReactNode[]
  /** Determines the style of the tabs. If true, the subtabs style will be applied. */
  subtabs?: boolean
}

type RouterTabsWithMobile = RouterTabsBaseProps & {
  /** Array of the RouteConfig object. Needed to render the tab options for mobile. */
  mobileConfig: RouteConfig[]
  /** Pass in a navigate function (useHistory or useNavigate hook functions) depending on the version of react-router-dom the app is using. */
  navigate: MobileTabsOptionsProps['navigate']
}

type RouterTabsWithoutMobile = RouterTabsBaseProps & {
  mobileConfig?: never
  navigate?: never
}

type RouterTabsProps = RouterTabsWithMobile | RouterTabsWithoutMobile

export default function RouterTabs({
  children,
  subtabs = false,
  mobileConfig,
  navigate,
}: RouterTabsProps): JSX.Element {
  const isMobile = useMediaQuery({ type: 'max', breakpoint: 'md' })

  if (isMobile && mobileConfig) {
    return <MobileRouterTabs mobileConfig={mobileConfig} navigate={navigate} />
  }

  if (isMobile && subtabs) {
    return <></>
  }

  //@ts-expect-error React 18 issue?
  return <DesktopRouterTabs subtabs={subtabs}>{children}</DesktopRouterTabs>
}
