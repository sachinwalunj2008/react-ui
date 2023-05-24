import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../../module'
import styles from './_sidebar-link.module.scss'

const SidebarLink = ({
  content,
  count,
  originPath,
  updatePage,
  callout,
  firstBottomLink,
  highlightOrigin,
}) => {
  const [active, setActive] = useState(false),
    { link, icon, page } = content,
    location = useLocation()

  useEffect(() => {
    /**
     * "highlightOrigin" prop is used to highlight the sidebar.
     * If true(for predict), we need to highlight the origin module in the current breadcrumb tree(index = 0)
     * Else we pick the first element from the current URL(path[1]) and highlight the module that matches with it.
     */
    let activeRoutes
    const path = location.pathname.split('/'),
      checkPath = `/${highlightOrigin && originPath ? originPath : path[1]}`
    if (Array.isArray(content.link)) {
      activeRoutes = content.link.filter((link) => link === checkPath)
    }
    if (activeRoutes?.length > 0 || checkPath === content.link) {
      if (active !== true) {
        callout?.(false)
      }
      setActive(true)
    } else {
      setActive(false)
    }
  }, [
    active,
    callout,
    content.link,
    highlightOrigin,
    location.pathname,
    originPath,
  ])

  return (
    <Link
      to={Array.isArray(link) ? link[0] : link}
      className={`sidebar-links${active ? ' active' : ''}${
        firstBottomLink ? ` ${styles.marginTop}` : ''
      }`}
      onClick={() => updatePage(content)}
    >
      <div className='menu-item'>
        <Icon icon={icon} customClass='sidebar-link-icon' />
        <span className={`menu-item-text-container`}>
          <span className={`${active ? 'active-link ' : ''}`} />
          <span className={`menu-item-text animated fadeInLeft delay-${count}`}>
            {page}
          </span>
        </span>
      </div>
    </Link>
  )
}

export default SidebarLink
