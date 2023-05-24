import { TabItemProps } from './Desktop/Tab';
export type TabsProps = {
    /** Array of Tabs to display */
    tabs: Array<TabItemProps>;
    /** Style the component with the subtabs design */
    subtabs?: boolean;
    /** Determine the active tab */
    active?: number;
    /** Optional identifier */
    customId?: string;
    /** Optionally add a className to Tabs */
    customClass?: string;
    /** Optionally force all tabs to be an equal width across the width of its container */
    equalWidth?: boolean;
    /** Function to help set the active tab */
    callout?: (tabId: number) => void;
};
declare const Tabs: (props: TabsProps) => JSX.Element;
export default Tabs;
