import React, { useReducer } from 'react'
import moment, { Moment } from 'moment'
import { Select, TextInput, toast, Mdash } from '../../module'
import { MultiRangeDatePicker } from './MultiRangeDatePicker'
import { compareToOptions } from './compareTo'
import styles from './comparison_date_ranges.module.scss'

type CompareToType = {
  id: number
  period: string
  getCompareToDates: (state: SelectionState) => {
    previousStartDate: PickerDate
    previousEndDate: PickerDate
  }
}

const displayDateFormat = 'M-D-YY',
  parseDateFormats = ['M-D-YYYY', 'M/D/YYYY', 'M-D-YY', 'M/D/YY'],
  inputSelection = {
    firstRange_startDate: 'Start Date',
    firstRange_endDate: 'End Date',
    secondRange_startDate: 'Compare Start Date',
    secondRange_endDate: 'Compare End Date',
  }

export type ComparisonDatePickerProps = {
  initial_firstRange_startDate?: PickerDate
  initial_firstRange_endDate?: PickerDate
  initial_secondRange_startDate?: PickerDate
  initial_secondRange_endDate?: PickerDate
  /** Toggle to determine if  the comparison date range option be visible */
  showComparisonRange?: boolean
  /** Toggle to determine if the `Compare To` dropdown selector is visible */
  showCompareToSelector?: boolean
  children?: (
    /** selectionState will include all four dates, compareTo value & resetInputs boolean */
    selectionState: SelectionState,
    /** dispatch action to update the value of the selectionState */
    selectionStateDispatch: React.Dispatch<SelectionStateDispatchActions>
  ) => React.ReactNode | void
}

type DateRangeType = Exclude<keyof SelectionStateBase, 'showComparisonRange'>

export function ComparisonDatePicker(
  props: ComparisonDatePickerProps
): JSX.Element {
  const [selectionState, selectionStateDispatch] = useReducer(rangeReducer, {
    firstRange_startDate:
      props.initial_firstRange_startDate ?? initialState().firstRange_startDate,
    firstRange_endDate:
      props.initial_firstRange_endDate ?? initialState().firstRange_endDate,
    secondRange_startDate:
      props.initial_secondRange_startDate ??
      initialState().secondRange_startDate,
    secondRange_endDate:
      props.initial_secondRange_endDate ?? initialState().secondRange_endDate,
    selecting: initialState().selecting,
    showComparisonRange:
      props.showComparisonRange ?? initialState().showComparisonRange,
    compareTo: compareToOptions[0],
    resetInputs: true,
  })

  const submitDate = (
    inputValue: DateRangeType,
    dateValue?: string | number
  ): void => {
    if (dateValue) {
      const startOfDay = inputValue.includes('start')
      let newDate = startOfDay
        ? moment(dateValue, parseDateFormats, true).startOf('day')
        : moment(dateValue, parseDateFormats, true).endOf('day')
      // validate that dateValue is a valid date
      if (newDate.isValid()) {
        // validate that the date is not after the current date
        if (newDate.isAfter(moment())) {
          newDate = moment()
          toast({
            type: 'error',
            message: `You can only select dates up to the current day in the date picker.  We have changed the ${inputSelection[inputValue]} to the current date automatically`,
          })

          // Need to wait for the toast to be displayed before we can set the z-index on the element
          setTimeout(() => {
            const toastContainer = document.querySelector(
              '.Toastify__toast-container'
            ) as HTMLElement
            if (toastContainer) {
              toastContainer.style.zIndex = '10000' // needs to be greater than the z-index (9999) of the tippy date picker
            }
          })
        }

        selectionStateDispatch({
          action: 'dateInputChanged',
          date: newDate,
          inputName: inputValue,
        })
      }
    }
  }

  return (
    <div className={styles.comparisonDateRanges}>
      {/* Time Period Comparisons Dropdown */}
      {props.showCompareToSelector && selectionState.showComparisonRange && (
        <Select
          name='time-period-comparisons'
          labelText='Compare To'
          options={compareToOptions}
          optionKeyName='period'
          onChange={(_, value: CompareToType) => {
            !!value &&
              selectionStateDispatch({
                action: 'changeCompareTo',
                compareTo: value,
              })
          }}
          customClass={`select ${styles.fullSizeContainer}`}
        />
      )}
      <div className={styles.flexCenter}>
        {/* First Start Date Manual Input */}
        <TextInput
          containerClassName={`${styles.textInput}`}
          type='text'
          value={
            selectionState.firstRange_startDate?.format(displayDateFormat) ?? ''
          }
          onBlurCallout={() =>
            selectionStateDispatch({
              action: 'selectedDateInputChange',
              inputName: 'firstRange_startDate',
            })
          }
          callout={(_, value) => submitDate('firstRange_startDate', value)}
          labelText={
            <span>
              <span
                className={`${styles.dateCircle} ${styles.firstRangeCircle}`}
              />
              Start Date
            </span>
          }
          required
          placeholder={displayDateFormat}
        />
        <div className={styles.mDash}>
          <Mdash />
        </div>

        {/* First End Date Manual Input */}
        <TextInput
          containerClassName={`${styles.textInput}`}
          type='text'
          value={
            selectionState.firstRange_endDate?.format(displayDateFormat) ?? ''
          }
          onBlurCallout={() =>
            selectionStateDispatch({
              action: 'selectedDateInputChange',
              inputName: 'firstRange_endDate',
            })
          }
          callout={(_, value) => submitDate('firstRange_endDate', value)}
          labelText={
            <span>
              <span
                className={`${styles.dateCircle} ${styles.firstRangeCircle}`}
              />
              End Date
            </span>
          }
          required
          placeholder={displayDateFormat}
        />
      </div>

      {selectionState.showComparisonRange && (
        <>
          {/* Second Start Date Manual Input */}
          <div className={`${styles.flexCenter} ${styles.marginTop16}`}>
            <TextInput
              containerClassName={`${styles.textInput}`}
              type='text'
              value={
                selectionState.secondRange_startDate?.format(
                  displayDateFormat
                ) ?? ''
              }
              onBlurCallout={() =>
                selectionStateDispatch({
                  action: 'selectedDateInputChange',
                  inputName: 'secondRange_startDate',
                })
              }
              callout={(_, value) => submitDate('secondRange_startDate', value)}
              labelText={
                <span>
                  <span
                    className={`${styles.dateCircle} ${styles.secondRangeCircle}`}
                  />
                  Compare Start Date
                </span>
              }
              placeholder={displayDateFormat}
            />
            <div className={styles.mDash}>
              <Mdash />
            </div>

            {/* Second End Date Manual Input */}
            <TextInput
              containerClassName={`${styles.textInput}`}
              type='text'
              value={
                selectionState.secondRange_endDate?.format(displayDateFormat) ??
                ''
              }
              onBlurCallout={() =>
                selectionStateDispatch({
                  action: 'selectedDateInputChange',
                  inputName: 'secondRange_endDate',
                })
              }
              callout={(_, value) => submitDate('secondRange_endDate', value)}
              labelText={
                <span>
                  <span
                    className={`${styles.dateCircle} ${styles.secondRangeCircle}`}
                  />
                  Compare End Date
                </span>
              }
              placeholder={displayDateFormat}
            />
          </div>
        </>
      )}

      <div className={styles.marginTop16}>
        <MultiRangeDatePicker
          selectionState={selectionState}
          selectionStateDispatch={selectionStateDispatch}
        />
      </div>
      {typeof props.children === 'function'
        ? props.children(selectionState, selectionStateDispatch)
        : props.children}
    </div>
  )
}

const initialState = (showComparisonRange = false): SelectionState => ({
  compareTo: compareToOptions[0],
  firstRange_endDate: null,
  firstRange_startDate: null,
  resetInputs: false,
  secondRange_endDate: null,
  secondRange_startDate: null,
  selecting: 'firstRange_startDate',
  showComparisonRange,
})

function shouldResetInputs(state: SelectionState): boolean {
  /** Determine if a mouse click on the calendar should reset all date inputs */
  let shouldReset = false

  // only showing single date range and both dates are selected
  if (
    !state.showComparisonRange &&
    state.firstRange_startDate &&
    state.firstRange_endDate
  )
    shouldReset = true

  // showing both comparison date ranges and all dates are selected (Custom Range)
  if (
    state.showComparisonRange &&
    state.firstRange_startDate &&
    state.firstRange_endDate &&
    state.secondRange_startDate &&
    state.secondRange_endDate
  )
    shouldReset = true

  // showing both comparison date ranges with `CompareTo` time selected and first date range is selected
  if (
    state.showComparisonRange &&
    state.compareTo.id !== 0 &&
    state.firstRange_startDate &&
    state.firstRange_endDate
  )
    shouldReset = true

  return shouldReset
}

const validStartDate = (
  startDate: PickerDate,
  endDate?: PickerDate
): boolean => {
  return Boolean(endDate && startDate?.isSameOrBefore(endDate, 'day'))
}

const validEndDate = (endDate: PickerDate, startDate?: PickerDate): boolean => {
  return Boolean(startDate && endDate?.isSameOrAfter(startDate, 'day'))
}

function rangeReducer(
  prevState: SelectionState,
  payload: SelectionStateDispatchActions
): SelectionState {
  switch (payload.action) {
    /** MOUSE CLICK / CALENDAR DATE ENTRY (MultiRangeDatePicker) */
    case 'calendarDateSelected': {
      const newState: SelectionState = {
        ...(prevState.resetInputs // if resetInputs is true, reset all inputs
          ? initialState(prevState.showComparisonRange) // clear the selected dates to the initial state, plus `showComparisonRange` value so it isn't lost
          : prevState), // otherwise, keep the previously selected dates
        [prevState.selecting]: payload.date, // Update the selected date value
        compareTo: prevState.compareTo, // Keep the `Compare To` value the same
      }

      /** START DATE VALIDATION */
      // validate the date selections such that the selected start date is before the selected end date
      if (
        !validStartDate(
          newState.firstRange_startDate,
          newState.firstRange_endDate
        )
      ) {
        newState.firstRange_endDate = null
      } else if (
        !validEndDate(
          newState.firstRange_endDate,
          newState.firstRange_startDate
        )
      ) {
        newState.firstRange_endDate = null
      } else if (
        newState.secondRange_startDate &&
        !validStartDate(
          newState.secondRange_startDate,
          newState.secondRange_endDate
        )
      ) {
        newState.secondRange_endDate = null
      } else if (
        newState.secondRange_endDate &&
        !validEndDate(
          newState.secondRange_endDate,
          newState.secondRange_startDate
        )
      ) {
        newState.secondRange_endDate = null
      }

      //  if a `Compare To` value is selected && start/end dates set, set the secondRange values accordingly
      if (newState.firstRange_startDate && newState.firstRange_endDate) {
        const { previousStartDate, previousEndDate } =
          prevState.compareTo.getCompareToDates(newState)

        newState.secondRange_startDate =
          previousStartDate ?? newState.secondRange_startDate
        newState.secondRange_endDate =
          previousEndDate ?? newState.secondRange_endDate
      }

      // determine next date to select
      newState.selecting = getNextSelectionState(newState, newState.selecting)

      // if setting the final date, then reset the inputs on the next date selection
      newState.resetInputs = shouldResetInputs(newState)

      return newState
    }

    /** MANUAL DATE ENTRY */
    case 'dateInputChanged': {
      const newState: SelectionState = {
        ...prevState,
        [payload.inputName]: payload.date,
      }
      /** BEGIN INPUT DATE VALIDATION
       *     if a start date is selected, validate that the corresponding end date is the same day or later
       *     if an end date is selected, validate that the corresponding start date is the same day or earlier
       */
      if (
        payload.inputName === 'firstRange_startDate' &&
        !validStartDate(
          newState.firstRange_startDate,
          newState.firstRange_endDate
        )
      ) {
        // start date can't come after end date, so reset end date
        newState.firstRange_endDate = null
      }

      if (
        payload.inputName === 'firstRange_endDate' &&
        !validEndDate(
          newState.firstRange_endDate,
          newState.firstRange_startDate
        )
      ) {
        // end date can't come before start date, so reset end date
        newState.firstRange_endDate = null
      }

      if (
        payload.inputName === 'secondRange_startDate' &&
        !validStartDate(
          newState.secondRange_startDate,
          newState.secondRange_endDate
        )
      ) {
        // start date can't come after end date, so reset end date
        newState.secondRange_endDate = null
      }

      if (
        payload.inputName === 'secondRange_endDate' &&
        !validEndDate(
          newState.secondRange_endDate,
          newState.secondRange_startDate
        )
      ) {
        // end date can't come before start date, so reset end date
        newState.secondRange_endDate = null
      }
      /** END INPUT DATE VALIDATION */

      //  if a `Compare To` value is selected && start/end dates set, set the secondRange values accordingly
      if (newState.firstRange_startDate && newState.firstRange_endDate) {
        const { previousStartDate, previousEndDate } =
          prevState.compareTo.getCompareToDates(newState)

        newState.secondRange_startDate =
          previousStartDate ?? newState.secondRange_startDate
        newState.secondRange_endDate =
          previousEndDate ?? newState.secondRange_endDate
      }

      // determine next date to select
      newState.selecting = getNextSelectionState(newState, newState.selecting)

      // if setting the final date, then reset the inputs on the next date selection
      newState.resetInputs = shouldResetInputs(newState)

      return newState
    }

    /** RESET DATE VALUES */
    case 'resetInputs': {
      const newState: SelectionState = {
        ...prevState,
        ...initialState(),
        showComparisonRange: prevState.showComparisonRange,
      }

      return newState
    }

    /** UPDATED `COMPARE TO` VALUES ON STATE */
    case 'changeCompareTo': {
      // update the comparison range with the new `Compare To` value (if applicable)
      const newState: SelectionState = {
        ...prevState,
        compareTo: payload.compareTo,
      }
      // check if first start/end date are set, if so, update the second range with the new `Compare To` value
      if (newState.firstRange_startDate && newState.firstRange_endDate) {
        const { previousStartDate, previousEndDate } =
          newState.compareTo.getCompareToDates(newState)

        newState.secondRange_startDate =
          previousStartDate ?? newState.secondRange_startDate
        newState.secondRange_endDate =
          previousEndDate ?? newState.secondRange_endDate
      }

      return newState
    }

    /** CHANGE INPUT SELECTION FROM MANUAL INPUT */
    case 'selectedDateInputChange': {
      return { ...prevState, selecting: payload.inputName, resetInputs: false }
    }

    default:
      throw new Error("Reducer doesn't handle that action")
  }
}

function getNextSelectionState(
  selectionState: SelectionState,
  selecting: SelectionState['selecting']
): SelectionState['selecting'] {
  const allSelected =
    selectionState.firstRange_startDate &&
    selectionState.firstRange_endDate &&
    selectionState.secondRange_startDate &&
    selectionState.secondRange_endDate

  switch (selecting) {
    case 'firstRange_startDate':
      if (!selectionState.firstRange_endDate) {
        return 'firstRange_endDate'
      }
      if (
        !selectionState.secondRange_startDate &&
        selectionState.showComparisonRange &&
        selectionState.compareTo.id === 0
      ) {
        return 'secondRange_startDate'
      }
      if (
        !selectionState.secondRange_endDate &&
        selectionState.showComparisonRange &&
        selectionState.compareTo.id === 0
      ) {
        return 'secondRange_endDate'
      }
      if (allSelected) {
        return 'firstRange_startDate'
      }
      return 'firstRange_endDate'
    case 'firstRange_endDate':
      if (
        !selectionState.secondRange_startDate &&
        selectionState.showComparisonRange &&
        selectionState.compareTo.id === 0
      ) {
        return 'secondRange_startDate'
      }
      if (
        !selectionState.secondRange_endDate &&
        selectionState.showComparisonRange &&
        selectionState.compareTo.id === 0
      ) {
        return 'secondRange_endDate'
      }
      if (!selectionState.firstRange_startDate || allSelected) {
        return 'firstRange_startDate'
      }
      return selectionState.showComparisonRange &&
        selectionState.compareTo.id === 0
        ? 'secondRange_startDate'
        : 'firstRange_startDate'
    case 'secondRange_startDate':
      if (!selectionState.secondRange_endDate) {
        return 'secondRange_endDate'
      }
      if (!selectionState.firstRange_startDate) {
        return 'firstRange_startDate'
      }
      if (!selectionState.firstRange_endDate) {
        return 'firstRange_endDate'
      }
      return 'firstRange_startDate'
    case 'secondRange_endDate':
      if (!selectionState.secondRange_startDate) {
        return 'secondRange_startDate'
      }
      if (!selectionState.firstRange_startDate) {
        return 'firstRange_startDate'
      }
      if (!selectionState.firstRange_endDate) {
        return 'firstRange_endDate'
      }
      return 'firstRange_startDate'

    default:
      throw new Error("state doesn't exist")
  }
}

export type PickerDate = Moment | null
export type SelectionStateBase = {
  firstRange_startDate: PickerDate
  firstRange_endDate: PickerDate
  secondRange_startDate: PickerDate
  secondRange_endDate: PickerDate
  showComparisonRange?: boolean
}
export type SelectionState = SelectionStateBase & {
  compareTo: CompareToType
  selecting: keyof SelectionStateBase
  resetInputs?: boolean
}
export type SelectionStateDispatchActions =
  | {
      action: 'calendarDateSelected'
      date: Moment | null
    }
  | {
      action: 'dateInputChanged'
      date: Moment
      inputName: keyof SelectionStateBase
    }
  | {
      action: 'resetInputs'
      originalDates: SelectionStateBase
    }
  | {
      action: 'changeCompareTo'
      compareTo: CompareToType
    }
  | {
      action: 'selectedDateInputChange'
      inputName: keyof SelectionStateBase
    }
