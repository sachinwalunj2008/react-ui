import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  activeCellClass,
  Button,
  Cell,
  Checkbox,
  debounce,
  EmptyState,
  hasStickyColumnStyle,
  isEqual,
  ListLoading,
  Row,
  StickyTable,
  useIsMounted,
  useShowElement,
} from '../../../module'
import { ConfigItemType } from '../StandardTableTypes'
import StickyTableContainer from '../StickyTableContainer'
import TableFilter from '../TableFilter'
import { CheckboxTableProps } from './CheckboxTableTypes'

import SortColumn, { SortByProps } from '../../SortColumn/SortColumn'
import UnsortedColumn from '../../UnsortedColumn/UnsortedColumn'
import MobileColumnPicker from '../Mobile/MobileColumnPicker'
import MobileTableHeader from '../Mobile/MobileTableHeader'
import MobileTableRow from '../Mobile/MobileTableRow'
import mobileStyles from '../Mobile/_mobile-table.module.scss'
import { backgroundColor, color } from '../StandardTable'
import styles from '../_table.module.scss'
import {
  customColumnStickyStyles,
  getStickyLeftCount,
  getStickyRightCount,
  headerStyle,
  stickyTableHeaderCount,
  useMobileCheckboxes,
} from './CheckboxTableHelpers'
import CustomizeTableColumns from '../CustomizeTableColumns/CustomizeTableColumns'

const CheckboxTable = <
  DataItem,
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
>({
  data,
  selectedBoxes,
  setSelectedBoxes,
  unselectedBoxes,
  setUnselectedBoxes,
  checkAll,
  setCheckAll,
  config,
  dataKey,
  hasData,
  hasMore,
  successStatus,
  loading,
  customColumnProps,
  stickyTableConfig,
  customHeight,
  customWidth,
  widthOffset,
  activeFilters,
  removeFilters,
  sort,
  sortBy,
  getData,
  tableId,
  emptyStateProps,
  bulkActions,
  stringColumns,
  refreshData,
}: CheckboxTableProps<DataItem, ConfigItem>): JSX.Element => {
  const [showStickyClasses, setShowStickyClasses] = useState(false),
    [sortObj, setSortObj] = useState(sortBy),
    isMounted = useIsMounted(),
    localStorageName = `sort_by_${tableId}` // using local storage for now, moving to user-settings soon

  const bulkActionsRef = useRef<HTMLDivElement>(null),
    bulkActionsVisible = useShowElement(bulkActionsRef, 0.1)

  const infiniteLoadRef = useRef<HTMLDivElement>(null),
    tableRef = useRef<HTMLDivElement>(null),
    tableWidth = tableRef.current?.clientWidth,
    innerTableWidth = tableRef.current?.querySelector(
      '.sticky-table-table'
    )?.clientWidth

  /// Mobile Stuff ///

  const {
    isMobileView,
    sortColumnsCount,
    updateActiveColumn,
    activeSecondaryColumn,
    scrollPositionRef,
    headerPositionRef,
    mainColumn,
    activeColumn,
    heightOfHeaderRow,
  } = useMobileCheckboxes(config, sort, sortBy)

  ///////////////////

  const handleCheck = ({
    checked,
    dataObj,
    name,
    index,
  }: {
    checked: boolean
    dataObj?: DataItem
    name?: string
    index?: number
  }) => {
    if (isMounted() && checked) {
      if (name === 'all') {
        data?.length > 0 && setCheckAll(true)
        setSelectedBoxes(data)
        setUnselectedBoxes([])
      } else if (dataObj && index !== undefined) {
        setSelectedBoxes([...selectedBoxes, dataObj])
        setUnselectedBoxes([
          ...unselectedBoxes.slice(0, index),
          ...unselectedBoxes.slice(index + 1),
        ])
      }
    } else if (isMounted()) {
      if (name === 'all') {
        setCheckAll(false)
        setSelectedBoxes([])
        setUnselectedBoxes(data)
      } else if (dataObj && index !== undefined) {
        checkAll && setCheckAll(false)
        setSelectedBoxes([
          ...selectedBoxes.slice(0, index),
          ...selectedBoxes.slice(index + 1),
        ])
        setUnselectedBoxes([dataObj, ...unselectedBoxes])
      }
    }
  }

  const sortCheckedBoxes = useCallback(
    (sortingObj: SortByProps) => {
      if (isMounted()) {
        const boxes = [...selectedBoxes]
        const changeValue =
          sortingObj.prop.substring(0, 8) === 'change__' ? 'change' : 'value'
        boxes.sort((a, b) => {
          const first =
            changeValue === 'change'
              ? // @ts-expect-error this needs to be here to avoid cascading a type issue up the chain with extending generics etc
                a[sortingObj.prop.substring(8)]
              : // @ts-expect-error this needs to be here to avoid cascading a type issue up the chain with extending generics etc
                a[sortingObj.prop]
          const second =
            changeValue === 'change'
              ? // @ts-expect-error this needs to be here to avoid cascading a type issue up the chain with extending generics etc
                b[sortingObj.prop.substring(8)]
              : // @ts-expect-error this needs to be here to avoid cascading a type issue up the chain with extending generics etc
                b[sortingObj.prop]
          const flip = stringColumns?.includes(sortingObj.prop)
          if (first?.[changeValue] === undefined) {
            if (first > second) {
              return (sortingObj.flip || flip) && !(sortingObj.flip && flip)
                ? 1
                : -1
            } else if (second > first) {
              return (sortingObj.flip || flip) && !(sortingObj.flip && flip)
                ? -1
                : 1
            } else {
              return 0
            }
          } else {
            if (first[changeValue] > second[changeValue]) {
              return (sortingObj.flip || flip) && !(sortingObj.flip && flip)
                ? 1
                : -1
            } else if (second[changeValue] > first[changeValue]) {
              return (sortingObj.flip || flip) && !(sortingObj.flip && flip)
                ? -1
                : 1
            } else {
              return 0
            }
          }
        })
        setSelectedBoxes(boxes)
      }
    },
    [isMounted, selectedBoxes, setSelectedBoxes, stringColumns]
  )

  // update check all when everything / nothing is selected, and when one is deselected from a check all state
  useEffect(() => {
    if (isMounted()) {
      if (
        selectedBoxes.length === data.length &&
        // hasMore prevents checkall updating when only the first 20 items are selected
        !hasMore &&
        selectedBoxes.length > 0 &&
        unselectedBoxes.length === 0 &&
        !checkAll
      ) {
        setCheckAll(true)
      } else if (unselectedBoxes.length > 0 && checkAll) {
        setCheckAll(false)
      }
      // check all shoudldn't be set if there isn't data
      else if ((data.length === 0 || !hasData) && checkAll && !loading) {
        setCheckAll(false)
      }
    }
  }, [
    checkAll,
    data.length,
    hasData,
    hasMore,
    isMounted,
    loading,
    selectedBoxes.length,
    setCheckAll,
    unselectedBoxes.length,
  ])

  // return to default sort if everything is unchecked or checked
  useEffect(() => {
    if (isMounted() && data.length) {
      if (
        unselectedBoxes.length === data.length &&
        unselectedBoxes.length > 0
      ) {
        setUnselectedBoxes(data)
      } else if (
        selectedBoxes.length === data.length &&
        unselectedBoxes.length === 0
      ) {
        setSelectedBoxes((prev) => {
          if (prev.length !== data.length) {
            return data
          } else {
            return prev
          }
        })
      }
    }
  }, [
    data,
    isMounted,
    selectedBoxes.length,
    setSelectedBoxes,
    setUnselectedBoxes,
    unselectedBoxes.length,
  ])

  // The 2 useEffects below need to be separate to prevent an infinite loop of rerendering

  // update table data when data loads / changes - set data to checked list if checkall is true
  useEffect(() => {
    if (data.length && isMounted()) {
      if (checkAll) {
        setSelectedBoxes((prev) => {
          if (prev.length !== data.length) {
            return data
          } else {
            return prev
          }
        })
      }
    }
  }, [checkAll, data, isMounted, setSelectedBoxes])

  // update table data when data loads / changes - set data to unchecked list if checkall is false
  useEffect(() => {
    if (data && isMounted() && !checkAll) {
      setUnselectedBoxes(data)
    }
    // We don't want checkAll in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isMounted, setUnselectedBoxes])

  // handle sorting checked boxes when table sort changes along with if checkall is true
  useEffect(() => {
    if (isMounted() && !isEqual(sortBy, sortObj)) {
      if (checkAll) {
        if (data.length > 0) {
          setSelectedBoxes(data)
        }
      } else {
        if (selectedBoxes.length > 0) {
          sortCheckedBoxes(sortBy)
        } else {
          setUnselectedBoxes(data)
        }
      }
      setSortObj(sortBy)
    }
  }, [
    checkAll,
    data,
    isMounted,
    selectedBoxes.length,
    setSelectedBoxes,
    setUnselectedBoxes,
    sortBy,
    sortCheckedBoxes,
    sortObj,
  ])

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = debounce(() => {
      setShowStickyClasses((tableWidth ?? 0) < (innerTableWidth ?? 0))
    }, 250)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [tableWidth, innerTableWidth, hasData, config])

  // infinite scroll / pagination
  useEffect(() => {
    if (!loading && infiniteLoadRef.current && hasMore && successStatus) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              getData()
            }
          })
        },
        // Threshold visibility reduced because some report doesn't have 40% visibility of ListLoading,
        // hence pagination is not working for them e.g, Traffic Destiny & Traffic Brand Performance
        { threshold: 0.3 }
      )

      observer.observe(infiniteLoadRef.current)

      return () => {
        observer.disconnect()
      }
    }
    // loading dependency was needed for a corner case encountered,
    // when we select all checkboxes, then the observer was
    // unable to update the value and infiniteref.current remains NULL forever
  }, [hasMore, successStatus, getData, loading])

  return (
    <>
      <div
        ref={bulkActionsRef}
        className={showStickyClasses ? styles.stickyClasses : ''}
      >
        {isMobileView ? (
          <>
            {sortColumnsCount >= 3 && (
              <MobileColumnPicker
                config={config}
                localStorageName={localStorageName}
                sort={sort}
                sortBy={sortBy}
                updateActiveColumn={updateActiveColumn}
                activeSecondaryColumn={activeSecondaryColumn}
                scrollPositionRef={scrollPositionRef}
              />
            )}
            {activeFilters && removeFilters && (
              <TableFilter
                activeFilters={activeFilters}
                remove={removeFilters}
              />
            )}
            <div className={styles.dataTable}>
              {/* TABLE HEADER WITH 2 COLUMNS */}
              <MobileTableHeader
                headerPositionRef={headerPositionRef}
                mainColumn={mainColumn}
                activeColumn={activeColumn}
                hasData={hasData}
                sort={sort}
                sortBy={sortBy}
                localStorageName={localStorageName}
                activeFilters={activeFilters}
                activeSecondaryColumn={activeSecondaryColumn}
                checkboxProps={{
                  checkAll,
                  loading,
                  handleCheck,
                }}
              />

              {/*********** DATA ROWS ***********/}
              {
                <div>
                  {/* Selected Boxes Group Header */}
                  {selectedBoxes.length > 0 && (
                    <div
                      className={`${color['gray']} ${backgroundColor['gray']} ${styles.selectedHeader}`}
                      style={headerStyle(
                        false,
                        isMobileView,
                        heightOfHeaderRow
                      )}
                    >
                      {`Selected ${
                        checkAll ? 'All' : '(' + selectedBoxes.length + ')'
                      }`}
                      <Button
                        as='button'
                        styleType='text-blue'
                        disabled={loading}
                        onClick={() => {
                          setSelectedBoxes([])
                          setUnselectedBoxes(data)
                          setCheckAll(false)
                          refreshData()
                        }}
                        className={mobileStyles.clear}
                      >
                        Clear
                      </Button>
                    </div>
                  )}

                  {/* Selected Boxes Display */}
                  {selectedBoxes?.map((data, index) => (
                    <React.Fragment key={`${index}_${data?.[dataKey]}`}>
                      <MobileTableRow
                        hasCheckboxes
                        loading={loading}
                        checkboxCallout={handleCheck}
                        checked={true}
                        activeColumn={activeColumn}
                        mainColumn={mainColumn}
                        columns={config}
                        data={data}
                        sortBy={sortBy}
                        rowIndex={index}
                        scrollPositionRef={scrollPositionRef}
                        headerPositionRef={headerPositionRef}
                      />
                    </React.Fragment>
                  ))}

                  {/* Unselected Boxes Group Header */}
                  {selectedBoxes.length > 0 && (
                    <div
                      className={`${color['gray']} ${backgroundColor['gray']} ${styles.horizontalPadding} ${styles.verticalPadding}`}
                      style={headerStyle(
                        false,
                        isMobileView,
                        heightOfHeaderRow
                      )}
                    >
                      Unselected
                    </div>
                  )}

                  {/* Unselected Boxes Display */}
                  {!loading &&
                    unselectedBoxes?.map((data, index) => (
                      <React.Fragment key={`${index}_${data?.[dataKey]}`}>
                        <MobileTableRow
                          hasCheckboxes
                          loading={loading}
                          checkboxCallout={handleCheck}
                          checked={false}
                          activeColumn={activeColumn}
                          mainColumn={mainColumn}
                          columns={config}
                          data={data}
                          sortBy={sortBy}
                          rowIndex={index}
                          scrollPositionRef={scrollPositionRef}
                          headerPositionRef={headerPositionRef}
                        />
                      </React.Fragment>
                    ))}
                  {/* This instance of ListLoading is here so checked boxes stay checked even if new data loads */}
                  {loading && selectedBoxes.length > 0 && (
                    <div className={styles.verticalMargin}>
                      <ListLoading longList />
                    </div>
                  )}
                  {hasMore && (
                    <div ref={infiniteLoadRef} className={styles.topMargin}>
                      <ListLoading />
                    </div>
                  )}
                </div>
              }
              {selectedBoxes.length === 0 && loading && (
                <div className={styles.topMargin}>
                  <ListLoading longList />
                </div>
              )}
            </div>
          </>
        ) : (
          <StickyTableContainer
            hasData={hasData}
            loading={loading}
            customHeight={customHeight}
            customWidth={customWidth}
            widthOffset={widthOffset}
          >
            {activeFilters && removeFilters && (
              <TableFilter
                activeFilters={activeFilters}
                remove={removeFilters}
              />
            )}
            <StickyTable
              stickyHeaderCount={stickyTableHeaderCount(stickyTableConfig)}
              leftStickyColumnCount={getStickyLeftCount(stickyTableConfig)}
              rightStickyColumnCount={getStickyRightCount(
                stickyTableConfig,
                !!customColumnProps
              )}
              borderWidth={0}
              wrapperRef={tableRef}
              className={hasData ? 'show-scrollbar' : ''}
            >
              {/**************************** HEADER ROW ****************************/}
              <Row className={`sticky-table-header ${styles.headerRow}`}>
                <Cell className='checkbox_width'>
                  <Checkbox
                    name='checkbox-campaign'
                    stateName='all'
                    checked={checkAll}
                    disabled={loading}
                    callout={(name, value) =>
                      handleCheck({ checked: value, name })
                    }
                    label=''
                  />
                </Cell>
                {config.map(
                  (
                    th: ConfigItemType<DataItem, Record<string, unknown>>,
                    i: number
                  ) => {
                    const lastLeftStickyColumn = stickyTableConfig?.left
                        ? stickyTableConfig?.left - 1
                        : 0,
                      firstRightStickyColumn =
                        config &&
                        stickyTableConfig?.right &&
                        config.length - stickyTableConfig?.right
                    return (
                      <Cell
                        key={`${th.label}_${i}`}
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
                            ? 'first-sticky-cell-right ' +
                              styles.extraLeftPadding
                            : ''
                        } ${th.className ?? ''}`.trim()}
                      >
                        {(!th.noSort && hasData) || th.filter ? (
                          <SortColumn
                            label={th.label}
                            {...(th.options
                              ? { options: th.options }
                              : { propName: th.name ?? '' })}
                            sorter={sort}
                            customClass={th.className}
                            active={sortBy}
                            localStorageName={localStorageName}
                            lowerCaseParam={th.lowerCaseParam}
                            tooltip={th.tooltip}
                            filter={th.filter}
                            activeFilters={activeFilters}
                            noSort={th.noSort}
                          />
                        ) : (
                          <UnsortedColumn
                            label={th.label}
                            tooltip={th.tooltip}
                          />
                        )}
                      </Cell>
                    )
                  }
                )}
                {customColumnProps && (
                  <Cell
                    className={`${styles.actionItems} ${customColumnStickyStyles}`}
                  >
                    <CustomizeTableColumns
                      options={customColumnProps.list}
                      selected={customColumnProps.selected}
                      selectionCallout={customColumnProps.callout}
                      setToDefaultCallout={
                        customColumnProps.setToDefaultCallout
                      }
                    />
                  </Cell>
                )}
              </Row>

              {/**************************** DATA ROWS ****************************/}
              {
                <>
                  {/* Selected Boxes Group Header */}
                  {selectedBoxes.length > 0 && (
                    <Row id={`header-selected-${selectedBoxes.length}`}>
                      <Cell
                        className={`${color['gray']} ${backgroundColor['gray']}
                      checkbox_width`}
                        style={headerStyle(false, isMobileView)}
                      ></Cell>
                      {config.map((_config, index) => {
                        return (
                          <Cell
                            key={_config.name + ' Selected Header'}
                            className={`${color['gray']} ${
                              backgroundColor['gray']
                            } ${hasStickyColumnStyle({
                              colIndex: index + 2,
                              stickyLeftColumn: getStickyLeftCount(),
                              stickyRightColumn: stickyTableConfig?.right,
                              tableHeadersLength: config.length + 1,
                            })}`}
                            style={{
                              ...headerStyle(
                                (stickyTableConfig?.left ?? 1) - index > 0,
                                isMobileView
                              ),
                              ...(index === config.length - 1
                                ? { textAlign: 'right' }
                                : {}),
                              ...(_config.style ? _config.style : {}),
                            }}
                          >
                            {/* FIRST COLUMN -- CHECKBOXES */}
                            {index === 0
                              ? `Selected ${
                                  checkAll
                                    ? 'All'
                                    : '(' + selectedBoxes.length + ')'
                                }`
                              : ''}

                            {/* LAST COLUMN -- ACTION BUTTON -- CLEAR or CUSTOM JSX */}
                            {index === config.length - 1 && (
                              <Button
                                as='button'
                                styleType='text-blue'
                                disabled={loading}
                                onClick={() => {
                                  setSelectedBoxes([])
                                  setUnselectedBoxes(data)
                                  setCheckAll(false)
                                  refreshData()
                                }}
                              >
                                Clear
                              </Button>
                            )}
                          </Cell>
                        )
                      })}
                      {customColumnProps && (
                        <Cell
                          className={`${backgroundColor['gray']} ${customColumnStickyStyles}`}
                          style={headerStyle(false, isMobileView)}
                        />
                      )}
                    </Row>
                  )}

                  {/* Selected Boxes Display */}
                  {selectedBoxes?.map((_data, rowIndex) => {
                    return (
                      <Row key={`${rowIndex}_${_data?.[dataKey]}`}>
                        <Cell
                          key={`checkbox-${_data[dataKey]}`}
                          className='checkbox_width'
                        >
                          <Checkbox
                            name={`checkbox-${_data[dataKey]}`}
                            stateName='table_data'
                            checked={true}
                            disabled={loading}
                            callout={(name, value) =>
                              handleCheck({
                                checked: value,
                                dataObj: _data,
                                name,
                                index: rowIndex,
                              })
                            }
                            label=''
                            hideLabel
                          />
                        </Cell>

                        {config.map((c, index) => {
                          const cells = []
                          if (c.options) {
                            c.options.forEach((co) => {
                              cells.push(co.name)
                            })
                          }
                          if (c.name) {
                            cells.push(c.name)
                          }
                          return (
                            <Cell
                              key={`${_data[dataKey]}-${c.name}-${index}`}
                              className={`${activeCellClass({
                                cells: cells,
                                activeName: sortBy.prop,
                              })} ${hasStickyColumnStyle({
                                colIndex: index + 2,
                                stickyLeftColumn: getStickyLeftCount(),
                                stickyRightColumn: stickyTableConfig?.right,
                                tableHeadersLength: config.length + 1,
                              })} ${
                                c.cell.className
                                  ? typeof c.cell.className === 'string'
                                    ? c.cell.className
                                    : c.cell.className(_data)
                                  : ''
                              }
                          `}
                              style={{ ...(c?.style ? c.style : {}) }}
                            >
                              {c.cell.children(
                                { ..._data, sortProp: sortBy.prop },
                                rowIndex
                              )}
                            </Cell>
                          )
                        })}
                        {customColumnProps && (
                          <Cell
                            className={`${styles.actionItems} ${customColumnStickyStyles}`}
                          />
                        )}
                      </Row>
                    )
                  })}

                  {/* Unselected Boxes Group Header */}
                  {selectedBoxes.length > 0 && (
                    <Row id={`header-Unselected-${unselectedBoxes.length}`}>
                      <Cell
                        className={`${color['gray']} ${backgroundColor['gray']}
                      checkbox_width`}
                        style={headerStyle(false, isMobileView)}
                      ></Cell>
                      {config.map((_config, index) => {
                        return (
                          <Cell
                            key={_config.name + ' Unselected Header'}
                            className={`${color['gray']} ${
                              backgroundColor['gray']
                            } ${hasStickyColumnStyle({
                              colIndex: index + 2,
                              stickyLeftColumn: getStickyLeftCount(),
                              stickyRightColumn: stickyTableConfig?.right,
                              tableHeadersLength: config.length + 1,
                            })}`}
                            style={{
                              ...headerStyle(
                                (stickyTableConfig?.left ?? 1) - index > 0,
                                isMobileView
                              ),
                              ...(index === config.length - 1
                                ? { textAlign: 'right' }
                                : {}),
                              ...(_config.style ? _config.style : {}),
                            }}
                          >
                            {/* FIRST COLUMN -- CHECKBOXES */}
                            {index === 0 ? `Unselected` : ''}
                          </Cell>
                        )
                      })}
                      {customColumnProps && (
                        <Cell
                          className={`${backgroundColor['gray']} ${customColumnStickyStyles}`}
                          style={headerStyle(false, isMobileView)}
                        />
                      )}
                    </Row>
                  )}

                  {/* Unselected Boxes Display */}
                  {!loading &&
                    unselectedBoxes?.map((_data, rowIndex) => {
                      return (
                        <Row key={`${rowIndex}_${_data?.[dataKey]}`}>
                          <Cell
                            key={`checkbox-${_data[dataKey]}`}
                            className='checkbox_width'
                          >
                            <Checkbox
                              name={`checkbox-${_data[dataKey]}`}
                              stateName='table_data'
                              checked={false}
                              disabled={loading}
                              callout={(name, value) =>
                                handleCheck({
                                  checked: value,
                                  dataObj: _data,
                                  name,
                                  index: rowIndex,
                                })
                              }
                              label=''
                              hideLabel
                            />
                          </Cell>

                          {config.map((c, index) => {
                            const cells = []
                            if (c.options) {
                              c.options.forEach((co) => {
                                cells.push(co.name)
                              })
                            }
                            if (c.name) {
                              cells.push(c.name)
                            }
                            return (
                              <Cell
                                key={`${_data[dataKey]}-${c.name}-${index}`}
                                className={`${activeCellClass({
                                  cells: cells,
                                  activeName: sortBy.prop,
                                })} ${hasStickyColumnStyle({
                                  colIndex: index + 2,
                                  stickyLeftColumn: getStickyLeftCount(),
                                  stickyRightColumn: stickyTableConfig?.right,
                                  tableHeadersLength: config.length + 1,
                                })} ${
                                  c.cell.className
                                    ? typeof c.cell.className === 'string'
                                      ? c.cell.className
                                      : c.cell.className(_data)
                                    : ''
                                }
                            `}
                                style={{ ...(c?.style ? c.style : {}) }}
                              >
                                {c.cell.children(
                                  { ..._data, sortProp: sortBy.prop },
                                  rowIndex
                                )}
                              </Cell>
                            )
                          })}
                          {customColumnProps && (
                            <Cell
                              className={`${styles.actionItems} ${customColumnStickyStyles}`}
                            />
                          )}
                        </Row>
                      )
                    })}
                  {/* This instance of ListLoading is here so checked boxes stay checked even if new data loads */}
                  {loading && selectedBoxes.length > 0 && (
                    <div className={styles.listLoadingWrapper}>
                      <ListLoading longList />
                    </div>
                  )}
                  {/* Infinite scroll / Pagination loader */}
                  {hasMore && (
                    <div
                      ref={infiniteLoadRef}
                      className={styles.listLoadingWrapper}
                    >
                      <ListLoading />
                    </div>
                  )}
                </>
              }
              {/* List loader only displays here when no checkboxes are selected */}
              {selectedBoxes.length === 0 && loading && (
                <div className={styles.listLoadingWrapper}>
                  <ListLoading longList />
                </div>
              )}
            </StickyTable>
          </StickyTableContainer>
        )}

        {!loading && !hasData && !hasMore && (
          <EmptyState
            primaryText={emptyStateProps?.primaryText || 'No Data Found'}
            secondaryText={
              emptyStateProps?.secondaryText ||
              'No data found for the selected time period.'
            }
            background={emptyStateProps?.background ?? true}
            buttonProps={emptyStateProps?.buttonProps}
            icon={emptyStateProps?.icon}
          />
        )}
      </div>
      {bulkActionsVisible && bulkActions}
    </>
  )
}

export default CheckboxTable
