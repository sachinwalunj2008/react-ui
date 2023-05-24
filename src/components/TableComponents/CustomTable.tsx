import React, { useEffect, useRef, useState } from 'react'
import {
  Cell,
  EmptyState,
  ListLoading,
  Row,
  SortColumnProps,
  StickyTable,
  StickyTableContainer,
} from '../../module'
import { debounce } from '../../services/HelperServiceTyped'
import { EmptyStateProps } from '../EmptyState/EmptyState'
import SortColumn from '../SortColumn/SortColumn'
import UnsortedColumn from '../UnsortedColumn/UnsortedColumn'
import TableFilter from './TableFilter'
import styles from './_table.module.scss'

type TableFilterProps = React.ComponentProps<typeof TableFilter>

type StickyTableConfigType = {
  /** The default for this is 1. If you need more than 1 sticky header, then use this prop. */
  header?: number
  /** The default for this is 1. If you need more than 1 sticky left column, then use this prop. */
  left?: number
  /** This should be set to 1 or more if the far right column has an action button in it. */
  right?: number
}

type HeaderItemType<StyleGeneric> = HeaderName & {
  label: SortColumnProps['label']
  lowerCaseParam?: SortColumnProps['lowerCaseParam']
  tooltip?: SortColumnProps['tooltip']
  className?: string
  noSort?: boolean
  filter?: SortColumnProps['filter']
  style?: StyleGeneric
}

type SingleNameHeader = {
  name: SortColumnProps['propName']
  options?: never
}

type OptionsHeader = {
  name?: never
  options: SortColumnProps['options']
}

type HeaderName = OptionsHeader | SingleNameHeader

type CustomTableProps<
  HeaderItem extends HeaderItemType<Record<string, unknown>>
> = CustomTablePropsWithHeaders<HeaderItem> | CustomTablePropsWithCustomHeaders

type CustomTableBaseProps = {
  /** Flag to determine if the table has data available */
  hasData: boolean
  /** Flag to determine if the table has more data that needs to be called */
  hasMore: boolean
  /** Flag to let the table know that the api call was successful */
  successStatus: boolean
  /** Flag to determine if the data is being fetched */
  loading: boolean
  /** Each table needs a unique id to be able to handle setting the sort values in localStorage correctly */
  tableId: string
  /** This is the text that is displayed when no data is available */
  noDataFields: EmptyStateProps
  /** SortColumn's 'sorter' prop - function to update the state of the sortBy prop */
  sort: SortColumnProps['sorter']
  /** This gets passed down to SortColumn's 'active' prop */
  sortBy: SortColumnProps['active']
  /** With pagination, new data needs to get called every time we reach the scrolling threshold. This is the function to get the next set of data. */
  getData: () => void
  children: React.ReactNode
  /** We need to know if there is a custom child (such as a checkbox) so that we can correctly determine which column headers should have the sticky classes. This is necessary to have the correct styles in the header. */
  headerChildren?: { jsx: React.ReactNode; count: number }
  /** Array of selected columns that we want displayed in the UI */
  customColumnsList?: Record<string, React.ReactNode[]> | React.ReactNode[]
  /** The table needs to know which columns and rows are sticky. This object is where we define that. */
  stickyTableConfig?: StickyTableConfigType
  /** You may define a set height for the table - optional */
  customHeight?: number | string
  /** You may define a set width for the table - optional */
  customWidth?: number | string
  /** If the table is next to another element, the computed width of the table will be incorrect. Use this to input the width of the element (including padding, margin, and other spacing) to have the correct width for the table. */
  widthOffset?: number
  /** Table filters that are currently in use. A table does not have to have filters, but if they do have filters, we need to know which are the active filters. */
  activeFilters?: TableFilterProps['activeFilters']
  /** Function to remove the currently active filters. */
  removeFilters?: TableFilterProps['remove']
  /** Shows a short list loading experience */
  shortListLoading?: boolean
}

type CustomTablePropsWithHeaders<HeaderItem> = CustomTableBaseProps & {
  /** Array of table headers */
  headers: HeaderItem[]
  customHeaders?: never
}

type CustomTablePropsWithCustomHeaders = CustomTableBaseProps & {
  headers?: never
  /** Custom table headers. This would require building a header row with the `Row` and `Cell` components. */
  customHeaders: React.ReactNode
}

const CustomTable = <
  HeaderItem extends HeaderItemType<Record<string, unknown>>
>({
  hasData,
  hasMore,
  successStatus,
  loading,
  tableId,
  noDataFields,
  sort,
  sortBy,
  getData,
  children,
  headers,
  customHeaders,
  headerChildren,
  stickyTableConfig,
  customHeight,
  customWidth,
  widthOffset,
  activeFilters,
  removeFilters,
  shortListLoading,
}: CustomTableProps<HeaderItem>): JSX.Element => {
  const [state, setState] = useState({
      showStickyClasses: false,
    }),
    { showStickyClasses } = state
  const infiniteLoadRef = useRef<HTMLDivElement>(null),
    tableRef = useRef<HTMLDivElement>(null),
    tableWidth = tableRef.current?.clientWidth,
    innerTableWidth = tableRef.current?.querySelector(
      '.sticky-table-table'
    )?.clientWidth

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = debounce(() => {
      setState((prevState) => ({
        ...prevState,
        showStickyClasses: (tableWidth ?? 0) < (innerTableWidth ?? 0),
      }))
    }, 250)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [tableWidth, innerTableWidth, hasData])

  useEffect(() => {
    if (infiniteLoadRef.current && hasMore && successStatus) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              getData()
            }
          })
        },
        { threshold: 0.5 }
      )

      observer.observe(infiniteLoadRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [hasMore, successStatus, getData])

  return (
    <div className={showStickyClasses ? styles.stickyClasses : ''}>
      <StickyTableContainer
        hasData={hasData}
        loading={loading}
        customHeight={customHeight}
        customWidth={customWidth}
        widthOffset={widthOffset}
      >
        {activeFilters && removeFilters && (
          <TableFilter activeFilters={activeFilters} remove={removeFilters} />
        )}
        <StickyTable
          stickyHeaderCount={stickyTableConfig?.header ?? 1}
          leftStickyColumnCount={stickyTableConfig?.left ?? 1}
          rightStickyColumnCount={stickyTableConfig?.right ?? 0}
          borderWidth={0}
          wrapperRef={tableRef}
          className={hasData ? 'show-scrollbar' : ''}
        >
          <Row className='sticky-table-header'>
            {headerChildren?.jsx}
            {customHeaders
              ? customHeaders
              : headers?.map((th: HeaderItem, i: number) => {
                  const lastLeftStickyColumn =
                      // If headerChildren exist, then we need to subtract the number of headerChildren and then we naturally subtract 1 to account for the 0 index in arrays.
                      stickyTableConfig?.left
                        ? stickyTableConfig?.left -
                          (headerChildren?.count ?? 0) -
                          1
                        : 0,
                    firstRightStickyColumn =
                      headers &&
                      !!stickyTableConfig?.right &&
                      headers.length - stickyTableConfig?.right

                  return (
                    <Cell
                      key={th.name}
                      style={{ ...th.style }}
                      className={`${
                        lastLeftStickyColumn === i
                          ? 'last-sticky-cell-left'
                          : ''
                      } ${
                        Number(lastLeftStickyColumn) + 1 === i
                          ? styles.extraLeftPadding
                          : ''
                      } ${
                        firstRightStickyColumn === i
                          ? `first-sticky-cell-right ${styles.extraLeftPadding}`
                          : ''
                      } ${th.className ?? ''}`.trim()}
                    >
                      {!th.noSort && hasData ? (
                        <SortColumn
                          label={th.label}
                          {...(th.options
                            ? { options: th.options }
                            : { propName: th.name ?? '' })}
                          sorter={sort}
                          customClass={th.className}
                          active={sortBy}
                          localStorageName={`sort_by_${tableId}`}
                          lowerCaseParam={th.lowerCaseParam}
                          tooltip={th.tooltip}
                          filter={th.filter}
                          activeFilters={activeFilters}
                        />
                      ) : (
                        <UnsortedColumn label={th.label} tooltip={th.tooltip} />
                      )}
                    </Cell>
                  )
                })}
          </Row>
          {!loading ? (
            hasData && (
              <>
                {children && children}
                {hasMore && (
                  <div
                    ref={infiniteLoadRef}
                    className={styles.listLoadingWrapper}
                  >
                    <ListLoading />
                  </div>
                )}
              </>
            )
          ) : (
            <div className={styles.listLoadingWrapper}>
              <ListLoading longList={!shortListLoading} />
            </div>
          )}
        </StickyTable>
      </StickyTableContainer>
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

export default CustomTable
