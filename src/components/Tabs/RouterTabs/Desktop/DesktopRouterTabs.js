import * as React from 'react'
import styles from './_desktop-router-tabs.module.scss'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
const { useRef, cloneElement, useLayoutEffect, Children: RChildren } = React

const activeClassName = 'active'
const customClassName = styles.routertabsLink

// TODO: Convert to .tsx. This entire file is brought over from RouterTabs.js
export default function DesktopRouterTabs({ children, subtabs = false }) {
  const activeBarRef = useRef(),
    bottomBarRef = useRef(),
    navlinkContainerRef = useRef(),
    location = useLocation(),
    previousAnimationRef = useRef()

  useLayoutEffect(() => {
    // add width & max-width to each link so that bold font sizes don't affect the size of the links
    const childrenNodes = Array.from(
      (subtabs
        ? bottomBarRef
        : navlinkContainerRef
      ).current.getElementsByClassName(customClassName)
    )
    if (childrenNodes.length > 0) {
      childrenNodes.forEach((child) => {
        const { width: originalWidth } = child.getBoundingClientRect()

        // 0.28 is a magic number that comes from finding the average size difference between a character in normal font and bold font when using our fonts
        let width = originalWidth + child.innerText.length * 0.28

        const computedStyles = window.getComputedStyle(child)
        if (computedStyles['box-sizing'] === 'content-box') {
          width -= parseInt(computedStyles['padding-left'])
          width -= parseInt(computedStyles['padding-right'])
        }

        child.style.maxWidth = `${width}px`
        child.style.width = `${width}px`
      })
    }
  }, [subtabs])

  const numberOfChildrenNodes =
    RChildren.toArray(children).filter(Boolean).length

  useLayoutEffect(() => {
    // every rerender, check to see if we need to update the location of the active bar underneath the NavLink
    const childrenNodes = Array.from(
      (subtabs
        ? bottomBarRef
        : navlinkContainerRef
      ).current.getElementsByClassName(customClassName)
    )
    if (childrenNodes.length && activeBarRef.current) {
      const active = childrenNodes.find((ref) =>
        ref?.classList.contains(activeClassName)
      )
      active?.classList?.add(styles.routertabsLinkActive)
      if (active) {
        if (
          previousAnimationRef.current &&
          previousAnimationRef.current.playState !== 'finished'
        ) {
          previousAnimationRef.current.onfinish = animateElement
        } else {
          animateElement()
        }

        function animateElement() {
          if (active && activeBarRef.current && bottomBarRef.current) {
            const { left: destinationLeft, width: destinationWidth } =
              active.getBoundingClientRect()
            const { left: firstBarLeft, width: firstBarWidth } =
              activeBarRef.current.getBoundingClientRect()

            const { left: bottomBarLeft } =
              bottomBarRef.current.getBoundingClientRect()

            activeBarRef.current.style.transition = ''
            activeBarRef.current.style.left = `${
              destinationLeft - bottomBarLeft
            }px`
            activeBarRef.current.style.width = `${destinationWidth}px`

            const { left: lastBarLeft, width: lastBarWidth } =
              activeBarRef.current.getBoundingClientRect()

            const deltaX = firstBarLeft - lastBarLeft
            const deltaW = firstBarWidth / lastBarWidth

            previousAnimationRef.current = activeBarRef.current.animate(
              [
                { transform: `translateX(${deltaX}px) scaleX(${deltaW})` },
                { transform: 'none' },
              ],
              {
                duration: 500,
                easing: 'ease-in-out',
              }
            )
          }
        }
      }
    }
  }, [location, subtabs, numberOfChildrenNodes])

  return (
    <div className={styles.routertabsContainer}>
      <nav
        className={`${styles.routertabsNavContainer} ${
          subtabs ? styles.routertabsSubtabs : ''
        }`.trim()}
        ref={subtabs ? bottomBarRef : navlinkContainerRef}
      >
        {RChildren.map(children, (child) => {
          if (child) {
            return cloneElement(child, {
              className: `${
                child.props.className || ''
              } ${customClassName}`.trim(),
            })
          }
          return null
        })}
        {subtabs && (
          <div
            className={styles.routertabsSubtabsActive}
            ref={activeBarRef}
            style={{
              width: '0px',
            }}
          />
        )}
      </nav>
      {!subtabs && (
        <div className={styles.routertabsBottomBar} ref={bottomBarRef}>
          <div
            className={styles.routertabsBottomBarActive}
            ref={activeBarRef}
            style={{
              width: '0px',
            }}
          />
        </div>
      )}
    </div>
  )
}

DesktopRouterTabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  subtabs: PropTypes.bool,
  mobileConfig: PropTypes.array,
}
