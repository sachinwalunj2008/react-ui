import React, { useEffect, useState, useMemo } from 'react'
import {
  Button,
  PopoverFormContainer,
  InlineMultiSelect,
  InlineMultiSelectAllCheckbox,
  InlineMultiSelectListGroupHeader,
  InlineMultiSelectListRow,
  InlineMultiSelectSearch,
  usePopoverAndMobileDrawer,
  notEmpty,
  useMediaQuery,
} from '../../module'
import { DisplaySelectionProps } from './CustomDisplay'
import styles from './_custom-display.module.scss'

type Headers = {
  id: number
  label: string
  isChecked: boolean
}

const CustomDisplayContent = ({
  selectedDisplayList,
  totalDisplayList,
  customSelectionCallout,
  headerText,
  searchPlaceholder = 'Search Options',
  noListDataText = 'There is no data matching that search.',
  setToDefaultCallout,
}: DisplaySelectionProps): JSX.Element => {
  const { closePopoverOrDrawer } = usePopoverAndMobileDrawer()
  const [search, setSearch] = useState('')
  const totalList = useMemo(
    () =>
      totalDisplayList.map((item, index) => {
        return { label: item, id: index + 1 }
      }),
    [totalDisplayList]
  )
  const unselectedList = useMemo(
    () => totalList.filter((el) => selectedDisplayList.indexOf(el.label) < 0),
    [selectedDisplayList, totalList]
  )
  const selectedList = useMemo(
    () => totalList.filter((el) => selectedDisplayList.indexOf(el.label) >= 0),
    [selectedDisplayList, totalList]
  )
  const finalList = useMemo(() => {
    return {
      selected: selectedList.map((item) => {
        return { id: item.id, isChecked: true, label: item.label }
      }),
      unselected: unselectedList.map((item) => {
        return { id: item.id, isChecked: false, label: item.label }
      }),
    }
  }, [selectedList, unselectedList])
  const [searchList, setSearchList] = useState({ ...finalList }),
    [originalList, setOriginalList] = useState({ ...finalList }),
    [selectionChange, setSelectionChange] = useState(false),
    allItemsSelected = useMemo(
      () =>
        selectionChange &&
        !originalList.selected.some((header) => !header.isChecked) &&
        originalList.unselected.length === 0,
      [originalList, selectionChange]
    ),
    isMobileScreen = useMediaQuery({ type: 'max', breakpoint: 'sm' })

  useEffect(() => {
    setOriginalList(finalList)
    setSearchList(finalList)
  }, [finalList])

  const onCancel = () => {
    setSelectionChange(false)
    setSearch('')
    closePopoverOrDrawer()
    setSearchList(finalList)
    setOriginalList(finalList)
  }

  const onClearClick = () => {
    const selected = searchList['selected'].map((item) => ({
      ...item,
      isChecked: false,
    }))
    let unselected = [...searchList['unselected']]
    const selectedOrgList = originalList['selected'].map((item) => ({
      ...item,
      isChecked: false,
    }))
    let unselectedOrgList = [...originalList['unselected']]
    unselected = unselected.concat(selected)
    const newList = {
      ...searchList,
      selected: [],
      unselected: unselected.filter((item) => {
        return item.label
          .toLowerCase()
          .includes(search.toString().toLowerCase())
      }),
    }
    if (search) {
      unselectedOrgList = unselectedOrgList.concat(selectedOrgList)
      const newOrgList = {
        ...originalList,
        selected: [],
        unselected: unselectedOrgList,
      }
      setOriginalList(newOrgList)
    } else {
      setOriginalList(newList)
    }
    setSelectionChange(true)
    setSearchList(newList)
  }

  const getSelectedList = () => {
    const selectedList: string[] = []
    searchList.selected.forEach((item) => {
      if (item.isChecked) selectedList.push(item.label)
    })
    searchList.unselected.forEach((item) => {
      if (item.isChecked) selectedList.push(item.label)
    })
    return selectedList
  }

  const onSave = () => {
    const selectedList = getSelectedList()
    customSelectionCallout(selectedList)
    setSelectionChange(false)
    closePopoverOrDrawer()
  }

  const reset = () => {
    // Temporarily making this function optional
    setToDefaultCallout()
    closePopoverOrDrawer()
  }

  return (
    <PopoverFormContainer
      header={headerText}
      noPadding
      usedWithMobileDrawer
      width={isMobileScreen ? '100%' : '450px'}
      footerCustomClass={styles.footerStyle}
      footerChildren={
        <>
          <Button styleType='text-red' onClick={reset}>
            Set to Default
          </Button>
          <div>
            <Button as='button' onClick={onCancel} styleType='secondary'>
              Cancel
            </Button>
            <Button
              as='button'
              disabled={!selectionChange}
              className='ml-8'
              onClick={onSave}
              styleType='primary-green'
            >
              Save Changes
            </Button>
          </div>
        </>
      }
    >
      <InlineMultiSelect
        showNoListData={notEmpty(search)}
        noListDataProps={{
          headers: ['UNSELECTED'],
          secondaryText: noListDataText,
        }}
        noBorder
        noOverflow={isMobileScreen}
        CustomRow={(header: Headers) => {
          return (
            <InlineMultiSelectListRow
              callout={(id, shouldCheck) => {
                if (shouldCheck) {
                  const unselected = [...searchList.unselected]
                  const selected = [...searchList.selected]
                  selected.splice(
                    Number(id) - 1 > selected.length
                      ? selected.length
                      : Number(id) - 1,
                    0,
                    {
                      id: Number(id),
                      isChecked: true,
                      //@ts-expect-error Error related to typecheck in searchlist. For now, we will expect this error until we figure out how to deal with this error.
                      label: unselected.find((item) => item.id === id && item)
                        .label,
                    }
                  )
                  unselected.splice(
                    unselected.findIndex((item) => item.id === id),
                    1
                  )
                  const newList = {
                    ...searchList,
                    selected: selected,
                    unselected: unselected,
                  }
                  if (search) {
                    const unselectedOrgList = [...originalList.unselected]
                    const selectedOrgList = [...originalList.selected]
                    selectedOrgList.splice(
                      Number(id) - 1 > selectedOrgList.length
                        ? selectedOrgList.length
                        : Number(id) - 1,
                      0,
                      {
                        id: Number(id),
                        isChecked: true,
                        //@ts-expect-error Error related to typecheck in searchlist. For now, we will expect this error until we figure out how to deal with this error.
                        label: unselectedOrgList.find(
                          (item) => item.id === id && item
                        ).label,
                      }
                    )
                    unselectedOrgList.splice(
                      unselectedOrgList.findIndex((item) => item.id === id),
                      1
                    )
                    const newOrgList = {
                      ...originalList,
                      selected: selectedOrgList,
                      unselected: unselectedOrgList,
                    }
                    setOriginalList(newOrgList)
                  } else {
                    setOriginalList(newList)
                  }
                  setSelectionChange(true)
                  setSearchList(newList)
                } else {
                  const selected = [...searchList.selected]
                  const unselected = [...searchList.unselected]
                  unselected.splice(
                    Number(id) - 1 > unselected.length
                      ? unselected.length
                      : Number(id) - 1,
                    0,
                    {
                      id: Number(id),
                      isChecked: false,
                      //@ts-expect-error Error related to typecheck in searchlist. For now, we will expect this error until we figure out how to deal with this error.
                      label: selected.find((item) => item.id === id && item)
                        .label,
                    }
                  )
                  selected.splice(
                    selected.findIndex((item) => item.id === id),
                    1
                  )
                  const newList = {
                    ...searchList,
                    selected: selected,
                    unselected: unselected.filter((item) => {
                      return item.label
                        .toLowerCase()
                        .includes(search.toString().toLowerCase())
                    }),
                  }
                  if (search) {
                    const selectedOrgList = [...originalList.selected]
                    const unselectedOrgList = [...originalList.unselected]
                    unselectedOrgList.splice(
                      Number(id) - 1 > unselectedOrgList.length
                        ? unselectedOrgList.length
                        : Number(id) - 1,
                      0,
                      {
                        id: Number(id),
                        isChecked: false,
                        //@ts-expect-error Error related to typecheck in searchlist. For now, we will expect this error until we figure out how to deal with this error.
                        label: unselected.find((item) => item.id === id && item)
                          .label,
                      }
                    )
                    selectedOrgList.splice(
                      selectedOrgList.findIndex((item) => item.id === id),
                      1
                    )
                    const newOrgList = {
                      ...originalList,
                      selected: selectedOrgList,
                      unselected: unselectedOrgList,
                    }
                    setOriginalList(newOrgList)
                  } else {
                    setOriginalList(newList)
                  }
                  setSelectionChange(true)
                  setSearchList(newList)
                }
              }}
              checked={header.isChecked}
              key={header.id}
              label={header.label}
              stateName={header.id}
            />
          )
        }}
        CustomGroupHeader={
          <InlineMultiSelectListGroupHeader>
            <Button
              as='button'
              styleType='text-blue'
              style={{ fontSize: '10px' }}
              onClick={onClearClick}
            >
              Clear
            </Button>
          </InlineMultiSelectListGroupHeader>
        }
        CustomSearch={
          <InlineMultiSelectSearch
            placeholder={searchPlaceholder}
            search={search}
            searchCallout={(value) => {
              setSearch(value.toString())
              const newList = {
                ...originalList,
                unselected: originalList['unselected'].filter((item) => {
                  return item.label
                    .toLowerCase()
                    .includes(value.toString().toLowerCase())
                }),
              }
              setSearchList(newList)
            }}
          />
        }
        CustomSelectAll={
          <InlineMultiSelectAllCheckbox
            checked={allItemsSelected}
            callout={() => {
              const selectedList = originalList['selected'].map((item) => ({
                ...item,
                isChecked: !allItemsSelected,
              }))
              const unselectedList = originalList['unselected'].map((item) => ({
                ...item,
                isChecked: !allItemsSelected,
              }))
              if (!allItemsSelected) {
                unselectedList.forEach((item) => {
                  selectedList.splice(
                    Number(item.id) - 1 > selectedList.length
                      ? selectedList.length
                      : Number(item.id) - 1,
                    0,
                    item
                  )
                })
                const newList = {
                  ...originalList,
                  selected: selectedList,
                  unselected: [],
                }
                setSelectionChange(true)
                setSearchList(newList)
                setOriginalList(newList)
              } else {
                selectedList.forEach((item) => {
                  unselectedList.splice(
                    Number(item.id) - 1 > unselectedList.length
                      ? unselectedList.length
                      : Number(item.id) - 1,
                    0,
                    item
                  )
                })
                const newList = {
                  ...originalList,
                  selected: [],
                  unselected: unselectedList.filter((item) => {
                    return item.label
                      .toLowerCase()
                      .includes(search.toString().toLowerCase())
                  }),
                }
                const newOrgList = {
                  ...originalList,
                  selected: [],
                  unselected: unselectedList,
                }
                setSelectionChange(true)
                setSearchList(newList)
                setOriginalList(newOrgList)
              }
            }}
            label='Select All'
          />
        }
        selectAllChecked={allItemsSelected}
        listItems={searchList}
      />
    </PopoverFormContainer>
  )
}

export default CustomDisplayContent
