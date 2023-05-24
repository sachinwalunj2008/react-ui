import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import {
  Button,
  InlineMultiSelect,
  InlineMultiSelectListGroupHeader,
  InlineMultiSelectListRow,
  InlineMultiSelectSearch,
  InlineMultiSelectAllCheckbox,
  notEmpty,
  Tippy,
  Icon,
} from '../../module'
import FormLabel from '../FormLabel/FormLabel'
import { TooltipProps } from '../Tooltip/Tooltip'
import styles from './_multiple-selection.module.scss'

type MultipleSelectionBaseProps = {
  /** Array of options displayed in the UI */
  options: string[]
  /** Array of user selected options that we want selected when the component mounts */
  selectedOptions: string[]
  /** Function to set the array of selected options */
  callout: (selectedList: string[]) => void
  /** Label text */
  labelText: string
  /** Optional Right aligned Label */
  rightLabel?: React.ReactNode
  /** Label tooltip */
  labelTooltip?: Omit<TooltipProps, 'children'>
  /** Option to make this field required */
  required?: boolean
  /** Custom placeholder text for the SearchBar */
  searchPlaceholder?: string
  /** Custom text that will display if no items match the search input */
  // TODO: Update this prop to better reflect EmptyState
  noListDataText?: string
}

type ExposedProps = MultipleSelectionBaseProps & {
  /** Option to make the component exposed and displayed similar to what the `InlineMultiSelect` looks like. */
  exposed: boolean
  /** Optionally override the maxHeight for the exposed container. */
  maxHeight?: number | string
  appendTo?: never
  selectPlaceholder?: never
}

type StandardProps = MultipleSelectionBaseProps & {
  /** Useful when we want to attach this to another component making use of Tippy */
  appendTo?: 'parent' | ((element: Element) => Element)
  /** Custom placeholder text for the Select Dropdown */
  selectPlaceholder: string
  exposed?: never
  maxHeight?: never
}

type MultipleSelectionProps = ExposedProps | StandardProps

type Headers = {
  id: number
  label: string
  isChecked: boolean
}

const MultipleSelction = ({
  appendTo,
  selectedOptions,
  options,
  callout,
  selectPlaceholder,
  labelText,
  searchPlaceholder = 'Search Options',
  noListDataText = 'There is no data matching that search.',
  required,
  labelTooltip,
  rightLabel,
  exposed,
  maxHeight,
}: MultipleSelectionProps): JSX.Element => {
  const [search, setSearch] = useState(''),
    selectBoxRef = useRef<HTMLDivElement>(null)

  const totalList = useMemo(
    () =>
      options.map((item, index) => {
        return { label: item, id: index + 1 }
      }),
    [options]
  )
  const unselectedList = useMemo(
    () => totalList.filter((el) => selectedOptions.indexOf(el.label) < 0),
    [selectedOptions, totalList]
  )
  const selectedList = useMemo(
    () => totalList.filter((el) => selectedOptions.indexOf(el.label) >= 0),
    [selectedOptions, totalList]
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
    allItemsSelected = useMemo(
      () =>
        !originalList.selected.some((header) => !header.isChecked) &&
        originalList.unselected.length === 0 &&
        options.length > 0,
      [originalList, options]
    )

  useEffect(() => {
    setOriginalList(finalList)
    setSearchList(finalList)
  }, [finalList])

  const getSelectedList = useCallback(() => {
    const selectedList: string[] = []
    searchList.selected.forEach((item) => {
      if (item.isChecked) selectedList.push(item.label)
    })
    searchList.unselected.forEach((item) => {
      if (item.isChecked) selectedList.push(item.label)
    })
    return selectedList
  }, [searchList.selected, searchList.unselected])

  const [actionVisible, setActionVisible] = useState(false),
    openClass = actionVisible ? styles.open : ''

  const showActionContent = useCallback(
    () => setActionVisible(true),
    [setActionVisible]
  )
  const hideActionContent = useCallback(() => {
    setActionVisible(false)
    const selectedList = getSelectedList()
    callout(selectedList)
    setSearch('')
  }, [setActionVisible, callout, getSelectedList])

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
    if (exposed) {
      callout([])
    }
    setSearchList(newList)
  }

  const getClickText = () => {
    const selectedList = getSelectedList()
    return selectedList?.length
      ? `(${selectedList.length}) ${selectedList.map((el) => el).join(', ')}`
      : selectPlaceholder
  }

  const rowCallout = (id: number, shouldCheck: boolean) => {
    type listType = { label: string; isChecked: boolean }[]
    const getSelectedList = (newList: {
      selected: listType
      unselected: listType
    }) => {
      const selectedList: string[] = []
      newList.selected.forEach((item) => {
        if (item.isChecked) selectedList.push(item.label)
      })
      newList.unselected.forEach((item) => {
        if (item.isChecked) selectedList.push(item.label)
      })
      return selectedList
    }
    if (shouldCheck) {
      const unselected = [...searchList.unselected]
      const selected = [...searchList.selected]
      selected.splice(id - 1 > selected.length ? selected.length : id - 1, 0, {
        id: id,
        isChecked: true,
        label: unselected.find((item) => item.id === id && item)?.label ?? '',
      })
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
          id - 1 > selectedOrgList.length ? selectedOrgList.length : id - 1,
          0,
          {
            id: id,
            isChecked: true,
            label:
              unselectedOrgList.find((item) => item.id === id && item)?.label ??
              '',
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
      if (exposed) {
        callout(getSelectedList(newList))
      }
      setSearchList(newList)
    } else {
      const selected = [...searchList.selected]
      const unselected = [...searchList.unselected]
      unselected.splice(
        id - 1 > unselected.length ? unselected.length : id - 1,
        0,
        {
          id: id,
          isChecked: false,
          label: selected.find((item) => item.id === id && item)?.label ?? '',
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
          id - 1 > unselectedOrgList.length ? unselectedOrgList.length : id - 1,
          0,
          {
            id: id,
            isChecked: false,
            label:
              unselected.find((item) => item.id === id && item)?.label ?? '',
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
      if (exposed) {
        callout(getSelectedList(newList))
      }
      setSearchList(newList)
    }
  }

  const searchCallout = (value: string) => {
    setSearch(value.toString())
    const newList = {
      ...originalList,
      unselected: originalList['unselected'].filter((item) => {
        return item.label.toLowerCase().includes(value.toString().toLowerCase())
      }),
    }
    setSearchList(newList)
  }

  const checkAll = () => {
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
      setSearchList(newList)
      setOriginalList(newList)
      if (exposed) {
        const selectedList: string[] = []
        newList.selected.forEach((item) => {
          if (item.isChecked) selectedList.push(item.label)
        })
        callout(selectedList)
      }
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
      setSearchList(newList)
      setOriginalList(newOrgList)
      if (exposed) {
        callout([])
      }
    }
  }

  const MutipleSelectionContent = () => {
    const height = maxHeight ? maxHeight : 300

    return (
      <InlineMultiSelect
        showNoListData={notEmpty(search)}
        noListDataProps={{
          headers: ['UNSELECTED'],
          secondaryText: noListDataText,
        }}
        noBorder={!exposed}
        exposed={exposed}
        width={selectBoxRef.current?.offsetWidth}
        className={exposed ? styles.exposed : ''}
        showGradient={options.length > 10}
        style={
          exposed
            ? {
                maxHeight: height,
                ...(options.length > 10 ? { height } : {}),
              }
            : {}
        }
        CustomRow={(header: Headers) => {
          return (
            <InlineMultiSelectListRow
              callout={(id, shouldCheck) => {
                rowCallout(Number(id), shouldCheck)
              }}
              checked={header.isChecked}
              key={header.id}
              label={header.label}
              stateName={header.id}
            />
          )
        }}
        CustomGroupHeader={
          originalList.selected.length > 0 ? (
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
          ) : (
            // CustomGroupHeader expects an element here. In order not to break other instances of InlineMultiSelect, we must keep this fragment here.
            <></>
          )
        }
        CustomSearch={
          options.length > 10 ? (
            <InlineMultiSelectSearch
              placeholder={searchPlaceholder}
              search={search}
              searchCallout={(value) => {
                searchCallout(value)
              }}
              open={actionVisible}
            />
          ) : (
            // CustomSearch expects an element here. In order not to break other instances of InlineMultiSelect, we must keep this fragment here.
            <></>
          )
        }
        CustomSelectAll={
          <InlineMultiSelectAllCheckbox
            checked={allItemsSelected}
            callout={checkAll}
            label={`Select All (${options.length})`}
          />
        }
        selectAllChecked={allItemsSelected}
        listItems={searchList}
      />
    )
  }

  return (
    <div>
      <FormLabel
        label={labelText}
        rightLabel={rightLabel}
        tooltip={labelTooltip}
        active={actionVisible}
        required={required}
      />
      {exposed ? (
        MutipleSelectionContent()
      ) : (
        <Tippy
          className={styles.tippyContainer}
          placement='bottom'
          maxWidth='450px'
          appendTo={appendTo ? appendTo : document.body}
          content={MutipleSelectionContent()}
          interactive
          allowHTML
          visible={actionVisible}
          onClickOutside={hideActionContent}
        >
          <div
            onClick={actionVisible ? hideActionContent : showActionContent}
            className={styles.popoverToggle}
          >
            <div
              className={`${styles.selectBox} ${openClass}`}
              ref={selectBoxRef}
            >
              <span className={`${styles.selectedText} ${openClass}`}>
                {getClickText()}
              </span>
              <span className={actionVisible ? styles.flip : ''}>
                <Icon icon='carat' customClass={styles.iconColor} size='10px' />
              </span>
            </div>
          </div>
        </Tippy>
      )}
    </div>
  )
}

export default MultipleSelction
