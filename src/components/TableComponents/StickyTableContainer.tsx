import React from 'react'
import { useWindowSize, useMediaQuery } from '../../module'

type StickyTableContainerProps = {
  children: React.ReactNode
  hasData: boolean
  loading: boolean
  customWidth?: number | string
  customHeight?: number | string
  /** If the table is next to another element, the computed width of the table will be incorrect. Use this to input the width of the element (including padding, margin, and other spacing) to have the correct width for the table. */
  widthOffset?: number
}

export const StickyTableContainer = ({
  children,
  hasData,
  loading,
  customWidth,
  customHeight,
  widthOffset = 0,
}: StickyTableContainerProps): JSX.Element => {
  const containerDimensions = useWindowSize(),
    screenIsMdMin = useMediaQuery({ type: 'min', breakpoint: 'md' }),
    // TODO: going to use a standard sidebar-width css variable instead of having multiple hardcoded values
    sidebarWidth = Number(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--sidebar-collapsed-width'
      )
    ),
    headerHeight = Number(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--header-height'
      )
    ),
    // We only need the width calculation if the table has sticky columns
    standardWidth = containerDimensions.width
      ? containerDimensions.width -
        sidebarWidth -
        widthOffset -
        (screenIsMdMin /* We only need this on MD screens or larger. Otherwise, if a table is in mobile (and not using the MobileTable) then this removes 40px more than needed. */
          ? 40 /* Magic number to account for padding of the .app-content-layout container*/
          : 0)
      : '100%',
    standardHeight =
      containerDimensions.height && containerDimensions.height - headerHeight

  const style: React.CSSProperties = {
    width: customWidth ?? standardWidth,
    // TODO: This only works when the sidebar is collapsed. We need a width for when the sidebar is expanded.
    height:
      hasData || loading
        ? customHeight
          ? customHeight
          : standardHeight
        : 'auto' /* If no data is present and also not loading, we do not want the table height to be too tall so we can show the EmptyState component under the table */,
  }

  return containerDimensions && <div style={style}>{children}</div>
}

export default StickyTableContainer
