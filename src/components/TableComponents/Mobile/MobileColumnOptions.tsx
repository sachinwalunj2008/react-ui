import React from 'react'
import {
  notEmpty,
  SortColumnProps,
  StandardTable,
  usePopoverAndMobileDrawer,
} from '../../../module'
import MobileSideDrawerOptions from '../../SideDrawer/MobileSideDrawerOptions/MobileSideDrawerOptions'

type StandardTableProps = React.ComponentProps<typeof StandardTable>

type MobileColumnOptionsProps = {
  config: StandardTableProps['config']
  localStorageName: string
  sort: SortColumnProps['sorter']
  sortBy: SortColumnProps['active']
  setActiveColumn: (header: SortColumnProps['label']) => void
  activeSecondaryColumn: SortColumnProps['label']
}

const MobileColumnOptions = ({
  config,
  localStorageName,
  sort,
  setActiveColumn,
  sortBy,
  activeSecondaryColumn,
}: MobileColumnOptionsProps): JSX.Element => {
  const { closePopoverOrDrawer } = usePopoverAndMobileDrawer(),
    transformedHeaders =
      config?.filter((h) => {
        return !h.mainColumn && !h.noSort && notEmpty(h.label) ? h : null
      }) ?? []

  const mobileColumnSelection = (header: {
    label: SortColumnProps['label']
    name: SortColumnProps['propName']
    lowerCaseParam?: SortColumnProps['lowerCaseParam']
  }) => {
    const propNameCheck = header.name === sortBy.prop,
      dir = propNameCheck ? !sortBy.flip : sortBy.flip,
      keyName = header.name ?? ''
    localStorage.setItem(
      localStorageName,
      JSON.stringify({
        prop: keyName,
        flip: dir,
        lowerCaseParam: header.lowerCaseParam,
      })
    )
    sort({
      activeColumn: keyName,
      direction: dir,
      lowerCaseParam: header.lowerCaseParam,
    })
    setActiveColumn(header.label)
    closePopoverOrDrawer()
  }

  return (
    <MobileSideDrawerOptions
      options={transformedHeaders}
      callout={mobileColumnSelection}
      activeRow={activeSecondaryColumn}
    />
  )
}

export default MobileColumnOptions
