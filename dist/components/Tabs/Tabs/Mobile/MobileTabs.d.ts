import { TabsProps } from '../Tabs';
type MobileTabsProps = TabsProps & {
    activeTabId: number;
};
declare const MobileTabs: ({ tabs, activeTabId, callout, }: MobileTabsProps) => JSX.Element;
export default MobileTabs;
