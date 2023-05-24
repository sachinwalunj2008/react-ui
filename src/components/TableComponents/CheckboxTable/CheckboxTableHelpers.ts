import { useEffect, useRef, useState } from 'react'
import { SortColumnProps, useIsMounted, useMediaQuery } from '../../../module'
import { ConfigItemType } from '../StandardTableTypes'
import { StickyTableConfigType } from './CheckboxTableTypes'
import styles from '../_table.module.scss'

///////// Sticky columns / header logic /////////
export const headerStyle = (
  isStickyLeftColumn: boolean,
  isMobileView: boolean,
  heightOfHeaderRow?: number
): React.CSSProperties => ({
  position: 'sticky',
  top:
    isMobileView &&
    heightOfHeaderRow /** The height of the header + set distance to top (53px - set in `header` css class)  */
      ? heightOfHeaderRow + 53 + 'px'
      : '57px' /** The height of the sticky header is set to 57px in full desktop view */,
  zIndex: isStickyLeftColumn ? 4 : 3,
})

export const stickyTableHeaderCount = (
  stickyTableConfig?: StickyTableConfigType
): number => stickyTableConfig?.header || 1

export const getStickyRightCount = (
  stickyTableConfig?: StickyTableConfigType,
  customColumnProps?: boolean
): number => (stickyTableConfig?.right ?? 0) + (customColumnProps ? 1 : 0)

export const customColumnStickyStyles =
  getStickyRightCount() === 1
    ? 'first-sticky-cell-right ' + styles.extraLeftPadding
    : ''

export const getStickyLeftCount = (
  stickyTableConfig?: StickyTableConfigType
): number => (stickyTableConfig?.left ?? 1) + 1

////////////////////////////////////////////////////

/////////    Mobile Logic    //////////
export function useMobileCheckboxes(
  config: ConfigItemType<unknown, Record<string, unknown>>[],
  sort: SortColumnProps['sorter'],
  sortBy: SortColumnProps['active']
): {
  mainColumn: ConfigItemType<unknown, Record<string, unknown>>
  activeColumn: ConfigItemType<unknown, Record<string, unknown>>
  scrollPositionRef: React.RefObject<HTMLDivElement>
  headerPositionRef: React.RefObject<HTMLDivElement>
  sortColumnsCount: number
  heightOfHeaderRow: number
  isMobileView: boolean
  updateActiveColumn: (header: string) => void
  activeSecondaryColumn: string
} {
  const mainColumnIndex = config.findIndex((c) => c.mainColumn)
  const secondaryColumnIndex = (mainColumnIndex > -1 ? mainColumnIndex : 0) + 1

  const [activeSecondaryColumn, setActiveSecondaryColumn] = useState(
      config[secondaryColumnIndex].label
    ),
    [heightOfHeaderRow, setHeightOfHeaderRow] = useState(0),
    [sortColumnsCount, setSortColumnsCount] = useState(0),
    isMounted = useIsMounted()

  const updateActiveColumn = (header: string) => {
    setActiveSecondaryColumn(header)
  }

  const scrollPositionRef = useRef<HTMLDivElement>(null),
    headerPositionRef = useRef<HTMLDivElement>(null),
    isMobileView = useMediaQuery({
      type: 'max',
      breakpoint: 'md',
    })

  const mainColumn = mainColumnIndex ? config[mainColumnIndex] : config[0],
    activeColumn =
      config.find((h) => h.label === activeSecondaryColumn) ??
      config[secondaryColumnIndex]

  useEffect(() => {
    if (isMounted() && isMobileView) {
      config
        .filter((_, i) => i > 0)
        .forEach((c) => {
          if (c.name === sortBy.prop && !c.mainColumn) {
            updateActiveColumn(c.label)
          }
        })
      const configWithValuesCount = config.reduce(
        (r, o) => r + +!Object.values(o).includes(''),
        0
      )
      setSortColumnsCount(configWithValuesCount)
    }
  }, [config, isMobileView, isMounted, sortBy.prop])

  useEffect(() => {
    /** NOTE: get current header row height */
    if (headerPositionRef.current && isMobileView) {
      const currentHeaderHeight =
        headerPositionRef.current.getBoundingClientRect().height
      const hasChanged = heightOfHeaderRow !== currentHeaderHeight
      hasChanged && setHeightOfHeaderRow(currentHeaderHeight)
    }
  }, [heightOfHeaderRow, isMobileView, sort])

  return {
    mainColumn,
    activeColumn,
    scrollPositionRef,
    headerPositionRef,
    sortColumnsCount,
    heightOfHeaderRow,
    isMobileView,
    activeSecondaryColumn,
    updateActiveColumn,
  }
}

////////////////////////////////////////
