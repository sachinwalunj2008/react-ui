import React, { useState, useEffect } from 'react'
import FilterMenu from './FilterMenu'
import { Icon, Plural, SideDrawer, Button, Pill } from '../../module'
import styles from './_filter.module.scss'

type FilterProps = {
  /** Objects with key value pairs about what filter options can render in Filter body */
  filterStates: unknown
  /** Function to save selected filter options */
  filterCallout: (...params: unknown[]) => void
  // TODO: remove this prop
  resetButton?: boolean
  /** Function to reset filter options to default */
  // TODO: make this required
  resetCallout?: (...params: unknown[]) => void
  /** Function to reset date selected from filter options */
  resetDate?: (...params: unknown[]) => void
  /** Display applied filter count if filter options are selected */
  appliedFilters?: unknown
  /** Function to call on change of any filter options */
  onChangeCallout?: (...params: unknown[]) => void
  /** Function to cancel  */
  cancelCallout?: (...params: unknown[]) => void
  /** Function to open  */
  openCallout?: (...params: unknown[]) => void
  /** Anything which you would like to add in addition to Filter otions  */
  children?: React.ReactNode
  /** Set boolean for loading state of filter */
  loading?: boolean
  /** Set boolean to enable/disable tab indexing */
  noTabIndex?: boolean
  /** The text that will display at the top of the popover */
  headerText?: string
  /** Enable/disable Filter button based on API status either loading or success */
  apiStatus?: string
  /** Disables the filter button */
  disabled?: boolean
  /** Render filter children above other filter elements rather than the default of below */
  topChildren?: boolean
}
const Filter = ({
  filterStates = {},
  filterCallout,
  resetButton,
  resetCallout,
  resetDate,
  appliedFilters,
  onChangeCallout,
  cancelCallout,
  openCallout,
  children,
  loading,
  noTabIndex,
  headerText = 'Filters',
  apiStatus,
  disabled,
  topChildren,
}: FilterProps): JSX.Element => {
  const [openFilters, setOpenFilters] = useState(false)

  useEffect(() => {
    openFilters && openCallout?.()
  }, [openFilters, openCallout])

  return (
    <div>
      <Button
        as='button'
        tabIndex={noTabIndex ? -1 : undefined}
        className={`filter-button ${styles.buttonStyle} ${
          appliedFilters ? 'filter-applied' : ''
        }`}
        onClick={() => setOpenFilters(true)}
      >
        <Icon icon='filter' size='14px' customClass={styles.iconStyle} />
        <span>
          <Plural
            text='Filter'
            number={
              Object.keys(filterStates as Record<string, unknown>)?.length
            }
          />
        </span>
        {!!appliedFilters && (
          <div className={styles.marginLeft}>
            <Pill color='blue' number={Number(appliedFilters)} />
          </div>
        )}
      </Button>
      <SideDrawer
        isOpen={openFilters}
        closeCallout={() => setOpenFilters(false)}
        headerContent={headerText}
        footerContent={
          <div className={styles.sideDrawerFooter}>
            {resetButton && (
              <Button onClick={resetCallout} styleType='text-blue'>
                Reset Filters
              </Button>
            )}
            <div>
              <Button
                onClick={() => {
                  cancelCallout?.()
                  setOpenFilters(false)
                }}
              >
                Cancel
              </Button>
              <Button
                className={styles.buttonMarginLeft}
                styleType='primary-green'
                onClick={() => {
                  filterCallout(filterStates)
                  setOpenFilters(false)
                }}
                disabled={apiStatus === 'loading' || disabled}
              >
                Filter
              </Button>
            </div>
          </div>
        }
      >
        <FilterMenu
          states={filterStates}
          close={() => setOpenFilters(false)}
          resetDate={resetDate}
          onChangeCallout={onChangeCallout}
          loading={loading}
          topChildren={topChildren}
        >
          {children}
        </FilterMenu>
      </SideDrawer>
    </div>
  )
}

export default Filter
