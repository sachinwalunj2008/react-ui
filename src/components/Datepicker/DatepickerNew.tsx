import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import {
  DateRangePicker,
  OrientationShape,
  isInclusivelyBeforeDay,
  isInclusivelyAfterDay,
  SingleDatePicker,
  FocusedInputShape,
} from 'react-dates'
import { Icon } from '../../module'
import styles from './_datepicker.module.scss'

type DatepickerNewProps = {
  startDate: Moment | null
  endDate?: Moment | null
  preSelected?: string
  selected?: string
  startDateId?: string
  endDateId?: string
  focused?: boolean
  showAllDates?: boolean
  resetDate?: () => void
  startDateReset?: Moment
  endDateReset?: Moment
  onDatesChange?: (startDate: Moment | null, endDate: Moment | null) => void
  onDateChange?: (startDate: Moment | null) => void
  hasFutureDates?: boolean
  specifiedDay?: Moment
  isOutsideRangeHandler?: (startDate: Moment) => boolean
  dateRangeFormat?: string
  /** customizable display format for date (default: 'MMMM DD, YYYY') */
  singleDateDisplayFormat?: string
  startDatePlaceholder?: string
  endDatePlaceholder?: string
  /** Placeholder for single date input (default: 'Date') */
  placeholder?: string
  /** identifies that the input is for a single date */
  isSingle?: boolean
  /** unique identifier for date input; needed if manual input option is desired */
  customId?: string
  reopenOnClear?: boolean
  monthsNum?: number
  customClass?: string
  reset?: boolean
  orientation?: OrientationShape | undefined
  /** Allow for manual entry / typing date into input (default: false) */
  manualInput?: boolean
  /** Show the native component's `X` to clear the date field (default: false) */
  showClearDate?: boolean
}

type IState = {
  startDateState: Moment | null
  endDateState: Moment | null
  focusedInput: FocusedInputShape | null
  focusedState: boolean
}

const DatepickerNew = ({
  customClass,
  customId,
  dateRangeFormat = 'MMM D',
  endDate,
  endDateId,
  endDatePlaceholder,
  endDateReset,
  focused = false,
  hasFutureDates,
  isOutsideRangeHandler,
  isSingle,
  manualInput = false,
  monthsNum,
  onDateChange,
  onDatesChange,
  orientation,
  placeholder,
  reopenOnClear,
  reset,
  resetDate,
  showAllDates = false,
  showClearDate = false,
  singleDateDisplayFormat = 'MMMM DD, YYYY',
  specifiedDay,
  startDate,
  startDateId,
  startDatePlaceholder,
  startDateReset,
}: DatepickerNewProps): JSX.Element => {
  const [state, setState] = useState<IState>({
    startDateState: startDate || null,
    endDateState: endDate || null,
    focusedInput: null,
    focusedState: focused,
  })

  const { startDateState, endDateState, focusedInput, focusedState } = state

  const datesChanged = (startDate: Moment | null, endDate: Moment | null) => {
    if (startDate === null && endDate === null) {
      resetDate?.()
    }
    setState((prevState) => ({
      ...prevState,
      startDateState:
        startDateReset && !startDate && !endDate
          ? startDateReset
          : startDate?.clone().startOf('day') ?? null,
      endDateState:
        endDateReset && !startDate && !endDate
          ? endDateReset
          : endDate?.clone().endOf('day') ?? null,
    }))
    onDatesChange?.(startDate, endDate)
  }

  const updateSingleDate = (startDate: Moment | null) => {
    onDateChange?.(startDate)
    setState((prevState) => ({
      ...prevState,
      startDateState: startDate,
    }))
  }

  const handleInputFocus = (
    focused: boolean | FocusedInputShape | null,
    stateName: string
  ) => {
    return setState((prevState) => ({
      ...prevState,
      [stateName]: focused,
    }))
  }

  const isOutsideRange = (day: Moment) => {
    const dateFunction = hasFutureDates
      ? isInclusivelyAfterDay
      : isInclusivelyBeforeDay

    if (showAllDates) {
      return false
    }
    return (
      !dateFunction(day, specifiedDay ? specifiedDay : moment()) ||
      isOutsideRangeHandler?.(day)
    )
  }

  useEffect(() => {
    /** if manualInput is selected, remove the readOnly attribute to allow typing in input field */
    const input = document.getElementById(`single-datepicker-${customId}`)
    if (input && manualInput) {
      input.removeAttribute('readonly')
    }

    /** Hide the clear button on the datepicker */
    const clearButton = document.querySelector(
      '.SingleDatePickerInput_clearDate'
    )
    if (clearButton && !showClearDate) {
      clearButton.classList.add('hidden')
    }
  })

  return (
    <div
      className={`${styles.datepicker} ${customClass ? customClass : ''} ${
        orientation ? orientation : ''
      } ${window.innerWidth <= 768 && !orientation ? styles.vertical : ''}`}
    >
      {isSingle ? (
        <div
          className={`${startDateState ? styles.blur : ''} ${
            focusedState ? styles.focus : ''
          }`}
        >
          <SingleDatePicker
            date={startDateState}
            onDateChange={(startDate) => updateSingleDate(startDate)}
            focused={focusedState}
            onFocusChange={({ focused }) =>
              handleInputFocus(focused, 'focusedState')
            }
            numberOfMonths={1}
            navPrev={<Icon icon='left' />}
            navNext={<Icon icon='right' />}
            customInputIcon={<Icon icon='calendar' />}
            hideKeyboardShortcutsPanel={true}
            displayFormat={singleDateDisplayFormat}
            id={`single-datepicker-${customId}`}
            isOutsideRange={(day) => isOutsideRange(day) ?? false}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <div
          className={`${startDateState ? styles.blur : ''} ${
            focusedInput ? styles.focus : ''
          }`}
        >
          <DateRangePicker
            startDate={startDateState}
            startDateId={startDateId ?? ''}
            endDate={endDateState}
            endDateId={endDateId ?? ''}
            startDatePlaceholderText={startDatePlaceholder}
            endDatePlaceholderText={endDatePlaceholder}
            onDatesChange={({ startDate, endDate }) =>
              datesChanged(startDate, endDate)
            }
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) =>
              handleInputFocus(focusedInput, 'focusedInput')
            }
            showClearDates={true}
            hideKeyboardShortcutsPanel={true}
            numberOfMonths={monthsNum || 2}
            orientation={
              orientation
                ? orientation
                : window.innerWidth <= 768
                ? 'vertical'
                : 'horizontal'
            }
            navPrev={<Icon icon='left' />}
            navNext={<Icon icon='right' />}
            customArrowIcon={<Icon icon='arrowLong' />}
            customInputIcon={<Icon icon='calendar' />}
            customCloseIcon={
              <span className='uppercase'>{reset ? 'Reset' : 'Clear'}</span>
            }
            displayFormat={dateRangeFormat}
            inputIconPosition='after'
            reopenPickerOnClearDates={reopenOnClear || false}
            isOutsideRange={(day) => isOutsideRange(day) ?? false}
            minimumNights={0}
          />
        </div>
      )}
    </div>
  )
}

export default DatepickerNew
