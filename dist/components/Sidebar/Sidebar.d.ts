import React from 'react';
import { IconStringList } from '../../module';
export type SidebarContent = {
    firstBottomLink?: boolean;
    bottomLink?: boolean;
    link: string;
    icon: IconStringList;
    page: string;
};
type B = {
    link: string;
};
type SidebarArg = {
    toggleSidebar: (arg: boolean) => void;
    updateActiveBar: (arg: boolean) => void;
};
type SidebarProps<ContentItem extends SidebarContent, Breadcrumb extends B> = {
    sidebarFooter: (arg: SidebarArg) => void;
    updatePage?: () => void;
    content: ContentItem[];
    activeIdentifier?: string;
    children: React.ReactNode;
    sidebarWidth?: number;
    toggleDisabled?: boolean;
    startAtBottom?: boolean;
    showMobileMenu?: boolean;
    isBannerDisplay?: boolean;
    highlightOrigin?: boolean;
    breadcrumbs?: Breadcrumb[];
};
declare const Sidebar: <ContentItem extends SidebarContent, Breadcrumb extends B>({ startAtBottom, sidebarWidth, toggleDisabled, children, content, sidebarFooter, updatePage, activeIdentifier, highlightOrigin, breadcrumbs, showMobileMenu, isBannerDisplay, }: SidebarProps<ContentItem, Breadcrumb>) => JSX.Element;
export default Sidebar;
