import React, { useEffect, useState } from 'react'
import {
  Icon,
  Tooltip,
  Button,
  PopoverFormContainer,
  SelectDisplay,
  useTippyHide,
  PopoverAndMobileDrawer,
  useMediaQuery,
  usePopoverAndMobileDrawer,
  PopoverHeader,
} from '../../module'
import Tippy, { TippyProps } from '@tippyjs/react'
import styles from './_sort-column.module.scss'
import TableFilter from '../TableComponents/TableFilter'
import { SelectDisplayOption } from '../../components/Selects/SelectDisplay/SelectDisplay'
import { TippyHideParams } from '../../hooks'

type TableFilterProps = React.ComponentProps<typeof TableFilter>

type SortColumnOptionsProps = {
  name: string
  label: string
}

type SortColumnTooltipProps = {
  content: React.ReactNode
  position?: TippyProps['placement']
}

export type SortByProps = {
  /** Value used to sort by */
  prop: string
  /** `True` === 'asc' && `False` === 'desc' */
  flip: boolean
  /** Should use the `:lowercase` param */
  lowerCaseParam?: boolean
}

type SortColumnProps<OptionItem extends SortColumnOptionsProps> =
  | SortColumnPropsSingleValue
  | SortColumnPropsMultipleValues<OptionItem>

type SortColumnPropsBase = {
  /** Label that is displayed for the table column */
  label: string
  /** Function to update sort direction of the column while also setting the column to active */
  sorter: (arg: {
    activeColumn: SortByProps['prop']
    direction: boolean
    lowerCaseParam?: SortByProps['lowerCaseParam']
  }) => void
  /** Optional class  */
  customClass?: string
  /** Optionally add custom JSX. This will be rendered to the right of the column header. */
  columnHeaderSubContent?: React.ReactNode
  /** This determines the style of the label. It tells the user which column is currently being sorted.   */
  active: SortByProps
  /** Name of the label that we store locally in to the browser  */
  localStorageName: string
  /** This is used if we need to send back `lowercase` in the api params */
  lowerCaseParam?: boolean
  /** Optional tooltip to be displayed next to the label   */
  tooltip?: SortColumnTooltipProps
  /** This allows us to add a filter for a specific column. The filter is then applied to the table to help narrow down the results of the table. */
  filter?: {
    headerText: string
    /** Temporary active sort option for secondary filter. This is needed to keep track of changes to the sort before the sort has been applied. (TODO: this prop needs to be required after all instances in consuming apps have been updated) */
    secondarySortProp?: string
    children: React.ReactNode
    // headerText required in secondary component so we can handle user click in our app.
    callout: (headerText: string) => void
    /** Callout invoked when the filter is closed. This helps us to clear any unsaved changes to the filter. (TODO: this prop needs to be required after all instances in consuming apps have been updated) */
    closeCallout?: (headerText: string) => void
    /** Callout invoked when active sortProp changes. This callout provides sortProp which is currently active. This helps us to keep track of intermediate changes to sortProp before the filter has been applied. (TODO: this prop needs to be required after all instances in consuming apps have been updated) */
    onSortChange?: (sortPropName: string) => void
    disabled: boolean
  }
  /** Table filters that are currently in use. This is to be used with the `filter` prop. */
  activeFilters?: TableFilterProps['activeFilters']
  /** Optional prop to determine whether to allow sorting for the column */
  noSort?: boolean
}

type SortColumnPropsSingleValue = SortColumnPropsBase & {
  /** propName is used if there is only 1 sort value */
  propName: string
  options?: never
}

type SortColumnPropsMultipleValues<OptionItem> = SortColumnPropsBase & {
  propName?: never
  /** options are used if there are more than 1 sort values */
  options: OptionItem[]
}

type SortFuncProps = {
  callback?: () => void
  keyName: string
}

const SortColumn = <OptionItem extends SortColumnOptionsProps>({
  label,
  propName,
  options,
  sorter,
  customClass = '',
  active,
  localStorageName,
  lowerCaseParam,
  tooltip,
  filter,
  activeFilters,
  noSort,
  columnHeaderSubContent,
}: SortColumnProps<OptionItem>): JSX.Element => {
  const [activeSortProp, setActiveSort] = useState(
      filter?.secondarySortProp ?? ''
    ),
    activeOption = options?.map((opt) => opt.name).includes(active.prop),
    activePropName = propName === active.prop,
    propNameCheck = options ? activeOption : activePropName,
    screenIsMdMin = useMediaQuery({ type: 'min', breakpoint: 'md' })

  const sort = ({ callback, keyName }: SortFuncProps) => {
    if (sorter) {
      // Checking to see if we have options or propName to determine which of these should check against active.flip
      const dir = propNameCheck ? !active.flip : active.flip
      localStorage.setItem(
        localStorageName,
        JSON.stringify({
          prop: keyName,
          flip: dir,
          lowerCaseParam: lowerCaseParam,
        })
      )

      sorter({
        activeColumn: keyName,
        direction: dir,
        lowerCaseParam,
      })
      callback?.()
    }
  }

  const closeFilter = () => {
    setActiveSort(
      options?.filter((e) => e.name === active.prop)?.[0]?.name ?? ''
    )
  }

  const isCurrentActiveSort = options
    ? options.some((opt) => opt.name === active.prop)
    : propName === active.prop

  const callout = (option: SelectDisplayOption) => {
    setActiveSort(option.name)
    filter?.onSortChange?.(option.name)
  }

  useEffect(() => {
    const activePropName = filter?.secondarySortProp
      ? filter?.secondarySortProp
      : options?.filter((e) => e.name === active.prop)?.[0]?.name ?? ''
    setActiveSort(activePropName)
  }, [active.prop, filter?.secondarySortProp, options])

  const applyFilter = () => {
    filter?.callout(filter.headerText)
    !noSort &&
      !!activeSortProp &&
      !(activeSortProp === active.prop) &&
      sort({ keyName: activeSortProp })
    closeFilter()
  }

  const isDisableApply = noSort
    ? filter?.disabled
    : filter?.disabled &&
      ((!!activeSortProp && activeSortProp === active.prop) || !activeSortProp)
  return (
    <div
      className={`flex align-items-center text-left pr-24 cursor-pointer ${customClass}`}
    >
      {filter &&
        activeFilters &&
        Object.keys(activeFilters).find((af) => af === label) && (
          <span
            style={{ height: '4px', width: '4px' }}
            className='bgc-blue bdrr-16 mr-4'
          ></span>
        )}
      {filter ? (
        <PopoverAndMobileDrawer
          content={
            screenIsMdMin ? (
              <PopoverFormContainer
                width={'auto'}
                header={filter.headerText}
                footerChildren={
                  <FilterFormButtons
                    callout={applyFilter}
                    disabled={isDisableApply}
                    closeCallout={filter.closeCallout}
                    headerText={filter.headerText}
                  />
                }
              >
                <FilterContent
                  filter={filter}
                  noSort={noSort}
                  // @ts-expect-error testing options
                  options={options}
                  callout={callout}
                  activeSortProp={activeSortProp}
                />
              </PopoverFormContainer>
            ) : (
              <FilterContent
                filter={filter}
                noSort={noSort}
                // @ts-expect-error testing options
                options={options}
                callout={callout}
                activeSortProp={activeSortProp}
              />
            )
          }
          tippyProps={{
            maxWidth: 'none',
            className: `${styles.tippyArrow}`,
          }}
          sideDrawerProps={{
            headerContent: filter.headerText,
            footerContent: (
              <div className='flex justify-content-end'>
                <FilterFormButtons
                  callout={applyFilter}
                  disabled={isDisableApply}
                  closeCallout={filter.closeCallout}
                  headerText={filter.headerText}
                />
              </div>
            ),
          }}
        >
          <SortHeaderLabel label={label} active={propNameCheck} />
        </PopoverAndMobileDrawer>
      ) : (
        <>
          {options && (
            <OptionsPopover options={options} sort={sort} active={active}>
              {({ showPopover }) => (
                <SortHeaderLabel
                  label={label}
                  callout={() => {
                    showPopover()
                  }}
                  active={propNameCheck}
                />
              )}
            </OptionsPopover>
          )}
          {propName && (
            <SortHeaderLabel
              label={label}
              callout={() => {
                sort({ keyName: propName })
              }}
              active={propNameCheck}
            />
          )}
        </>
      )}
      {tooltip && (
        <Tooltip
          tooltipContent={tooltip.content}
          position={tooltip.position ? tooltip.position : 'bottom'}
        >
          <Icon icon='info' customClass='svg-blue ml-8' size='12px' />
        </Tooltip>
      )}
      {columnHeaderSubContent ? columnHeaderSubContent : null}
      {/* TODO: make icon click use the OptionsPopover as well */}
      {!noSort && (
        <Button
          as='unstyled'
          style={{ display: 'flex', justifyContent: 'flex-start' }}
          onClick={() =>
            sort({
              ...(options
                ? {
                    keyName: options?.some((el) => el.name === active?.prop)
                      ? active?.prop
                      : options?.[0].name,
                  }
                : { keyName: propName ?? '' }),
            })
          }
        >
          <Icon
            icon='carat'
            customClass={`ml-8 ${
              activePropName || activeOption ? 'svg-purple' : 'svg-light-gray'
            } ${isCurrentActiveSort && active.flip ? styles.flip : ''}`}
            size='10px'
          />
        </Button>
      )}
    </div>
  )
}

export default SortColumn

type SortHeaderLabelProps = {
  label: string
  callout?: () => void
  active?: boolean
}

const SortHeaderLabel = ({ label, callout, active }: SortHeaderLabelProps) => (
  <Button
    as='unstyled'
    className={`${styles.header} ${active ? styles.active : ''}`}
    onClick={callout}
  >
    {label}
  </Button>
)

type OptionsPopoverProps<OptionItem extends SortColumnOptionsProps> = {
  options: OptionItem[]
  sort: ({ callback, keyName }: SortFuncProps) => void
  active: SortByProps
  children: (showPopover: { showPopover: () => void }) => React.ReactNode
  scrollSelector?: TippyHideParams['scrollSelector']
  scrollHorizontalDistance?: TippyHideParams['scrollDistance']
}

const OptionsPopover = <OptionItem extends SortColumnOptionsProps>({
  options,
  sort,
  active,
  children,
  scrollSelector = 'body',
  scrollHorizontalDistance,
}: OptionsPopoverProps<OptionItem>) => {
  const [activeProp, setActive] = useState('')

  const tippyRef = React.useRef(null)
  const [show, setShow] = useTippyHide({
    tippyRef,
    scrollSelector: scrollSelector,
    scrollHorizontalDistance: scrollHorizontalDistance,
  })

  const showPopover = () => {
    setShow(true)
  }

  const close = () => {
    setShow(false)
  }

  const callout = (option: SelectDisplayOption) => {
    setActive(option.name)
    sort({ keyName: option.name })
    close()
  }

  useEffect(() => {
    const activePropName =
      options?.filter((e) => e.name === active.prop)?.[0]?.name ?? ''
    setActive(activePropName)
  }, [active.prop, options])

  return (
    <Tippy
      placement='bottom'
      ref={tippyRef}
      content={
        <div>
          <PopoverHeader headerText='Sort By' />
          <SelectDisplay
            options={options}
            callout={callout}
            active={activeProp}
          />
        </div>
      }
      className='no-padding gray-arrow'
      maxWidth='none'
      interactive
      appendTo={document.body}
      visible={show}
      onClickOutside={close}
      duration={[null, 0]}
    >
      <span>{children({ showPopover })}</span>
    </Tippy>
  )
}

type FilterFormButtonsProps = {
  callout: () => void
  disabled?: boolean
  closeCallout?: (headerText: string) => void
  headerText: string
}

const FilterFormButtons = ({
  callout,
  disabled,
  closeCallout,
  headerText,
}: FilterFormButtonsProps) => {
  const { closePopoverOrDrawer } = usePopoverAndMobileDrawer()

  const close = () => {
    closeCallout?.(headerText)
    closePopoverOrDrawer()
  }

  return (
    <>
      <Button
        onClick={() => {
          close()
        }}
      >
        Cancel
      </Button>
      <ApplyButton
        callout={() => {
          callout()
          close()
        }}
        disabled={disabled}
      />
    </>
  )
}

type ApplyButtonProps = {
  callout: () => void
  disabled?: boolean
}

const ApplyButton = ({ disabled, callout }: ApplyButtonProps) => {
  return (
    <Button
      styleType='primary-green'
      className='ml-8'
      onClick={callout}
      disabled={disabled}
    >
      Apply
    </Button>
  )
}

type FilterContentProps = {
  filter: SortColumnPropsBase['filter']
  noSort: SortColumnPropsBase['noSort']
  options: SelectDisplayOption[]
  callout: (option: SelectDisplayOption) => void
  activeSortProp: string
}

const FilterContent = ({
  filter,
  noSort,
  options,
  callout,
  activeSortProp,
}: FilterContentProps): JSX.Element => {
  const hasSortAndOptions = !noSort && !!options

  return (
    <div
      className={`${styles.filterContainer} ${
        options ? styles.hasOptions : ''
      }`}
    >
      <div>{filter?.children}</div>
      {hasSortAndOptions && (
        <>
          <div className={styles.divider} />
          <div>
            <div className='mb-8 fs-12 fc-purple'>Sort By</div>
            <SelectDisplay
              options={options}
              callout={callout}
              active={activeSortProp}
              hasBorder
            />
          </div>
        </>
      )}
    </div>
  )
}
