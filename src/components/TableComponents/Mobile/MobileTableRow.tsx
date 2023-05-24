import React, { useEffect, useState } from 'react'
import {
  activeCellClass,
  Button,
  Checkbox,
  Icon,
  SortColumnProps,
  StandardTable,
  Tooltip,
} from '../../../module'
import { ConfigItemType } from '../StandardTableTypes'
import styles from './_mobile-table.module.scss'

type TableProps = React.ComponentProps<typeof StandardTable>

type MobileTableRowPropsBase<DataItem, StyleGeneric> = {
  activeColumn: ConfigItemType<DataItem, StyleGeneric>
  mainColumn: ConfigItemType<DataItem, StyleGeneric>
  columns: TableProps['config']
  sortBy: TableProps['sortBy']
  data: DataItem
  rowIndex: number
  totalRowKey?: TableProps['totalRowKey']
  scrollPositionRef: React.RefObject<HTMLDivElement>
  headerPositionRef: React.RefObject<HTMLDivElement>
}

type MobileTableRowPropsHasCheckboxes<DataItem, StyleGeneric> =
  MobileTableRowPropsBase<DataItem, StyleGeneric> & HasCheckboxes<DataItem>

type MobileTableRowPropsNoCheckboxes<DataItem, StyleGeneric> =
  MobileTableRowPropsBase<DataItem, StyleGeneric> & NoCheckboxes

type MobileTableRowProps<DataItem, StyleGeneric> =
  | MobileTableRowPropsHasCheckboxes<DataItem, StyleGeneric>
  | MobileTableRowPropsNoCheckboxes<DataItem, StyleGeneric>

type HasCheckboxes<DataItem> = {
  hasCheckboxes: true
  checkboxCallout: ({
    checked,
    dataObj,
    name,
    index,
  }: {
    checked: boolean
    dataObj?: DataItem | undefined
    name?: string | undefined
    index?: number | undefined
  }) => void
  loading: boolean
  checked: boolean
}

type NoCheckboxes = {
  hasCheckboxes?: never
  checkboxCallout?: never
  loading?: never
  checked?: never
}

const MobileTableRow = <DataItem, StyleGeneric>({
  activeColumn,
  mainColumn,
  columns,
  data,
  sortBy,
  rowIndex,
  totalRowKey,
  scrollPositionRef,
  headerPositionRef,
  hasCheckboxes,
  checkboxCallout,
  loading,
  checked,
}: MobileTableRowProps<DataItem, StyleGeneric>): JSX.Element => {
  const [expanded, setExpanded] = useState(false),
    [isScrollTop, setScrollTop] = useState(false),
    transformedColumns = columns.filter((c) => {
      return !c.mainColumn && activeColumn.label !== c.label ? c : null
    })
  type CellType = {
    options?: SortColumnProps['options']
    name?: SortColumnProps['propName']
  }
  const getCells = (column: CellType) => {
    const cells = []
    if (column.options) {
      column.options.forEach((co) => {
        cells.push(co.name)
      })
    }
    if (column.name) {
      cells.push(column.name)
    }
    return cells
  }
  //Scroll to the top when the Total row expands.
  const isTotalRowEnabled = totalRowKey ? data[totalRowKey] : false
  useEffect(() => {
    if (isScrollTop && expanded && scrollPositionRef) {
      scrollPositionRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
      setScrollTop(false)
    }
  }, [isScrollTop, expanded, scrollPositionRef])

  // To get a header's dynamic height and use it to make the first row sticky.
  let calculatedHeight = {}
  if (isTotalRowEnabled && headerPositionRef) {
    const headerHeight = headerPositionRef.current?.clientHeight as number
    calculatedHeight = {
      top: headerHeight && headerHeight + 55, // 55px is calculated by header's top : 53px + 2px bottom border.
    }
  }
  return (
    <>
      <div
        className={`${hasCheckboxes ? styles.checkboxRow : styles.row} ${
          columns.length > 2 && expanded ? styles.expandedRow : ''
        } ${isTotalRowEnabled ? styles.totalRow : ''} `}
        onClick={() => {
          setExpanded(!expanded)
          isTotalRowEnabled && setScrollTop(true)
        }}
        style={calculatedHeight}
      >
        {hasCheckboxes && (
          <div className={`${styles.column}`}>
            <Checkbox
              name={`checkbox-${mainColumn}`}
              stateName='table_data'
              checked={checked}
              disabled={loading}
              callout={(name, value) =>
                checkboxCallout?.({
                  checked: value,
                  dataObj: data,
                  name,
                  index: rowIndex,
                })
              }
              label=''
              hideLabel
              customClass={styles.smallRightMargin}
            />
          </div>
        )}
        <div
          className={`${styles.column} ${
            isTotalRowEnabled
              ? styles.lighterGrayBackground
              : activeCellClass({
                  cells: getCells(mainColumn),
                  activeName: sortBy.prop,
                })
          } ${
            mainColumn.cell.className
              ? typeof mainColumn.cell.className === 'string'
                ? mainColumn.cell.className
                : mainColumn.cell.className(data)
              : ''
          } `}
        >
          {mainColumn.cell?.children(
            { ...data, sortProp: sortBy.prop },
            rowIndex
          )}
        </div>
        <div
          className={`${styles.activeColumn} ${styles.column} ${
            isTotalRowEnabled
              ? styles.lighterGrayBackground
              : activeCellClass({
                  cells: getCells(activeColumn),
                  activeName: sortBy.prop,
                })
          }
          ${
            activeColumn.cell.className
              ? typeof activeColumn.cell.className === 'string'
                ? activeColumn.cell.className
                : activeColumn.cell.className(data)
              : ''
          }
          `}
        >
          <div
            className={columns.length > 2 ? styles.activeColumnContainer : ''}
          >
            {activeColumn.cell?.children({ ...data, sortProp: sortBy.prop })}
            {columns.length > 2 && (
              <div className={styles.caratContainer}>
                <Button
                  as='unstyled'
                  onClick={() => {
                    setExpanded(!expanded)
                  }}
                >
                  <Icon
                    icon='downCaret'
                    customClass={`${styles.caret} ${
                      expanded ? styles.flipped : ''
                    }`}
                    size='16px'
                  />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {expanded &&
        transformedColumns?.map((c, i) => (
          <div
            key={c.label}
            className={`${
              c.isButton
                ? isTotalRowEnabled
                  ? styles.hideColumn
                  : styles.isButton
                : styles.row
            } ${
              transformedColumns?.length - 1 === i ? styles.insetShadow : ''
            } ${
              c.cell.className
                ? typeof c.cell.className === 'string'
                  ? c.cell.className
                  : ''
                : ''
            } `}
          >
            {!c.isButton && (
              <div className={styles.column}>
                {c.label}
                {c.tooltip && (
                  <Tooltip
                    tooltipContent={c.tooltip.content}
                    position={
                      c.tooltip.position ? c.tooltip.position : 'bottom'
                    }
                  >
                    <Icon
                      icon='info'
                      customClass={styles.infoTooltipIcon}
                      size='12px'
                    />
                  </Tooltip>
                )}
              </div>
            )}
            <div
              className={`${styles.column} ${
                c.cell.className
                  ? typeof c.cell.className === 'string'
                    ? ''
                    : c.cell.className(data)
                  : ''
              }`}
            >
              {c.cell?.children({ ...data, sortProp: sortBy.prop })}
            </div>
          </div>
        ))}
    </>
  )
}

export default MobileTableRow
