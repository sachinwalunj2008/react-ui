import React from 'react'
import Icon from '../../Icons/Icon'
import { PopoverAndMobileDrawer } from '../../Popover/PopoverAndMobileDrawer'
import { SortColumnProps } from '../../SortColumn/SortColumnProps'
import StandardTable from '../StandardTable'
import MobileColumnOptions from './MobileColumnOptions'
import styles from './_mobile-table.module.scss'

type MobileColumnPickerProps = {
  /** Table configuration that will handle column headers and rendering column children. */
  config: React.ComponentProps<typeof StandardTable>['config']
  /** Name by which the active mobile column is stored */
  localStorageName: string
  /** SortColumn's 'sorter' prop - function to update the state of the sortBy prop */
  sort: SortColumnProps['sorter']
  /** This gets passed down to SortColumn's 'active' prop */
  sortBy: SortColumnProps['active']
  /** Function used to update the selected column */
  updateActiveColumn: (header: string) => void
  /** Active column selected */
  activeSecondaryColumn: string
  /** Ref to keep track of scoll position */
  scrollPositionRef: React.Ref<HTMLDivElement>
  /** Optional class to apply to main column */
  mainColumnClassName?: string
}

const MobileColumnPicker = ({
  config,
  localStorageName,
  sort,
  sortBy,
  updateActiveColumn,
  activeSecondaryColumn,
  scrollPositionRef,
  mainColumnClassName,
}: MobileColumnPickerProps): JSX.Element => {
  return (
    <PopoverAndMobileDrawer
      content={
        <MobileColumnOptions
          config={config}
          localStorageName={localStorageName}
          sort={sort}
          setActiveColumn={(header) => {
            updateActiveColumn(header)
          }}
          sortBy={sortBy}
          activeSecondaryColumn={activeSecondaryColumn}
        />
      }
      toggleClassName={styles.select}
      sideDrawerProps={{
        headerContent: 'Select Main Column',
      }}
    >
      <div
        ref={scrollPositionRef}
        className={`${styles.mainColumnContainer} ${mainColumnClassName || ''}`}
      >
        <span>
          Main Column:{' '}
          <span className={styles.boldFont}>{activeSecondaryColumn}</span>
        </span>
        <Icon icon='carat' size='10px' customClass={styles.caratIcon} />
      </div>
    </PopoverAndMobileDrawer>
  )
}

export default MobileColumnPicker
