import * as React from 'react'
import {
  Checkbox,
  Button,
  SearchBar,
  EmptyState,
  useSearchBarFocus,
} from '../../module'
import type { CheckboxProps } from '../Form/Checkbox'
import styles from './_inline-multi-select.module.scss'
const { isValidElement, cloneElement, memo } = React

/* If an object, will render the list in groups based on {'groupName': []}. If array, will just render */
type ListItems = Record<string, React.ReactNode[]> | React.ReactNode[]

type InlineMultiSelectProps = {
  /* Customize the search feature as JSX, or pass false to remove it */
  CustomSearch?: React.ReactNode | boolean
  /* Customize the list feature as JSX, or pass false to remove it */
  CustomList?: React.ReactNode | boolean
  listItems?: ListItems
  search?: InlineMultiSelectSearchProps['search']
  searchCallout?: InlineMultiSelectSearchProps['searchCallout']
  CustomGroupHeader?: React.ReactNode
  CustomRow?: React.ReactNode
  CustomSelectAll?: React.ReactNode
  selectAllCallout?: (...rest: unknown[]) => void
  selectAllChecked?: boolean
  noBorder?: boolean
  /** Allow the list to not have a set height and overflow in mobile when set to `true` */
  noOverflow?: boolean
  showNoListData?: boolean
  noListDataProps?: {
    primaryText?: string
    secondaryText?: string
    headers?: string[]
  }
  width?: number
  exposed?: boolean
  className?: string
  style?: React.CSSProperties
  showGradient?: boolean
}
export function InlineMultiSelect({
  CustomSearch = InlineMultiSelectSearch,
  CustomList = InlineMultiSelectList,
  CustomGroupHeader = InlineMultiSelectListGroupHeader,
  CustomRow = InlineMultiSelectListRow,
  CustomSelectAll = InlineMultiSelectAllCheckbox,
  listItems,
  search = '',
  searchCallout,
  selectAllCallout,
  selectAllChecked,
  noBorder,
  showNoListData,
  noListDataProps,
  noOverflow,
  width,
  exposed,
  className = '',
  style,
  showGradient,
}: InlineMultiSelectProps): JSX.Element {
  const FinalCustomSearch = convertPropToRenderable(CustomSearch, { exposed }),
    FinalCustomList = convertPropToRenderable(CustomList, {
      listItems,
      search,
      searchCallout,
      CustomGroupHeader,
      CustomRow,
      showNoListData,
      noListDataProps,
      exposed,
    }),
    FinalSelectAll = convertPropToRenderable(CustomSelectAll, {
      ...(selectAllCallout ? { callout: selectAllCallout } : {}),
      ...(selectAllChecked ? { checked: selectAllChecked } : {}),
    })

  return (
    <div
      className={`${styles.inlineMultiSelect} ${
        noBorder ? styles.noBorder : ''
      } ${noOverflow ? styles.noOverflow : ''} ${className}`}
      style={{
        ...style,
        ...(width ? { width } : {}),
      }}
    >
      {FinalCustomSearch}
      {showGradient && <div className={styles.topGradient} />}
      {FinalCustomList}
      {showGradient && (
        <div
          className={`${styles.bottomGradient} ${
            exposed ? styles.adjustForExposed : ''
          }`}
        />
      )}
      {FinalSelectAll}
    </div>
  )
}

type InlineMultiSelectSearchProps = {
  placeholder: string
  search: string
  searchCallout: (searchInputText: string) => void
  autoFocus?: boolean
  open?: boolean
}
export function InlineMultiSelectSearch({
  placeholder = 'Search',
  search = '',
  searchCallout,
  autoFocus,
  open,
}: InlineMultiSelectSearchProps): JSX.Element {
  const searchBarRef = useSearchBarFocus(!!open)

  return (
    <div className={styles.searchContainerPadding}>
      <SearchBar
        value={search}
        placeholder={placeholder}
        onChange={searchCallout}
        // Adding the `minWidth` here to prevent the `SearchBar` from being too large in this component. Without this, the `SearchBar` will overflow out of the `InlineMultiSelect` component.
        minWidth={200}
        ref={searchBarRef}
        autoFocus={autoFocus}
      />
    </div>
  )
}

type InlineMultiSelectListProps = {
  defaultClassName?: string
  additionalClassName?: string
  listItems: ListItems
  CustomGroupHeader: React.ReactNode
  CustomRow: React.ReactNode
  showNoListData?: boolean
  noListDataProps?: {
    primaryText?: string
    secondaryText?: string
    headers?: string[]
  }
}
export function InlineMultiSelectList({
  defaultClassName,
  additionalClassName = '',
  listItems,
  CustomGroupHeader = InlineMultiSelectListGroupHeader,
  CustomRow = InlineMultiSelectListRow,
  showNoListData,
  noListDataProps,
}: InlineMultiSelectListProps): JSX.Element {
  let renderedItems

  if (Array.isArray(listItems)) {
    if (!listItems) throw new Error('Must include listItems')
    renderedItems = listItems.map((listItem) =>
      convertPropToRenderable(CustomRow, listItem as Record<string, unknown>)
    )
  } else if (isValidElement(listItems)) {
    renderedItems = listItems
  } else if (
    CustomRow !== InlineMultiSelectListRow &&
    isValidElement(CustomRow)
  ) {
    renderedItems = CustomRow
  } else {
    if (!listItems) throw new Error('Must include listItems')
    renderedItems = Object.keys(listItems).flatMap((listItemKey) => {
      return [
        convertPropToRenderable(CustomGroupHeader, {
          name: listItemKey,
          key: listItemKey,
          recordsLength: listItems[listItemKey].length,
        }),
        showNoListData &&
        noListDataProps?.headers?.includes(listItemKey.toUpperCase()) &&
        listItems[listItemKey].length === 0 ? (
          <EmptyState
            primaryText={noListDataProps?.primaryText ?? 'No Data Available'}
            background={false}
          />
        ) : (
          [
            ...listItems[listItemKey].map((listItem) =>
              convertPropToRenderable(
                CustomRow,
                //@ts-expect-error Error related to type of listitem
                listItem?.id
                  ? {
                      //@ts-expect-error Error related to type of listitem
                      key: listItem?.id,
                      ...(listItem as Record<string, unknown>),
                    }
                  : (listItem as Record<string, unknown>)
              )
            ),
          ]
        ),
      ]
    })
  }

  return (
    <div
      className={`${styles.list} ${defaultClassName} ${additionalClassName}`}
    >
      {renderedItems}
    </div>
  )
}

type InlineMultiSelectListGroupHeaderProps = {
  name?: string
  children?: React.ReactNode
  recordsLength?: number
}
export function InlineMultiSelectListGroupHeader({
  name,
  children,
  recordsLength,
}: InlineMultiSelectListGroupHeaderProps): JSX.Element {
  return (
    <div className={styles.header}>
      <span>
        {name?.toUpperCase()}
        {recordsLength ? ` (${recordsLength}) ` : ''}
      </span>
      {name !== 'unselected' && Number(recordsLength) > 0 && children}
    </div>
  )
}

interface InlineMultiSelectListRowProps extends CheckboxProps<number | string> {
  customClass?: string
}
export const InlineMultiSelectListRow = memo(function InlineMultiSelectRowRaw(
  props: InlineMultiSelectListRowProps
) {
  return (
    <Checkbox
      name='checkbox'
      type='checkbox'
      {...(props as CheckboxProps<number | string>)}
      customClass={`${styles.checkbox} ${
        props.customClass ? props.customClass : ''
      }`}
      labelClass={styles.checkboxLabel}
    />
  )
})

interface InlineMultiSelectAllCheckboxProps
  extends CheckboxProps<number | string> {
  containerClassName?: string
  label: string
  checked: boolean
  callout: (stateName: string | number | undefined, check: boolean) => void
  stateName?: string
}
export function InlineMultiSelectAllCheckbox({
  containerClassName = styles.selectAll,
  label = 'Select All',
  callout,
  checked,
  stateName,
}: InlineMultiSelectAllCheckboxProps): JSX.Element {
  return (
    <div className={containerClassName}>
      <Button as='unstyled' onClick={() => callout?.(stateName, checked)}>
        {label}
      </Button>
    </div>
  )
}

function convertPropToRenderable(
  IncomingProp: React.ReactNode,
  propsToPass = {}
) {
  switch (typeof IncomingProp) {
    case 'function':
      return <IncomingProp {...propsToPass} />

    case 'object':
      if (isValidElement(IncomingProp)) {
        return cloneElement(IncomingProp, propsToPass)
      } else {
        throw new Error('cannot convert plain object to React Element')
      }

    case 'boolean':
      return IncomingProp

    default:
      throw new Error(
        'could not determine the correct way to render this component'
      )
  }
}
