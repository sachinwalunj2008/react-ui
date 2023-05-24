import React from 'react'
import { EmptyState, useMediaQuery } from '../../module'
import DesktopTable from './Desktop/DesktopTable'
import MobileTable from './Mobile/MobileTable'
import type { ConfigItemType, StandardTableProps } from './StandardTableTypes'
import styles from './_table.module.scss'

const StandardTable = <
  DataItem,
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
>(
  props: StandardTableProps<DataItem, ConfigItem>
): JSX.Element => {
  const {
    hasData,
    loading,
    tableId,
    noDataFields,
    largeMobileBreakpoint,
    noMobileView,
  } = props
  const localStorageName = `sort_by_${tableId}`,
    isMobileView = useMediaQuery({
      type: 'max',
      breakpoint: largeMobileBreakpoint ? 'lg' : 'md',
    })

  return (
    <div id={`standard_table_${tableId}_container`}>
      {!isMobileView || noMobileView ? (
        // @ts-expect-error Having an issue with the totalRowKey generic. For now, we will expect this error until we figure out how to deal with this error.
        <DesktopTable {...props} localStorageName={localStorageName} />
      ) : (
        // @ts-expect-error Having an issue with the DataItem generic. For now, we will expect this error until we figure out how to deal with this error.
        <MobileTable {...props} localStorageName={localStorageName} />
      )}
      {!loading && !hasData && (
        <EmptyState
          {...{
            ...noDataFields,
            background: !!noDataFields?.background,
          }}
        />
      )}
    </div>
  )
}

export default StandardTable

// COMMON TABLE PROPS
export const color = {
  red: styles.redFont,
  gray: styles.darkPurpleFont,
}

export const backgroundColor = {
  red: styles.lightRedBackground,
  gray: styles.lighterGrayBackground,
}
