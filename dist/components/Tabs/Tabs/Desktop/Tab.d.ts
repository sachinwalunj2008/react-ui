import React from 'react';
export type TabItemProps = {
    id: number;
    tabName: string;
    tag?: number;
    subtabs?: boolean;
    content?: string | JSX.Element;
    subrows?: Array<{
        id: number;
        tabName: string;
        content?: string | JSX.Element;
    }>;
};
type TabProps = {
    tab: TabItemProps;
    active: boolean;
    subtabs?: boolean;
    onTabClick: () => void;
};
declare const Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLLIElement>>;
export default Tab;
