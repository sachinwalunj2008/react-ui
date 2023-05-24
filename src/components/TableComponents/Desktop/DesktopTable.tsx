import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  activeCellClass,
  Button,
  Cell,
  Checkbox,
  hasStickyColumnStyle,
  hasValue,
  Icon,
  ListLoading,
  Row,
  StickyTable,
  StickyTableContainer,
} from '../../../module'
import { debounce } from '../../../services/HelperServiceTyped'
import { getDataGroups } from '../helperFunctions'
import type {
  ConfigItemType,
  groupAccordionType,
  GroupColorType,
  StandardTableProps,
} from '../StandardTableTypes'
import TableFilter from '../TableFilter'
import NestedRow from './../NestedRow'

import UnsortedColumn from '../../UnsortedColumn/UnsortedColumn'
import { backgroundColor, color } from '../StandardTable'
import styles from '../_table.module.scss'
import SortColumn from '../../SortColumn/SortColumn'
import { Tooltip } from '../../../module'
import { TooltipProps } from '../../Tooltip/Tooltip'
import CustomizeTableColumns from '../CustomizeTableColumns/CustomizeTableColumns'

type DesktopTableProps<
  DataItem,
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
> = Omit<
  StandardTableProps<DataItem, ConfigItem>,
  'tableId' | 'noDataFields'
> & {
  localStorageName: string
  totalRowKey: string
  isGroupHeader?: boolean
}

type GroupHeader<DataItem> = DataItem & {
  /** The string value to display in the group Header row (groupHeader) */
  groupHeader?: string | ((count: number) => string)
  /** Custom JSX to display info icon in the group Header row (groupHeader) */
  tooltipContent?: TooltipProps['tooltipContent']
  /** The color of the group header row */
  type?: GroupColorType
  /** boolean to add Clear button in the selection */
  includeClearButton?: boolean
  /** Function to perform the required action after clearing the selections */
  clearCallout?: () => void
  /** indicates if the item has been selected by the user using a checkbox */
  checked?: boolean
  /** Custom JSX at the last column of the group header to replace clearButton */
  customClearButton?: React.ReactNode

  // TO ADD DETAILS TO GROUP HEADER INCLUDE THE FOLLOWING PROPS ON THE HEADER OBJECT:
  /** Boolean value; only added to Header rows  */
  isGroupHeader?: boolean
  /** Toggle to display header details if header details exist */
  displayHeaderData?: boolean
  /** Custom JSX to display in the last column of the table */
  lastColumn?: React.ReactNode
  /**
   * Number to associate the group header with the right group; groups are identified in order
   * of appearance in the table (index + 1, so the first group is 1, the second is 2, etc.)
   */
  groupNum?: number
  /** Adds an expand/collapse functionality to entire groups  */
  groupAccordion?: groupAccordionType
  /** Unique key to identify each group */
  groupDataKey?: string
}

const headerStyle = (isStickyLeftColumn: boolean, hasTotalRow: boolean) => ({
  position: 'sticky',
  top: hasTotalRow
    ? '123px' /** The height of the sticky header is set to 126px with total row */
    : '57px' /** The height of the sticky header is set to 57px in full desktop view */,
  zIndex: isStickyLeftColumn ? 4 : 3,
})

const DesktopTable = <
  DataItem extends {
    groupDataKey?: string
  },
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
>({
  data,
  config,
  dataKey,
  nestedDataKey,
  groups,
  showGroups,
  hasData,
  hasMore,
  successStatus,
  loading,
  nestedRowProps,
  customColumnProps,
  headerChildren,
  stickyTableConfig,
  customHeight,
  customWidth,
  widthOffset,
  removeFilters,
  activeFilters,
  sort,
  sortBy,
  getData,
  localStorageName,
  totalRowKey,
  shortListLoading,
  hasCheckboxes,
  handleCheckedBoxes,
  isResetCheckboxes,
  equalColumnWidth,
}: DesktopTableProps<DataItem, ConfigItem>): JSX.Element => {
  const infiniteLoadRef = useRef<HTMLDivElement>(null),
    tableRef = useRef<HTMLDivElement>(null),
    tableWidth = tableRef.current?.clientWidth,
    innerTableWidth = tableRef.current?.querySelector(
      '.sticky-table-table'
    )?.clientWidth

  const [displayData, setDisplayData] = useState<GroupHeader<DataItem>[]>(data),
    [selectedNestedRowData, setSelectedNestedRowData] = useState<
      DataItem[keyof DataItem][]
    >([])

  // State to maintain collapsed groups
  const [collapsedGroups, setCollapsedGroups] = useState<Array<string>>([])

  const [checkedBoxes, setCheckedBoxes] = useState<DataItem[]>([]),
    [checkAll, setCheckAll] = useState(false),
    [makeCallout, setMakeCallout] = useState<'' | 'single' | 'checkAll'>(''),
    mounted = useRef(true)

  const [state, setState] = useState({
      showStickyClasses: false,
    }),
    { showStickyClasses } = state,
    stickyTableHeaderCount = () => {
      let count = 1
      // order matters here; if totalRowKey is present, it should be used first
      if (totalRowKey) {
        return 2
      }

      if (showGroups) return 1 // showGroups should override any header config that is present

      if (stickyTableConfig?.header) {
        count = stickyTableConfig.header
      }
      return count
    }

  // This is temporary fix until we refactor the standard table
  useEffect(() => {
    if (isResetCheckboxes) {
      setCheckAll(false)
      setCheckedBoxes([])
    }
  }, [isResetCheckboxes])

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
  }, [tableWidth, innerTableWidth, hasData, config])

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

  useEffect(() => {
    /** SET DATA GROUPS WITH VALUES */
    if (showGroups && groups) {
      const groupData: DataItem[] = getDataGroups(
        data,
        groups,
        { hasCheckboxes, checkedBoxes },
        totalRowKey
      )
      setDisplayData(groupData)
    } else {
      setDisplayData(data)
    }
  }, [data, groups, showGroups, totalRowKey, checkedBoxes, hasCheckboxes])

  useEffect(() => {
    // check new data for checkboxes previously selected to update this component state
    const dataRecordOne: DataItem & { checked?: boolean } = data?.[0]
    if (dataRecordOne?.checked !== undefined) {
      if (data?.length && hasCheckboxes) {
        let noCheckedValues = 0
        const initialCheckedBoxes = data.filter(
          (item: DataItem & { checked?: boolean }) => {
            if (item && !('checked' in item)) {
              noCheckedValues++
            }
            return item?.checked
          }
        )
        if (data?.length !== noCheckedValues)
          setCheckedBoxes(initialCheckedBoxes)
      }

      // when data changes, check if there are items and if all items are checked; if so, update the checkAll state
      setCheckAll(
        data?.length > 0 &&
          data.every((item: DataItem & { checked?: boolean }) => item?.checked)
      )
    }
  }, [data, hasCheckboxes])

  const handleNestedData = (dataItem: DataItem, isOpen: boolean) => {
    if (nestedDataKey) {
      const selectedNestedRowDataCopy = [...selectedNestedRowData]
      const index = selectedNestedRowDataCopy?.indexOf(dataItem[nestedDataKey])
      if (index !== -1) {
        selectedNestedRowDataCopy?.splice(index, 1)
      } else {
        selectedNestedRowDataCopy?.push(dataItem[nestedDataKey])
      }
      if (!isOpen) {
        nestedRowProps?.getNestedData(dataItem[nestedDataKey])
      } else {
        nestedRowProps?.removeNestedData?.(dataItem[nestedDataKey])
      }
      setSelectedNestedRowData(selectedNestedRowDataCopy)
    }
  }

  const getStickyRightCount = () => {
    let stickyCount: number = stickyTableConfig?.right ?? 0
    stickyCount += nestedRowProps || customColumnProps ? 1 : 0
    return stickyCount
  }

  const customColumnStickyStyles =
    getStickyRightCount() === 1
      ? `first-sticky-cell-right ${styles.extraLeftPadding}`
      : ''

  const getStickyLeftCount = () => {
    let stickyCount: number = stickyTableConfig?.left ?? 1
    stickyCount += hasCheckboxes ? 1 : 0
    return stickyCount
  }

  const handleCheck = (
    value: boolean,
    dataObj: DataItem & { name?: string },
    name?: string
  ) => {
    const index = checkedBoxes.findIndex(
      (element: DataItem & { name?: string }) =>
        dataKey
          ? element?.[dataKey] === dataObj?.[dataKey]
          : element['name'] === dataObj['name']
    )
    let updatedCheckedBoxes: DataItem[] = []
    if (value && mounted.current) {
      if (
        name === 'all' ||
        (checkedBoxes.length === data?.length - 1 && !hasMore)
      ) {
        data?.length > 0 && setCheckAll(true)
        updatedCheckedBoxes = [...data]
        setCheckedBoxes(updatedCheckedBoxes)
        setDisplayData((displayData) => [
          ...displayData.map((item) => ({ ...item, checked: true })),
        ])
        setMakeCallout('checkAll')
      } else {
        setCheckedBoxes((prevState) => {
          updatedCheckedBoxes = [
            ...prevState,
            typeof dataObj === 'object'
              ? { ...dataObj, checked: value }
              : dataObj,
          ]
          return updatedCheckedBoxes
        })
        setDisplayData((displayData) => {
          return index >= 0
            ? [
                ...displayData.slice(0, index),
                { ...dataObj, checked: value },
                ...displayData.slice(index + 1),
              ]
            : displayData
        })
        setMakeCallout('single')
      }
    } else {
      if (mounted.current) {
        setCheckAll(false)
        if (name === 'all') {
          setCheckedBoxes([])
          setDisplayData((displayData) => {
            updatedCheckedBoxes = [
              ...displayData.map((item) => ({ ...item, checked: false })),
            ]
            return updatedCheckedBoxes
          })
          setMakeCallout('checkAll')
        } else {
          updatedCheckedBoxes = [
            ...checkedBoxes.slice(0, index),
            ...checkedBoxes.slice(index + 1),
          ]
          setCheckedBoxes(updatedCheckedBoxes)
          setDisplayData((displayData) => {
            return index >= 0
              ? [
                  ...displayData.slice(0, index),
                  { ...dataObj, checked: value },
                  ...displayData.slice(index + 1),
                ]
              : displayData
          })
          setMakeCallout('single')
        }
      }
    }
    // handleCheckedBoxes callout moved to a useEffect because this method utilizes async setState methods causing inconsistent display data
  }

  useEffect(() => {
    // must wait for checkboxes to update on state before making call to handleCheckedBoxes
    if (makeCallout) {
      makeCallout === 'checkAll' && handleCheckedBoxes?.(checkedBoxes, checkAll)
      makeCallout === 'single' && handleCheckedBoxes?.(checkedBoxes)
      setMakeCallout('')
    }
  }, [checkAll, checkedBoxes, handleCheckedBoxes, makeCallout])

  useEffect(() => {
    // Initial expanded/collapsed groups maintaining in component state
    if (showGroups) {
      const collapsedGroupList = groups
        ?.filter(
          (group) =>
            group?.groupAccordion?.groupKey &&
            group?.groupAccordion?.isCollapsed
        )
        .map((group) =>
          group.groupAccordion?.groupKey ? group.groupAccordion?.groupKey : ''
        )

      setCollapsedGroups(collapsedGroupList ?? [])
    } else if (loading) {
      setCollapsedGroups([])
    }
  }, [groups, showGroups, loading])

  const isChecked = (data: DataItem & { name?: string }) =>
    checkedBoxes.find((c: DataItem & { name?: string }) => {
      return dataKey ? c?.[dataKey] === data?.[dataKey] : c.name === data.name
    })

  // Update expanded/collapsed accordion
  const updateAccordion = (groupName: string) => {
    if (typeof groupName === 'string' && collapsedGroups?.includes(groupName)) {
      const filteredGroups = collapsedGroups?.filter(
        (item) => item !== groupName
      )
      setCollapsedGroups(filteredGroups)
    } else if (typeof groupName === 'string') {
      setCollapsedGroups((collapsedGroups) => [
        ...(collapsedGroups ? collapsedGroups : ''),
        groupName,
      ])
    }
  }

  const equalWidthAmount = useMemo(
    () =>
      tableWidth &&
      tableWidth / config?.length -
        (customColumnProps ? 36 : 0) -
        (nestedRowProps ? 32 : 0) -
        (hasCheckboxes ? 42 : 0),

    [
      config?.length,
      tableWidth,
      customColumnProps,
      nestedRowProps,
      hasCheckboxes,
    ]
  )

  return (
    <div className={showStickyClasses ? styles.stickyClasses : ''}>
      <StickyTableContainer
        hasData={hasData}
        loading={loading}
        customHeight={customHeight}
        customWidth={customWidth}
        widthOffset={widthOffset}
      >
        {/* TODO: move filters to the top Table component once the mobile version of TableFilter has been designed. */}
        {activeFilters && removeFilters && (
          <TableFilter activeFilters={activeFilters} remove={removeFilters} />
        )}
        <StickyTable
          stickyHeaderCount={stickyTableHeaderCount()}
          leftStickyColumnCount={getStickyLeftCount()}
          rightStickyColumnCount={getStickyRightCount()}
          borderWidth={0}
          wrapperRef={tableRef}
          className={hasData ? 'show-scrollbar' : ''}
        >
          {/**************************** HEADER ROW ****************************/}
          <Row className={`sticky-table-header ${styles.headerRow}`}>
            {hasCheckboxes ? (
              <Cell className='checkbox_width'>
                <Checkbox
                  name='checkbox-campaign'
                  stateName='all'
                  checked={checkAll}
                  // @ts-expect-error add types
                  callout={(name, value) => handleCheck(value, data, name)}
                  label=''
                />
              </Cell>
            ) : (
              headerChildren?.jsx
            )}
            {config.map((th: ConfigItem, i: number) => {
              const lastLeftStickyColumn =
                  // If headerChildren exist, then we need to subtract the number of headerChildren and then we naturally subtract 1 to account for the 0 index in arrays.
                  stickyTableConfig?.left
                    ? stickyTableConfig?.left - (headerChildren?.count ?? 0) - 1
                    : 0,
                firstRightStickyColumn =
                  config &&
                  stickyTableConfig?.right &&
                  config.length - stickyTableConfig?.right
              return (
                <Cell
                  key={`${th.label}_${i}`}
                  style={{
                    ...th.style,
                    ...(equalColumnWidth && !th?.isButton
                      ? { minWidth: `${equalWidthAmount}px` }
                      : {}),
                  }}
                  className={`${
                    lastLeftStickyColumn === i ? 'last-sticky-cell-left' : ''
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
                  {(!th.noSort && hasData) ||
                  th.filter ||
                  (th?.columnHeaderSubContent && hasData) ? (
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
                      columnHeaderSubContent={th.columnHeaderSubContent}
                    />
                  ) : (
                    <UnsortedColumn
                      label={th.label}
                      tooltip={th.tooltip}
                      className={th.className ?? ''}
                    />
                  )}
                </Cell>
              )
            })}
            {nestedRowProps && (
              <Cell
                className={`${styles.actionItems} ${
                  customColumnProps ? '' : customColumnStickyStyles
                }`}
              />
            )}
            {customColumnProps && (
              <Cell
                className={`${styles.actionItems} ${customColumnStickyStyles}`}
              >
                <CustomizeTableColumns
                  options={customColumnProps.list}
                  selected={customColumnProps.selected}
                  selectionCallout={customColumnProps.callout}
                  setToDefaultCallout={customColumnProps.setToDefaultCallout}
                />
              </Cell>
            )}
          </Row>

          {/**************************** DATA ROWS ****************************/}
          {!loading ? (
            hasData && (
              <>
                {displayData?.map((_data, rowIndex) => {
                  const groupKey = _data?.groupDataKey
                  if (
                    typeof groupKey === 'string' &&
                    collapsedGroups?.includes(groupKey) &&
                    !_data?.isGroupHeader
                  ) {
                    // Toggle classes based on this prop to expand/collapse accordion
                    _data.groupAccordion = {
                      ..._data.groupAccordion,
                      isCollapsed: true,
                    } as groupAccordionType
                  } else if (_data?.groupAccordion) {
                    _data.groupAccordion = {
                      ..._data.groupAccordion,
                      isCollapsed: false,
                    } as groupAccordionType
                  }
                  return (
                    <React.Fragment key={`${rowIndex}_${_data?.[dataKey]}`}>
                      {/* Set up a new row and cell set for Header rows...
                            these rows can have their own styles that are more easily styled
                            and the cells will not have any values in them so they can't display incorrect
                            values, buttons or anything else that has been add to the config */}
                      {showGroups && _data?.isGroupHeader ? (
                        <Row
                          id={`header-${
                            (typeof _data.groupHeader === 'function'
                              ? _data.groupHeader(checkedBoxes.length)
                              : _data.groupHeader) ?? 'groupHeader'
                          }`}
                        >
                          {hasCheckboxes && (
                            <Cell
                              className={`${color[_data.type ?? 'gray']} ${
                                backgroundColor[_data.type ?? 'gray']
                              } checkbox_width`}
                              style={{
                                ...headerStyle(false, !!totalRowKey),
                              }}
                            />
                          )}
                          {config.map((_config, index) => {
                            return (
                              <Cell
                                key={
                                  index +
                                  ((typeof _data.groupHeader === 'function'
                                    ? _data.groupHeader(checkedBoxes.length)
                                    : _data.groupHeader) ?? 'groupHeader')
                                }
                                className={`${color[_data.type ?? 'gray']} ${
                                  backgroundColor[_data.type ?? 'gray']
                                } ${hasStickyColumnStyle({
                                  colIndex: hasCheckboxes
                                    ? index + 2
                                    : index + 1,
                                  stickyLeftColumn: getStickyLeftCount(),
                                  stickyRightColumn: stickyTableConfig?.right,
                                  tableHeadersLength: hasCheckboxes
                                    ? config.length + 1
                                    : config.length,
                                })}`}
                                style={{
                                  ...headerStyle(
                                    (stickyTableConfig?.left ?? 1) - index > 0,
                                    !!totalRowKey
                                  ),
                                  ...(index === config.length - 1 &&
                                  _data.includeClearButton
                                    ? { textAlign: 'right' }
                                    : {}),
                                  ...(_config.cell?.style ?? {}),
                                  ...(equalColumnWidth && !_config?.isButton
                                    ? { minWidth: `${equalWidthAmount}px` }
                                    : {}),
                                }}
                              >
                                {/* FIRST COLUMN -- CHECKBOXES */}
                                {index === 0 ? (
                                  typeof _data.groupHeader === 'function' ? (
                                    _data.groupHeader(checkedBoxes.length)
                                  ) : (
                                    <span className={styles.displayFlex}>
                                      {_data.groupHeader}
                                      {_data.tooltipContent && (
                                        <Tooltip
                                          position='auto'
                                          tooltipContent={_data.tooltipContent}
                                        >
                                          <Icon
                                            icon='info'
                                            customClass={styles.marginLeftIcon}
                                            size='12px'
                                          />
                                        </Tooltip>
                                      )}
                                    </span>
                                  )
                                ) : (
                                  ''
                                )}

                                {/* MIDDLE COLUMNS -- DISPLAY HEADER DATA VALUES (if they exist)  */}
                                {index > 0 &&
                                  index !== config.length - 1 &&
                                  _data?.displayHeaderData && (
                                    <div className={styles.fontWeightSemiBold}>
                                      {_config.cell.children(_data)}
                                    </div>
                                  )}

                                {/* LAST COLUMN -- ACTION BUTTON -- CLEAR or CUSTOM JSX */}
                                {index === config.length - 1 &&
                                _data?.customClearButton ? (
                                  <>{_data?.customClearButton}</>
                                ) : (
                                  index === config.length - 1 &&
                                  _data.includeClearButton && (
                                    <Button
                                      as='button'
                                      styleType='text-blue'
                                      onClick={() => {
                                        setCheckedBoxes([])
                                        setCheckAll(false)
                                        _data?.clearCallout?.()
                                      }}
                                    >
                                      clear
                                    </Button>
                                  )
                                )}

                                <div className={styles.flexDisplay}>
                                  {index === config.length - 1 &&
                                    _data?.lastColumn && (
                                      <>{_data?.lastColumn}</>
                                    )}
                                  {/* Icon for accordion */}
                                  {index === config.length - 1 &&
                                    _data?.groupAccordion && (
                                      <Button
                                        as='unstyled'
                                        onClick={() =>
                                          _data?.groupAccordion &&
                                          updateAccordion(
                                            _data.groupAccordion.groupKey
                                          )
                                        }
                                      >
                                        <Icon
                                          icon='downCaret'
                                          customClass={`${styles.caret} ${
                                            typeof groupKey === 'string' &&
                                            !collapsedGroups?.includes(groupKey)
                                              ? styles.flipped
                                              : ''
                                          }`}
                                          size='16px'
                                        />
                                      </Button>
                                    )}
                                </div>
                              </Cell>
                            )
                          })}
                          {nestedRowProps && nestedDataKey && (
                            <Cell
                              className={`${
                                backgroundColor[_data.type ?? 'gray']
                              } ${styles.actionItems} ${
                                customColumnProps
                                  ? ''
                                  : customColumnStickyStyles
                              }`}
                              style={headerStyle(false, !!totalRowKey)}
                            />
                          )}
                          {customColumnProps && (
                            <Cell
                              className={`${
                                backgroundColor[_data.type ?? 'gray']
                              } ${customColumnStickyStyles}`}
                              style={headerStyle(false, !!totalRowKey)}
                            />
                          )}
                        </Row>
                      ) : (
                        <Row
                          key={`${_data?.[dataKey]}-${rowIndex}`}
                          style={
                            _data?.groupDataKey
                              ? _data?.groupAccordion?.isCollapsed
                                ? { display: 'none' }
                                : {}
                              : {}
                          }
                        >
                          {totalRowKey &&
                            _data?.[totalRowKey] &&
                            hasCheckboxes && (
                              <Cell
                                className={`${color[_data.type ?? 'gray']} ${
                                  backgroundColor[_data.type ?? 'gray']
                                }
                              checkbox_width`}
                                style={headerStyle(false, false)}
                              />
                            )}
                          {hasCheckboxes &&
                            !(totalRowKey && _data?.[totalRowKey]) && (
                              <Cell
                                key={`checkbox-${_data?.[dataKey]}`}
                                className='checkbox_width'
                              >
                                <Checkbox
                                  name={`checkbox-${_data?.[dataKey]}`}
                                  stateName='table_data'
                                  checked={
                                    checkAll || hasValue(isChecked(_data))
                                  }
                                  callout={(name, value) =>
                                    handleCheck(value, _data, name)
                                  }
                                  label=''
                                  hideLabel
                                />
                              </Cell>
                            )}

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
                                key={`${
                                  _data?.[dataKey] ||
                                  `missing_${String(dataKey)}`
                                }-${c.name}-${index}`}
                                className={`${activeCellClass({
                                  cells: cells,
                                  activeName: sortBy.prop,
                                })} ${hasStickyColumnStyle({
                                  colIndex: hasCheckboxes
                                    ? index + 2
                                    : index + 1,
                                  stickyLeftColumn: getStickyLeftCount(),
                                  stickyRightColumn: stickyTableConfig?.right,
                                  tableHeadersLength: hasCheckboxes
                                    ? config.length + 1
                                    : config.length,
                                })} ${
                                  totalRowKey && _data?.[totalRowKey]
                                    ? 'bgc-lighter-gray'
                                    : ''
                                } ${
                                  c.cell.className
                                    ? typeof c.cell.className === 'string'
                                      ? c.cell.className
                                      : c.cell.className(_data)
                                    : ''
                                }
                                 `}
                                style={{
                                  ...(c?.cell?.style ?? {}),
                                }}
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
                              className={`${
                                totalRowKey && _data?.[totalRowKey]
                                  ? styles.lighterGrayBackground
                                  : ''
                              } ${styles.actionItems} ${
                                nestedRowProps ? '' : customColumnStickyStyles
                              }`}
                            />
                          )}
                          {nestedRowProps && nestedDataKey && (
                            <Cell
                              className={`${
                                styles.actionItems
                              } ${customColumnStickyStyles} ${
                                totalRowKey && _data?.[totalRowKey]
                                  ? styles.lighterGrayBackground
                                  : ''
                              }`}
                            >
                              {(!nestedRowProps?.showCaret ||
                                nestedRowProps?.showCaret(_data)) &&
                                !(totalRowKey && _data?.[totalRowKey]) && (
                                  <Button
                                    as='unstyled'
                                    onClick={() =>
                                      handleNestedData(
                                        _data,
                                        selectedNestedRowData.includes(
                                          _data[nestedDataKey]
                                        )
                                      )
                                    }
                                  >
                                    <Icon
                                      icon='downCaret'
                                      customClass={`${styles.caret} ${
                                        selectedNestedRowData.includes(
                                          _data[nestedDataKey]
                                        )
                                          ? styles.flipped
                                          : ''
                                      }`}
                                      size='16px'
                                    />
                                  </Button>
                                )}
                            </Cell>
                          )}
                        </Row>
                      )}
                      {nestedRowProps && nestedDataKey && (
                        <NestedRow
                          data={_data}
                          nestedDataKey={nestedDataKey}
                          nestedRowProps={nestedRowProps}
                          config={config}
                          sortBy={sortBy}
                          customColumnProps={customColumnProps}
                          stickyTableConfig={stickyTableConfig}
                          selectedNestedRowData={selectedNestedRowData}
                          totalRowKey={totalRowKey}
                          showStickyClasses={showStickyClasses}
                        />
                      )}
                    </React.Fragment>
                  )
                })}
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
        {/* show gradient for more records */}
        {hasData ? (
          <div
            className={`${styles.bottomGradient} ${
              showStickyClasses
                ? styles.bottomGradientCustomHeight
                : styles.bottomGradientHeight
            }`}
          />
        ) : null}
      </StickyTableContainer>
    </div>
  )
}

export default DesktopTable
