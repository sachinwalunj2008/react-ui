import { TabsProps } from '../Tabs';
type DesktopTabsProps = TabsProps & {
    activeTabId: number;
};
declare const DesktopTabs: ({ tabs, subtabs, activeTabId, customId, customClass, equalWidth, callout, }: DesktopTabsProps) => JSX.Element;
export default DesktopTabs;
