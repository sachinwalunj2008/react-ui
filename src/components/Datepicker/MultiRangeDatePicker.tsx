import * as React from 'react'
import { DayPickerRangeController } from 'react-dates'
import moment from 'moment'

import { Icon, useMediaQuery } from '../../module'
import {
  backgroundClassNames,
  foregroundClassNames,
  getDayStatus,
} from './MultiRangeDatePicker.helper'
import type {
  SelectionState,
  SelectionStateDispatchActions,
} from './ComparisonDatePicker'
import styles from './multirange_picker.module.scss'

type MultiRangeDatePickerProps = {
  selectionState: SelectionState
  selectionStateDispatch: React.Dispatch<SelectionStateDispatchActions>
}
export function MultiRangeDatePicker({
  selectionState,
  selectionStateDispatch,
}: MultiRangeDatePickerProps): JSX.Element {
  const nowMoment = moment()
  const isMobileView = useMediaQuery({ type: 'max', breakpoint: 'md' })

  return (
    <div
      className={`datepicker ${styles.multiRangePicker} ${
        isMobileView && styles.centered
      }`}
    >
      <DayPickerRangeController
        isOutsideRange={(day) => {
          // don't allow to pick days after today, since we can't do comparisons in the future ;)
          if (day.isAfter(nowMoment, 'day')) {
            return true
          }

          // don't allow selecting an "endDate" that comes before the "startDate"
          if (selectionState.selecting.includes('endDate')) {
            return day.isBefore(
              selectionState.selecting === 'firstRange_endDate'
                ? selectionState.firstRange_startDate
                : selectionState.secondRange_startDate,
              'day'
            )
          }
          return false
        }}
        noBorder
        daySize={28}
        horizontalMonthPadding={4}
        minimumNights={0} // allow users to pick a single day for the "range"
        initialVisibleMonth={() => nowMoment.clone().subtract(1, 'month')}
        startDate={
          selectionState.selecting.includes('firstRange')
            ? selectionState.firstRange_startDate
            : selectionState.secondRange_startDate
        }
        endDate={
          selectionState.selecting.includes('firstRange')
            ? selectionState.firstRange_endDate
            : selectionState.secondRange_endDate
        }
        onDatesChange={({ startDate, endDate }) => {
          selectionStateDispatch({
            action: 'calendarDateSelected',
            date: selectionState.selecting.includes('startDate')
              ? startDate?.startOf('day') || null
              : endDate?.endOf('day') || null,
          })
        }}
        focusedInput={
          selectionState.selecting.includes('startDate')
            ? 'startDate'
            : 'endDate'
        }
        onFocusChange={(focusedInput) => {
          // onFocusChange is a required prop, but we don't need to do anything here
        }}
        hideKeyboardShortcutsPanel
        numberOfMonths={isMobileView ? 1 : 2}
        orientation='horizontal'
        navPrev={<Icon icon='left' />}
        navNext={<Icon icon='right' />}
        renderDayContents={(day, mods) => {
          const dayStatus = getDayStatus(day, selectionState)
          return (
            <div className={styles.outerDayDiv}>
              <div
                className={`${styles.backgroundDiv} ${backgroundClassNames(
                  dayStatus
                )} flex`}
              >
                <div
                  className={`${styles.backgroundDivChild} ${styles.backgroundDivLeft}`}
                />
                <div
                  className={`${styles.backgroundDivChild} ${styles.backgroundDivRight}`}
                />
              </div>
              <div
                className={`flex align-items-center justify-content-center ${
                  styles.foregroundDiv
                } ${foregroundClassNames(dayStatus)} ${
                  mods.has('blocked-out-of-range')
                    ? 'fc-medium-purple'
                    : 'fc-dark-purple'
                }`}
              >
                {day.format('D')}
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
