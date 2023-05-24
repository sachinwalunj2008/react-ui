import * as React from 'react'
import {
  Button,
  Heading1,
  Icon,
  PopoverAndMobileDrawer,
  Tooltip,
  usePopoverAndMobileDrawer,
  useMediaQuery,
} from '../../module'
import { ComparisonDatePicker } from './ComparisonDatePicker'
import type {
  ComparisonDatePickerProps,
  SelectionStateBase,
} from './ComparisonDatePicker'
import styles from './comparison_date_picker_popup.module.scss'

type ComparisonDatePickerPopupProps = ComparisonDatePickerProps & {
  /** method will receive two values, `selectionState` and `selectionStateDispatch`; (selectionState, selectionStateDispatch) => void */
  onApply: OnApply
  /** indicates if the custom date range has been selected with valid dates */
  selectedCustomDateRange?: boolean
}

const CheckIcon = () => (
  <Icon
    icon='check'
    size='20px'
    customClass={`svg-white ${styles.tooltipIcon}`}
  />
)

const DateRangeDisplay = (
  props: ComparisonDatePickerPopupProps
): JSX.Element => {
  const firstRange_startDate =
      props?.initial_firstRange_startDate?.format('MM-DD-YY') ?? null,
    firstRange_endDate =
      props?.initial_firstRange_endDate?.format('MM-DD-YY') ?? null,
    secondRange_startDate =
      props?.initial_secondRange_startDate?.format('MM-DD-YY') ?? null,
    secondRange_endDate =
      props?.initial_secondRange_endDate?.format('MM-DD-YY') ?? null

  return (
    <div style={{ minWidth: '300px' }}>
      <Heading1
        text='Custom Timeframe'
        customClass={styles.tooltip_heading}
        option
      />
      <div className={`${styles.flexSpaceBetween} ${styles.fontPurple12}`}>
        <div>Date Range</div>
        <div className={styles.fontDarkPurple}>
          {firstRange_startDate} {' - '} {firstRange_endDate}
        </div>
      </div>
      {props.showComparisonRange && (
        <div className={`${styles.flexSpaceBetween} ${styles.fontPurple12}`}>
          <div>Compare Range</div>
          <div className={styles.fontDarkPurple}>
            {secondRange_startDate} {' - '} {secondRange_endDate}
          </div>
        </div>
      )}
    </div>
  )
}

export function ComparisonDatePickerPopup(
  props: ComparisonDatePickerPopupProps
): JSX.Element {
  const isMobileView = useMediaQuery({ type: 'max', breakpoint: 'md' })
  return (
    <div
      className={`${styles.contentContainer} ${
        props.selectedCustomDateRange ? styles.selected : ''
      }`}
    >
      <PopoverAndMobileDrawer
        content={<ComparisonWrapper {...props} />}
        tippyProps={tippyProps}
      >
        <Icon icon='calendar' size='12px' />
      </PopoverAndMobileDrawer>
      {props.selectedCustomDateRange && (
        <div className={styles.tooltip}>
          {isMobileView ? (
            <PopoverAndMobileDrawer
              content={<DateRangeDisplay {...props} />}
              sideDrawerProps={{ contentClassName: 'px-24' }}
            >
              <CheckIcon />
            </PopoverAndMobileDrawer>
          ) : (
            <Tooltip
              position='right'
              tooltipContent={<DateRangeDisplay {...props} />}
            >
              <CheckIcon />
            </Tooltip>
          )}
        </div>
      )}
    </div>
  )
}

const tippyProps: React.ComponentPropsWithoutRef<
  typeof PopoverAndMobileDrawer
>['tippyProps'] = {
  placement: 'right',
  maxWidth: 'none',
  className: 'datepicker',
  // due to the Calendar component acting weird on Tippy close, we have to set the tippy closing duration to 0 to avoid some rendering issues
  duration: [300, 0],
  appendTo: 'parent', // added for global filter custom date range popup
}

function ComparisonWrapper(props: ComparisonDatePickerPopupProps) {
  const { togglePopoverOrDrawer, isOpen } = usePopoverAndMobileDrawer()
  return (
    <ComparisonDatePicker key={isOpen.toString()} {...props}>
      {(selectionState, selectionStateDispatch) => (
        <div className={`${styles.flexSpaceBetween} ${styles.marginTop8}`}>
          <Button
            styleType='text-red'
            onClick={() => {
              const originalDates: SelectionStateBase = {
                firstRange_startDate:
                  props.initial_firstRange_startDate ?? null,
                firstRange_endDate: props.initial_firstRange_endDate ?? null,
                secondRange_startDate:
                  props.initial_secondRange_startDate ?? null,
                secondRange_endDate: props.initial_secondRange_endDate ?? null,
              }
              selectionStateDispatch({ action: 'resetInputs', originalDates })
            }}
          >
            Clear Dates
          </Button>
          <Button
            styleType='tertiary'
            onClick={() => {
              props.onApply(selectionState)
              togglePopoverOrDrawer()
            }}
          >
            Apply
          </Button>
        </div>
      )}
    </ComparisonDatePicker>
  )
}

type OnApply = (dates: SelectionStateBase) => void
