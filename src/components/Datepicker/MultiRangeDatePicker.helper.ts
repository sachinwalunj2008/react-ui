import type { Moment } from 'moment'
import type { SelectionState } from './ComparisonDatePicker'
import styles from './multirange_picker.module.scss'

export function backgroundClassNames(dayStatus: DayStatus): string {
  let finalClassNames = ''

  switch (dayStatus.rangeType) {
    /**
     * SET CLASSNAMES FOR BACKGROUND COLORS
     **/

    /**  current date is within FIRST DATE RANGE ONLY */
    case 'first':
      finalClassNames = styles.firstRange
      break

    /** current date is within SECOND DATE RANGE ONLY */
    case 'second':
      finalClassNames = styles.secondRange
      break

    /** current date is within DATE RANGES OVERLAP */
    case 'both':
      /** overlap date, date in both ranges but not a start or end date */
      if (dayStatus.startEndType === 'none') {
        finalClassNames = `${
          dayStatus.rangeThatStartsFirst === 'first'
            ? styles.bothRangesFirstBeforeSecond
            : styles.bothRangesSecondBeforeFirst
        }`
        /** overlap date, START date */
      } else if (dayStatus.startEndType.includes('start')) {
        // a start day has a full color on the left side, and half color on the right side
        finalClassNames = `${
          dayStatus.rangeThatStartsFirst === 'first'
            ? styles.bothRangesFirstStartDate
            : styles.bothRangesSecondStartDate
        }`
        /** overlap date, END date */
      } else if (dayStatus.startEndType.includes('end')) {
        // an end day has a half color on the left side, and a full color on the right side
        finalClassNames = `${
          dayStatus.rangeThatStartsFirst === 'first'
            ? styles.bothRangesFirstEndDate
            : styles.bothRangesSecondEndDate
        }`
        /** overlap date, BOTH START & END date */
      } else if (dayStatus.startEndType === 'multiple') {
        finalClassNames = `${
          dayStatus.rangeThatStartsFirst === 'first'
            ? styles.firstRangeToSecondRange
            : styles.secondRangeToFirstRange
        }`
      }
      break

    /** UNSELECTED DATES, dates not included in any date range selection */
    case 'none':
    default:
      break
  }

  // figure out of the background color needs to be flat so it doesn't show from underneath a circle (aka start/end date)
  if (
    dayStatus.startEndType.includes('start') &&
    dayStatus.rangeType !== 'both'
  ) {
    // don't have a left-half background color, since it's the start of a range
    finalClassNames = `${finalClassNames} ${styles.backgroundLeftNone}`
  } else if (
    dayStatus.startEndType.includes('end') &&
    dayStatus.rangeType !== 'both'
  ) {
    // don't have a left-half background color, since it's the start of a range
    finalClassNames = `${finalClassNames} ${styles.backgroundRightNone}`
    // don't have right or left-half background color, since range is a single day
  } else if (dayStatus.startEndType === 'same-day') {
    finalClassNames = `${finalClassNames} ${styles.backgroundLeftNone} ${styles.backgroundRightNone}`
  }

  return finalClassNames.trim()
}

export function foregroundClassNames(dayStatus: DayStatus): string {
  if (dayStatus.startEndType === 'none') return ''
  let finalClassNames = ''

  if (dayStatus.startEndType.includes('first')) {
    finalClassNames = styles.firstRangeStartEndDate
  } else if (dayStatus.startEndType.includes('second')) {
    finalClassNames = styles.secondRangeStartEndDate
  } else if (dayStatus.startEndType === 'same-day') {
    if (dayStatus.rangeType === 'first') {
      finalClassNames = styles.firstRangeStartEndDate
    } else {
      finalClassNames = styles.secondRangeStartEndDate
    }
  } else if (dayStatus.startEndType.includes('multiple')) {
    if (dayStatus.rangeThatStartsFirst === 'none') {
      finalClassNames = styles.firstRangeStartEndDate
    } else {
      finalClassNames =
        dayStatus.rangeThatStartsFirst === 'first'
          ? styles.bothRangesFirstEndSecondStartDate
          : styles.bothRangesSecondEndFirstStartDate
    }
  }

  finalClassNames += ' bold fc-white'

  return finalClassNames.trim()
}

type DayStatus = {
  /** Whether this day is included in the first range, second range, or both/none ranges */
  rangeType: 'none' | 'first' | 'second' | 'both'
  /** Whether this day is a start date, end date, or both/none. Also which range it belongs to */
  startEndType:
    | 'none'
    | 'first-start'
    | 'first-end'
    | 'second-start'
    | 'second-end'
    | 'same-day'
    | 'multiple'
  /** Information on which range starts before the other range; important to know for colors */
  rangeThatStartsFirst: 'first' | 'second' | 'none'
}
export function getDayStatus(
  day: Moment,
  selectionState: SelectionState
): DayStatus {
  const status: DayStatus = {
    rangeType: 'none',
    startEndType: 'none',
    rangeThatStartsFirst: 'none',
  }

  /***** EVALUATE rangeType LOGIC *****/
  // check if the day is in the first range
  if (
    day.isBetween(
      selectionState.firstRange_startDate,
      selectionState.firstRange_endDate,
      'days',
      '[]' // [] means inclusive of start and end dates
    )
  ) {
    // and check if the day is in the second range
    if (
      day.isBetween(
        selectionState.secondRange_startDate,
        selectionState.secondRange_endDate,
        'days',
        '[]'
      )
    ) {
      //  day is in both ranges
      status.rangeType = 'both'
    } else {
      // day is in the first range only
      status.rangeType = 'first'
    }
    // date not in the first range, check if the day is in the second range
  } else if (
    day.isBetween(
      selectionState.secondRange_startDate,
      selectionState.secondRange_endDate,
      'days',
      '[]'
    )
  ) {
    // day is in second range
    status.rangeType = 'second'
  } else {
    // day is not in any range
    status.rangeType = 'none'
  }
  /***** END rangeType LOGIC */

  /***** EVALUATE startEndType LOGIC *****/
  if (day.isSame(selectionState.firstRange_endDate, 'day')) {
    status.startEndType = 'first-end'
  }
  if (day.isSame(selectionState.secondRange_endDate, 'day')) {
    status.startEndType =
      status.startEndType === 'none' ? 'second-end' : 'multiple'
  }

  if (day.isSame(selectionState.secondRange_startDate, 'day')) {
    status.startEndType =
      status.startEndType === 'none'
        ? 'second-start'
        : status.startEndType === 'second-end'
        ? 'same-day'
        : 'multiple'
  }
  if (day.isSame(selectionState.firstRange_startDate, 'day')) {
    status.startEndType =
      status.startEndType === 'none'
        ? 'first-start'
        : status.startEndType === 'first-end'
        ? 'same-day'
        : 'multiple'
  }
  /***** END startEndType LOGIC ******/

  /***** EVALUATE rangeThatStartsFirst LOGIC */
  if (
    selectionState.firstRange_startDate &&
    selectionState.secondRange_startDate
  ) {
    if (
      selectionState.firstRange_startDate.isSameOrBefore(
        selectionState.secondRange_startDate,
        'day'
      )
    ) {
      status.rangeThatStartsFirst = 'first'
    } else {
      status.rangeThatStartsFirst = 'second'
    }
  }
  /***** END rangeThatStartsFirst LOGIC */

  return status
}
