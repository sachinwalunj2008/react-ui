import React from 'react'
type UpdatePageCalloutArg<Breadcrumb> = {
  page: {
    page: string
    link: string
    icon: string
    breadcrumbs: Breadcrumb[]
    permissions: string[]
  }
}
type Content = {
  firstBottomLink?: boolean
  bottomLink?: boolean
  link: string
}
type B = {
  link: string
}
type SidebarArg = {
  toggleSidebar: (arg: boolean) => void
  updateActiveBar: (arg: boolean) => void
}
type SidebarProps<ContentItem extends Content, Breadcrumb extends B> = {
  updatePage: (page: UpdatePageCalloutArg<Breadcrumb>) => void
  sidebarFooter: (arg: SidebarArg) => void
  content: ContentItem[]
  activeIdentifier?: string
  children: React.ReactNode
  sidebarWidth?: number
  toggleDisabled?: boolean
  startAtBottom?: boolean
  showMobileMenu?: boolean
  isBannerDisplay?: boolean
  highlightOrigin?: boolean
  breadcrumbs?: Breadcrumb[]
}
declare const Sidebar: <ContentItem extends Content, Breadcrumb extends B>({
  startAtBottom,
  sidebarWidth,
  toggleDisabled,
  updatePage,
  children,
  content,
  sidebarFooter,
  activeIdentifier,
  highlightOrigin,
  breadcrumbs,
  showMobileMenu,
  isBannerDisplay,
}: SidebarProps<ContentItem, Breadcrumb>) => JSX.Element
export default Sidebar
