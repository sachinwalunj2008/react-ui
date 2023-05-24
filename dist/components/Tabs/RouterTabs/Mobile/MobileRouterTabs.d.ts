import { RouteConfig } from '../RouterTabs';
import { MobileTabsOptionsProps } from '../../MobileTabs/MobileTabsOptions';
type MobileRouterTabsProps = {
    /** Array of the RouteConfig object. Needed to render the tab options for mobile. */
    mobileConfig: RouteConfig[];
    navigate: MobileTabsOptionsProps['navigate'];
};
declare const MobileRouterTabs: ({ mobileConfig, navigate, }: MobileRouterTabsProps) => JSX.Element;
export default MobileRouterTabs;
