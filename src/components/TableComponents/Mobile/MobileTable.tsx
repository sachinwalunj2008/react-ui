import React, { useEffect, useRef, useState } from 'react'
import { ListLoading, StandardTable } from '../../../module'
import { getDataGroups } from '../helperFunctions'
import { backgroundColor, color } from '../StandardTable'
import type { GroupHeader } from '../StandardTableTypes'
import { ConfigItemType, StandardTableProps } from '../StandardTableTypes'
import MobileColumnPicker from './MobileColumnPicker'
import MobileTableHeader from './MobileTableHeader'
import MobileTableRow from './MobileTableRow'
import { Tooltip, Icon } from '../../../module'
import styles from './_mobile-table.module.scss'
type TableProps = React.ComponentProps<typeof StandardTable>

type MobileTableProps<
  DataItem,
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
> = Pick<
  StandardTableProps<DataItem, ConfigItem>,
  | 'sort'
  | 'sortBy'
  | 'data'
  | 'activeFilters'
  | 'hasMore'
  | 'successStatus'
  | 'getData'
  | 'loading'
  | 'hasData'
  | 'groups'
  | 'showGroups'
> & {
  localStorageName: string
  config: TableProps['config']
  dataKey: TableProps['dataKey']
  totalRowKey: TableProps['totalRowKey']
  mainColumnClassName?: string
  hasCheckboxes?: boolean
}

const headerStyle = (hasTotalRow: boolean, heightOfHeaderRow: number) =>
  ({
    position: 'sticky',
    top: hasTotalRow
      ? /** The height of the header + set distance to top (53px - set in `header` css class) + width of the total row */
        heightOfHeaderRow + 53 + 48 + 'px'
      : /** The height of the header + set distance to top (53px - set in `header` css class)  */
        heightOfHeaderRow + 53 + 'px',
    zIndex: '3',
  } as React.CSSProperties)

const MobileTable = <
  DataItem extends {
    groupDataKey?: string
  },
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
>({
  config,
  sort,
  sortBy,
  localStorageName,
  activeFilters,
  data,
  dataKey,
  groups,
  showGroups,
  hasMore,
  successStatus,
  getData,
  loading,
  hasData,
  totalRowKey,
  hasCheckboxes,
  mainColumnClassName = '',
}: MobileTableProps<DataItem, ConfigItem>): JSX.Element => {
  const infiniteLoadRef = useRef<HTMLDivElement>(null),
    scrollPositionRef = useRef<HTMLDivElement>(null),
    headerPositionRef = useRef<HTMLDivElement>(null)
  const secondaryIndex =
    (config.findIndex((c) => c.mainColumn) > -1
      ? config.findIndex((c) => c.mainColumn)
      : 0) + 1

  const [activeSecondaryColumn, setActiveSecondaryColumn] = useState(
      config[secondaryIndex].label
    ),
    [displayData, setDisplayData] = useState<DataItem[]>(data),
    [heightOfHeaderRow, setHeightOfHeaderRow] = useState<number>(0),
    [sortColumnsCount, setSortColumnsCount] = useState(0)

  const updateActiveColumn = (header: string) => {
    setActiveSecondaryColumn(header)
  }

  useEffect(() => {
    config
      .filter((_, i) => i > 0)
      .forEach((c) => {
        if (c.name === sortBy?.prop && !c.mainColumn) {
          updateActiveColumn(c.label)
        }
      })
    const configWithValuesCount = config.reduce(
      (r, o) => r + +!Object.values(o).includes(''),
      0
    )
    setSortColumnsCount(configWithValuesCount)
  }, [config, sortBy?.prop])

  const mainColumn = config.find((c) => c.mainColumn) ?? config[0],
    activeColumn =
      config.find((h) => h.label === activeSecondaryColumn) ??
      config[secondaryIndex]

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

  useEffect(() => {
    /** SET DATA GROUPS WITH VALUES */
    if (showGroups && groups) {
      const groupData: DataItem[] = getDataGroups(
        data,
        groups,
        { hasCheckboxes },
        totalRowKey
      )
      setDisplayData(groupData)
    } else {
      setDisplayData(data)
    }
  }, [data, groups, showGroups, totalRowKey, hasCheckboxes])

  useEffect(() => {
    /** NOTE: get current header row height */
    if (headerPositionRef.current) {
      const currentHeaderHeight =
        headerPositionRef.current.getBoundingClientRect().height
      const hasChanged = heightOfHeaderRow !== currentHeaderHeight
      hasChanged && setHeightOfHeaderRow(currentHeaderHeight)
    }
  }, [heightOfHeaderRow, sort])

  return (
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
          mainColumnClassName={mainColumnClassName}
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
        />
        {!loading ? (
          hasData && (
            <div>
              {/*********** DATA ROWS ***********/}
              {displayData?.map((data: GroupHeader<DataItem>, index) => (
                <React.Fragment key={`${index}_${data?.[dataKey]}`}>
                  {data?.isGroupHeader ? (
                    <div
                      className={`${color[data.type ?? 'gray']} ${
                        backgroundColor[data.type ?? 'gray']
                      } ${
                        data?.displayHeaderData ? '' : styles.headerDataPadding
                      } `}
                      style={headerStyle(!!totalRowKey, heightOfHeaderRow)}
                      key={data.groupHeader + `${index}`}
                    >
                      {data?.displayHeaderData ? (
                        <MobileTableRow
                          key={data?.[dataKey] ?? index}
                          activeColumn={activeColumn}
                          mainColumn={mainColumn}
                          columns={config}
                          data={data}
                          sortBy={{ ...sortBy, prop: '' }} // don't highlight the header row's sort column cell
                          rowIndex={index}
                          totalRowKey={totalRowKey}
                          scrollPositionRef={scrollPositionRef}
                          headerPositionRef={headerPositionRef}
                        />
                      ) : (
                        <span className={styles.displayFlex}>
                          {data.groupHeader}
                          {data.tooltipContent && (
                            <Tooltip
                              position='auto'
                              tooltipContent={data.tooltipContent}
                            >
                              <Icon
                                icon='info'
                                customClass={styles.marginLeftIcon}
                                size='12px'
                              />
                            </Tooltip>
                          )}
                        </span>
                      )}
                    </div>
                  ) : (
                    <MobileTableRow
                      key={data?.[dataKey] ?? index}
                      activeColumn={activeColumn}
                      mainColumn={mainColumn}
                      columns={config}
                      data={data}
                      sortBy={sortBy}
                      rowIndex={index}
                      totalRowKey={totalRowKey}
                      scrollPositionRef={scrollPositionRef}
                      headerPositionRef={headerPositionRef}
                    />
                  )}
                </React.Fragment>
              ))}
              {hasMore && (
                <div ref={infiniteLoadRef} className={styles.topMargin}>
                  <div>
                    <ListLoading />
                  </div>
                </div>
              )}
            </div>
          )
        ) : (
          <div className={styles.topMargin}>
            <div>
              <ListLoading longList />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default MobileTable
