import { TooltipProps } from '../Tooltip/Tooltip'
import type { groupAccordionType, GroupColorType } from './StandardTableTypes'

type Groups<DataItem> = Array<{
  /** The string value to display in the group Header row */
  groupHeader: string | ((count: number) => string)
  /** Custom JSX to display info icon in the group Header row (groupHeader) */
  tooltipContent?: TooltipProps['tooltipContent']
  /** Determines the background color of the row (Default: grey) */
  type?: GroupColorType
  /** Method to determine if a data set belongs to the group */
  check: (dataItem: DataItem, checkedBoxes?: DataItem[]) => boolean
  /** boolean to add Clear button in the selection */
  includeClearButton?: boolean
  /** Function to perform the required action after clearing the selections */
  clearCallout?: () => void
  /** Custom JSX at the last column of the group header to replace clearButton */
  customClearButton?: React.ReactNode
  /** Adds an expand/collapse functionality to entire groups  */
  groupAccordion?: groupAccordionType
}>

export const getDataGroups = <DataItem>(
  data: DataItem[],
  groups: Groups<DataItem>,
  checkBoxes: { hasCheckboxes?: boolean; checkedBoxes?: Array<DataItem> },
  totalRowKey?: keyof DataItem
): DataItem[] => {
  const { hasCheckboxes, checkedBoxes } = checkBoxes

  /** SET DATA GROUPS */
  if (data?.length > 0) {
    const organizedGroupData: DataItem[] = []
    const mutableData = [...data] as (DataItem & {
      isGroupHeader?: boolean
      groupNum?: number
      groupDataKey?: string
    })[]
    groups?.forEach((group, groupIndex) => {
      let hasData = false,
        headerIndex: number

      mutableData.forEach((dataItem, dataIndex) => {
        /** INSERT A GENERIC GROUP HEADER DATA PLACEHOLDER */
        if (dataIndex === 0) {
          if (
            !hasCheckboxes ||
            (hasCheckboxes && checkedBoxes && checkedBoxes.length > 0)
          ) {
            organizedGroupData.push({
              ...dataItem, // just need all of the keys of the dataItem object in new header object to match table config; values don't matter
              isGroupHeader: true,
              groupHeader: group.groupHeader,
              type: group.type,
              includeClearButton: group.includeClearButton,
              clearCallout: group.clearCallout,
              customClearButton: group.customClearButton,
              displayHeaderData: false,
              ...(group.groupAccordion
                ? { groupAccordion: group.groupAccordion }
                : {}),
              tooltipContent: group.tooltipContent,
            })
            headerIndex = organizedGroupData.length - 1
          }
        }

        // IF DATA ITEM HAS HEADER DETAILS TO DISPLAY
        if (dataItem?.isGroupHeader && dataItem?.groupNum === groupIndex + 1) {
          organizedGroupData[headerIndex] = {
            ...organizedGroupData[headerIndex],
            ...dataItem,
            name: group.groupHeader,
            ...(group.groupAccordion
              ? { groupDataKey: group.groupAccordion?.groupKey }
              : {}),
          }
        }

        // if totalRow is present, insert row into data array as the first item
        if (groupIndex === 0 && dataIndex === 0 && totalRowKey) {
          organizedGroupData.unshift(dataItem)
        }

        // if dataItem is a regular date row and matches the check criteria add it to the data array
        if (group.check(dataItem, checkedBoxes)) {
          hasData = true
          if (
            (!totalRowKey || !dataItem[totalRowKey]) &&
            !dataItem?.isGroupHeader
          ) {
            dataItem.groupDataKey = group.groupAccordion?.groupKey
            organizedGroupData.push(dataItem)
          }
        }
      })

      // if the group has no data, remove the group header row from the display
      if (
        !hasData &&
        (!hasCheckboxes ||
          (hasCheckboxes && checkedBoxes && checkedBoxes.length > 0))
      ) {
        organizedGroupData.pop()
      }
    })

    return organizedGroupData
  } else {
    return data
  }
}
