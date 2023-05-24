import React from 'react'
import Checkbox from '../../Form/Checkbox'
import SortColumn from '../../SortColumn/SortColumn'
import { SortColumnProps } from '../../SortColumn/SortColumnProps'
import UnsortedColumn from '../../UnsortedColumn/UnsortedColumn'
import StandardTable from '../StandardTable'
import { ConfigItemType } from '../StandardTableTypes'
import styles from './_mobile-table.module.scss'

type MobileTableHeaderProps = {
  /** Ref to keep track of header position */
  headerPositionRef: React.Ref<HTMLDivElement>
  /** Props needed if the table has checkboxes. Mostly just here for CheckboxTable */
  checkboxProps?: {
    checkAll: boolean
    loading: boolean
    handleCheck: ({ checked, name }: { checked: boolean; name: string }) => void
  }
  /** Main column to display on left */
  mainColumn: ConfigItemType<unknown, Record<string, unknown>>
  /** Secondary column to display on right */
  activeColumn: ConfigItemType<unknown, Record<string, unknown>>
  /** If the table has data */
  hasData: boolean
  /** SortColumn's 'sorter' prop - function to update the state of the sortBy prop */
  sort: SortColumnProps['sorter']
  /** This gets passed down to SortColumn's 'active' prop */
  sortBy: SortColumnProps['active']
  /** Name by which the active mobile column is stored */
  localStorageName: string
  /** Used for displaying active custom filters if any */
  activeFilters: React.ComponentProps<typeof StandardTable>['activeFilters']
  /** Active column selected */
  activeSecondaryColumn: string
}

const MobileTableHeader = ({
  headerPositionRef,
  checkboxProps,
  mainColumn,
  activeColumn,
  hasData,
  sort,
  sortBy,
  localStorageName,
  activeFilters,
  activeSecondaryColumn,
}: MobileTableHeaderProps): JSX.Element => {
  return (
    <div ref={headerPositionRef} className={`${styles.row} ${styles.header}`}>
      <div
        className={styles.column}
        style={{ ...mainColumn?.style, minWidth: 'auto' }}
      >
        {checkboxProps && (
          <Checkbox
            name='checkbox-campaign'
            stateName='all'
            checked={checkboxProps?.checkAll}
            disabled={checkboxProps?.loading}
            callout={(name, value) =>
              checkboxProps?.handleCheck({ checked: value, name: name || '' })
            }
            label=''
            customClass={styles.rightMargin}
          />
        )}
        {!mainColumn.noSort && hasData ? (
          <SortColumn
            label={mainColumn?.label}
            {...(mainColumn?.options
              ? { options: mainColumn?.options }
              : { propName: mainColumn?.name ?? '' })}
            sorter={sort}
            customClass={mainColumn?.className}
            active={sortBy}
            localStorageName={localStorageName}
            lowerCaseParam={mainColumn?.lowerCaseParam}
            tooltip={mainColumn?.tooltip}
            filter={mainColumn?.filter}
            activeFilters={activeFilters}
          />
        ) : (
          <UnsortedColumn
            label={mainColumn?.label}
            tooltip={mainColumn?.tooltip}
            className={mainColumn?.className ?? ''}
          />
        )}
      </div>
      {activeSecondaryColumn && (
        <div
          className={`${styles.column} ${styles.activeColumn}`}
          style={{ ...activeColumn?.style, minWidth: 'auto' }}
        >
          {!activeColumn.noSort && hasData ? (
            <SortColumn
              label={activeColumn?.label}
              {...(activeColumn?.options
                ? { options: activeColumn?.options }
                : { propName: activeColumn?.name ?? '' })}
              sorter={sort}
              customClass={activeColumn?.className}
              active={sortBy}
              localStorageName={localStorageName}
              lowerCaseParam={activeColumn?.lowerCaseParam}
              tooltip={activeColumn?.tooltip}
              filter={activeColumn?.filter}
              activeFilters={activeFilters}
            />
          ) : (
            <UnsortedColumn
              label={activeColumn?.label}
              tooltip={activeColumn?.tooltip}
              className={activeColumn?.className ?? ''}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default MobileTableHeader
