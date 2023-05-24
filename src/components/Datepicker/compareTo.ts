import moment from 'moment'
import type { PickerDate, SelectionState } from './ComparisonDatePicker'

type PreviousDatesType = {
  previousStartDate: PickerDate
  previousEndDate: PickerDate
}

/**
 *    Note:
 *    - This will allow the user to select a custom time period.
 **/
export const customTimeSelection = ({
  secondRange_startDate,
  secondRange_endDate,
}: SelectionState): PreviousDatesType => {
  return {
    previousStartDate: secondRange_startDate,
    previousEndDate: secondRange_endDate,
  }
}

/**
 *    Note:
 *    - This will automatically select the same number of days going back from the start of the start/end date.
 **/
export const previousPeriod = ({
  firstRange_startDate,
  firstRange_endDate,
  secondRange_startDate,
  secondRange_endDate,
}: SelectionState): PreviousDatesType => {
  // if we don't have both start/end dates we can't do any calculations (without both dates we don't call this function but TS will complain)
  if (!firstRange_startDate || !firstRange_endDate)
    return {
      previousStartDate: secondRange_startDate,
      previousEndDate: secondRange_endDate,
    }

  const difference = firstRange_endDate.diff(firstRange_startDate, 'days') + 1 // +1 because we don't want to include the start date in the comparison date range
  return {
    previousStartDate: moment(firstRange_startDate).subtract(
      difference,
      'days'
    ),
    previousEndDate: moment(firstRange_endDate).subtract(difference, 'days'),
  }
}

/**
 *    Note:
 *    - If your selection is less than 7 days, the comparisons should be the 7 days prior to your selection starting on the same day of the week.
 *    - If your selection is longer than 7 days, the functionality should be similar in how it finds the proceeding "same day of the week".
 **/
export const previousPeriodMatchDays = ({
  firstRange_startDate,
  firstRange_endDate,
  secondRange_startDate,
  secondRange_endDate,
}: SelectionState): PreviousDatesType => {
  // if we don't have both start/end dates we can't do any calculations (without both dates we don't call this function but TS will complain)
  if (!firstRange_startDate || !firstRange_endDate)
    return {
      previousStartDate: secondRange_startDate,
      previousEndDate: secondRange_endDate,
    }

  const difference = firstRange_endDate.diff(firstRange_startDate, 'days') + 1 // +1 because we don't want to include the start date in the comparison date range
  const weeksBack = Math.ceil(difference / 7)
  return {
    previousStartDate: moment(firstRange_startDate).subtract(
      weeksBack,
      'weeks'
    ),
    previousEndDate: moment(firstRange_endDate).subtract(weeksBack, 'weeks'),
  }
}

/**
 *    Note:
 *    - This is an exact comparison of days from the previous month.
 *    - It can only be used on any selection less than 30 days.
 **/
export const previousMonth = ({
  firstRange_startDate,
  firstRange_endDate,
  secondRange_startDate,
  secondRange_endDate,
}: SelectionState): PreviousDatesType => {
  // if we don't have both start/end dates we can't do any calculations (without both dates we don't call this function but TS will complain)
  if (!firstRange_startDate || !firstRange_endDate)
    return {
      previousStartDate: secondRange_startDate,
      previousEndDate: secondRange_endDate,
    }

  const numOfDays = firstRange_endDate.diff(firstRange_startDate, 'days') + 1 // +1 because we want to count the start day in the total days
  const daysInMonth = firstRange_startDate.daysInMonth()
  if (numOfDays > daysInMonth) {
    return {
      previousStartDate: secondRange_startDate,
      previousEndDate: secondRange_endDate,
    }
  }

  return {
    previousStartDate: moment(firstRange_startDate).subtract(1, 'months'),
    previousEndDate: moment(firstRange_endDate).subtract(1, 'months'),
  }
}

/**
 *    Note:
 *    - This will compare the same time period in the previous month (4 weeks prior) but match the days of the week
 *    - It can only be used on any selection less than 30 days.
 **/
export const previousMonthMatchDays = ({
  firstRange_startDate,
  firstRange_endDate,
  secondRange_startDate,
  secondRange_endDate,
}: SelectionState): PreviousDatesType => {
  // if we don't have both start/end dates we can't do any calculations (without both dates we don't call this function but TS will complain)
  if (!firstRange_startDate || !firstRange_endDate)
    return {
      previousStartDate: secondRange_startDate,
      previousEndDate: secondRange_endDate,
    }

  const numOfDays = firstRange_endDate.diff(firstRange_startDate, 'days') + 1 // +1 because we want to count the start day in the total days
  const daysInMonth = firstRange_startDate.daysInMonth()
  if (numOfDays > daysInMonth) {
    return {
      previousStartDate: secondRange_startDate,
      previousEndDate: secondRange_endDate,
    }
  }

  return {
    previousStartDate: moment(firstRange_startDate).subtract(4, 'weeks'),
    previousEndDate: moment(firstRange_endDate).subtract(4, 'weeks'),
  }
}

/**
 *    Note:
 *    - The comparison should always match the exact time frame starting on the same date the previous year.
 **/
export const previousYear = ({
  firstRange_startDate,
  firstRange_endDate,
  secondRange_startDate,
  secondRange_endDate,
}: SelectionState): PreviousDatesType => {
  // if we don't have both start/end dates we can't do any calculations (without both dates we don't call this function but TS will complain)
  if (!firstRange_startDate || !firstRange_endDate)
    return {
      previousStartDate: secondRange_startDate,
      previousEndDate: secondRange_endDate,
    }

  return {
    previousStartDate: moment(firstRange_startDate).subtract(1, 'years'),
    previousEndDate: moment(firstRange_endDate).subtract(1, 'years'),
  }
}

/**
 *    Note:
 *    - This will compare the same time period in the previous year (52 weeks prior) but match the days of the week
 **/
export const previousYearMatchDays = ({
  firstRange_startDate,
  firstRange_endDate,
  secondRange_startDate,
  secondRange_endDate,
}: SelectionState): PreviousDatesType => {
  // if we don't have both start/end dates we can't do any calculations (without both dates we don't call this function but TS will complain)
  if (!firstRange_startDate || !firstRange_endDate)
    return {
      previousStartDate: secondRange_startDate,
      previousEndDate: secondRange_endDate,
    }

  return {
    previousStartDate: moment(firstRange_startDate).subtract(52, 'weeks'),
    previousEndDate: moment(firstRange_endDate).subtract(52, 'weeks'),
  }
}

export const compareToOptions = [
  {
    id: 0,
    period: 'Custom Time Selection',
    getCompareToDates: customTimeSelection,
  },
  { id: 1, period: 'Previous Period', getCompareToDates: previousPeriod },
  {
    id: 2,
    period: 'Previous Period match days of the week',
    getCompareToDates: previousPeriodMatchDays,
  },
  {
    id: 3,
    period: 'Same Period Last Month',
    getCompareToDates: previousMonth,
  },
  {
    id: 4,
    period: 'Same Period Last Month match days of the week',
    getCompareToDates: previousMonthMatchDays,
  },
  { id: 5, period: 'Same Period Last Year', getCompareToDates: previousYear },
  {
    id: 6,
    period: 'Same Period Last Year match days of the week',
    getCompareToDates: previousYearMatchDays,
  },
]
