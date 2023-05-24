import React from 'react'
import {
  ListLoading,
  Row,
  Cell,
  activeCellClass,
  hasStickyColumnStyle,
  Icon,
  EmptyState,
} from './../../module'
import type { ConfigItemType, NestedRowPropsType } from './StandardTableTypes'
import styles from './_table.module.scss'

type NestedRowProps<
  DataItem,
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
> = NestedRowPropsType<DataItem, ConfigItem>

const NestedRow = <
  DataItem,
  ConfigItem extends ConfigItemType<DataItem, Record<string, unknown>>
>({
  data,
  nestedDataKey,
  nestedRowProps,
  config,
  sortBy,
  customColumnProps,
  stickyTableConfig,
  selectedNestedRowData,
  totalRowKey,
  showStickyClasses,
}: NestedRowProps<DataItem, ConfigItem>): JSX.Element => {
  // TODO: Figure out how to clean up all of these casting instances that were in this file
  const loading =
    nestedDataKey &&
    nestedRowProps?.nestedLoading?.[data?.[nestedDataKey] as unknown as string]

  const getStickyRightCount = () => {
    let stickyCount: number = stickyTableConfig?.right ?? 0
    stickyCount += nestedRowProps || customColumnProps ? 1 : 0
    return stickyCount
  }

  const customColumnStickyStyles =
    getStickyRightCount() === 1
      ? `first-sticky-cell-right ${styles.extraLeftPadding}`
      : ''

  return (
    <>
      {nestedDataKey &&
      !loading &&
      (nestedRowProps?.nestedData[data?.[nestedDataKey] as unknown as string]
        ?.length as number) > 0 &&
      selectedNestedRowData &&
      selectedNestedRowData.length > 0 ? (
        selectedNestedRowData?.map((selectedRow) => {
          return (
            <>
              {selectedRow === data?.[nestedDataKey] &&
                (nestedRowProps?.nestedData?.[selectedRow as unknown as string]
                  ?.length as number) > 0 &&
                nestedRowProps?.nestedData?.[
                  selectedRow as unknown as string
                ].map((nestedRow: DataItem, nestedRowIndex: number) => {
                  const nestedClassName =
                    nestedRowIndex === 0
                      ? styles.firstRowShadow
                      : nestedRowProps?.nestedData?.[
                          selectedRow as unknown as string
                        ].length -
                          1 ===
                        nestedRowIndex
                      ? styles.lastRowShadow
                      : ''

                  return (
                    <Row
                      key={`${selectedRow}-${nestedRowIndex}`}
                      className={`bgc-purple ${nestedClassName}`}
                    >
                      {config.map((c, configIndex) => {
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
                            key={`${nestedRow[nestedDataKey]}-${c.name}`}
                            className={`${activeCellClass({
                              cells: cells,
                              activeName: sortBy.prop,
                            })} ${
                              (Number(stickyTableConfig?.left) || 1) ===
                                configIndex + 1 && showStickyClasses
                                ? styles.leftStickyCell
                                : ''
                            } ${
                              Number(stickyTableConfig?.right) ===
                                config.length - configIndex && showStickyClasses
                                ? styles.rightStickyCell
                                : ''
                            } ${hasStickyColumnStyle({
                              colIndex: configIndex + 1,
                              stickyLeftColumn: stickyTableConfig?.left,
                              stickyRightColumn: stickyTableConfig?.right,
                              tableHeadersLength: config.length,
                            })} ${
                              totalRowKey && data[totalRowKey]
                                ? 'bgc-lighter-gray'
                                : ''
                            } ${nestedClassName}`}
                          >
                            <div className='flex'>
                              {configIndex === 0 ? (
                                <Icon
                                  icon='l'
                                  customClass={`mr-16 svg-purple ${styles.childRowIcon}`}
                                  size='8px'
                                />
                              ) : null}
                              {c.cell.children(
                                {
                                  ...nestedRow,
                                  sortProp: sortBy.prop,
                                },
                                nestedRowIndex
                              )}
                            </div>
                          </Cell>
                        )
                      })}
                      {nestedRowProps && nestedDataKey && (
                        <Cell
                          className={`${nestedClassName} ${
                            styles.actionItems
                          } ${
                            customColumnProps ? '' : customColumnStickyStyles
                          }}`}
                        />
                      )}
                      {customColumnProps && (
                        <Cell
                          className={`
                                ${
                                  totalRowKey && data[totalRowKey]
                                    ? 'bgc-lighter-gray '
                                    : ''
                                } ${nestedClassName} ${
                            styles.actionItems
                          } ${customColumnStickyStyles}`}
                        />
                      )}
                    </Row>
                  )
                })}
            </>
          )
        })
      ) : loading ? (
        <Row key={`${nestedDataKey ? data?.[nestedDataKey] : ''}-loading`}>
          {config.map((c, index) => {
            return (
              <Cell
                key={`${c.name}-loading-cell`}
                style={{ padding: '16px 0' }}
              >
                <ListLoading
                  noSlideInUp
                  style={{ borderRadius: index === 0 ? '2px 0 0 2px' : '0' }}
                />
              </Cell>
            )
          })}
          {nestedRowProps && nestedDataKey && (
            <Cell className={styles.actionItems} style={{ padding: '16px 0' }}>
              <ListLoading noSlideInUp style={{ borderRadius: '0' }} />
            </Cell>
          )}
          {customColumnProps && (
            <Cell
              className={`${
                totalRowKey && data[totalRowKey] ? 'bgc-lighter-gray' : ''
              } ${styles.actionItems}`}
              style={{ padding: '16px 0' }}
            >
              <ListLoading
                noSlideInUp
                style={{ borderRadius: '0 2px 2px 0' }}
              />
            </Cell>
          )}
        </Row>
      ) : (
        nestedDataKey &&
        selectedNestedRowData?.includes(data[nestedDataKey]) &&
        nestedRowProps?.nestedData?.[data?.[nestedDataKey] as unknown as string]
          ?.length === 0 && (
          <Row key={`${nestedDataKey ? data?.[nestedDataKey] : ''}-no-data`}>
            {config.map((c, index) => (
              <Cell key={`${c.name}-empty-state-cell`}>
                {index === 0 && (
                  <div className='flex'>
                    <Icon
                      icon='l'
                      customClass={`mr-16 svg-purple ${styles.childRowIcon}`}
                      size='8px'
                    />
                    <EmptyState
                      primaryText='No Data Available'
                      background={false}
                    />
                  </div>
                )}
              </Cell>
            ))}
            {nestedRowProps && nestedDataKey && <Cell />}
            {customColumnProps && <Cell />}
          </Row>
        )
      )}
    </>
  )
}

export default NestedRow
