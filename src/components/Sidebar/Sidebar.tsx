import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useMediaQuery } from '../../module'
import SidebarLink from './SidebarLink'

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

type SidebarTimeout = ReturnType<typeof setTimeout>

const Sidebar = <ContentItem extends Content, Breadcrumb extends B>({
  startAtBottom,
  sidebarWidth,
  toggleDisabled,
  updatePage,
  children,
  content,
  sidebarFooter,
  activeIdentifier,
  highlightOrigin = false,
  breadcrumbs = [],
  showMobileMenu,
  isBannerDisplay,
}: SidebarProps<ContentItem, Breadcrumb>): JSX.Element => {
  const [position, setPosition] = useState('0px'),
    [hovered, setHovered] = useState(false),
    isWebKit = navigator.userAgent.indexOf('AppleWebKit') !== -1,
    sidebarTimeout = useRef<SidebarTimeout>(),
    sideBarRef = useRef<HTMLDivElement>(null)

  const year = new Date().getFullYear()
  let count = 1

  const getMenuItemPosition = (el: HTMLElement | null): number => {
    return Math.round(el?.offsetTop || 0)
  }

  const updateActiveBar = useCallback(
    (forceBottom: boolean | undefined) => {
      let extraPadding = 0,
        subtract = false,
        el: HTMLElement | null,
        sidebarHeaderHeight,
        containerStart: HTMLElement | null
      const sidebarHeader = document.querySelector('div.sidebar-header'),
        windowWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
      if (windowWidth > 1680) {
        extraPadding = 25
        subtract = true
      }
      return setTimeout(() => {
        if (forceBottom) {
          setPosition(
            `${
              (sideBarRef.current?.getBoundingClientRect().height ?? 0) - 48
            }px`
          )
        } else {
          el = document.querySelector(activeIdentifier || '.sidebar a.active')
          containerStart = document.querySelector('div.sidebar-links-container')
          sidebarHeaderHeight = sidebarHeader
            ? Math.round(sidebarHeader.getBoundingClientRect().height)
            : 0
          setPosition(
            `${
              subtract
                ? getMenuItemPosition(el) +
                  (document.querySelector('.App')?.classList.contains('shrink')
                    ? 32
                    : extraPadding) +
                  sidebarHeaderHeight -
                  getMenuItemPosition(containerStart)
                : getMenuItemPosition(el) + extraPadding
            }px`
          )
        }
      }, 100)
    },
    [activeIdentifier]
  )

  const toggleSidebar = (isHovered: boolean) => {
    setHovered(isHovered)
  }

  const checkIfToggle = (isHovered: boolean) => {
    if (!toggleDisabled) {
      toggleSidebar(isHovered)
    }
  }

  const updatePageCallout = (page: UpdatePageCalloutArg<Breadcrumb>) => {
    setHovered(false)
    updatePage?.(page)
  }

  useEffect(() => {
    function resizeListener() {
      sidebarTimeout.current = updateActiveBar(startAtBottom)
    }
    window.addEventListener('resize', resizeListener)
    resizeListener()
    return () => {
      window.removeEventListener('resize', resizeListener)
      sidebarTimeout.current && clearTimeout(sidebarTimeout.current)
    }
  }, [startAtBottom, updateActiveBar])

  useEffect(() => {
    const timeoutId = updateActiveBar(startAtBottom)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [sidebarWidth, startAtBottom, updateActiveBar])

  const originPath = breadcrumbs?.[0]?.link?.split('/')?.[1] ?? ''
  const isMobileView = useMediaQuery({ type: 'max', breakpoint: 'md' })

  return (
    <div
      className={`sidebar mobile-sidebar-styling ${
        hovered || toggleDisabled ? 'expanded' : ''
      } ${isWebKit ? 'is-webkit' : ''} ${
        showMobileMenu ? 'mobile-sidebar-menu' : ''
      } ${!isMobileView && isBannerDisplay ? 'banner-enabled' : ''} `}
      onMouseEnter={() => checkIfToggle(true)}
      onMouseLeave={() => checkIfToggle(false)}
      ref={sideBarRef}
    >
      <div className='sidebar-main-content'>
        {children && children}
        <div className='sidebar-links-container'>
          <div className='sidebar-active-bar' style={{ top: position }} />
          <div className='top-links'>
            {content.map((t) => (
              <SidebarLink
                content={t}
                key={t.link}
                callout={updateActiveBar}
                updatePage={updatePageCallout}
                count={count++ % 20}
                highlightOrigin={highlightOrigin}
                originPath={originPath}
                firstBottomLink={t.firstBottomLink}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='sidebar-footer'>
        <span className='copywrite'>&copy; {year} Pattern</span>
        {sidebarFooter?.({
          toggleSidebar,
          updateActiveBar,
        })}
      </div>
      <div className='sidebar-accent-background' />
    </div>
  )
}

export default Sidebar
