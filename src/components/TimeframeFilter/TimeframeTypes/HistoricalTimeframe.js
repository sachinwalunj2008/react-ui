import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ComparisonDatePickerPopup } from '../../../module'
import TimeframeButton from './TimeframeButton'
import { getNextAvailableTimeframeOption } from '../../../services/TimeframeService'
import styles from '../_timeframe-filter.module.scss'

export const HistoricalTimeframe = ({
  callout,
  timeframes,
  closeMenu,
  timeframe,
  useTimeframeAggregations = false,
  hideCustomDateSearch = false,
  showHistoricTimeFrameDateRange = true,
  comparisonDateRange,
  getComparisonDateRange,
  customAggregations,
  disabledTimeframeOptions,
  showHistoricTimeFrameDateRangeOnMobile,
}) => {
  const [state, setState] = useState({
    startDate: null,
    endDate: null,
    firstRange_startDate:
      moment(comparisonDateRange?.firstRange_startDate) || null,
    firstRange_endDate: moment(comparisonDateRange?.firstRange_endDate) || null,
    secondRange_startDate:
      (comparisonDateRange?.secondRange_startDate &&
        moment(comparisonDateRange?.secondRange_startDate)) ||
      null,
    secondRange_endDate:
      (comparisonDateRange?.secondRange_endDate &&
        moment(comparisonDateRange?.secondRange_endDate)) ||
      null,
  })

  useEffect(() => {
    // If currently selected timeframe option is disabled for visited page
    // then switch to next available timeframe option.
    if (
      disabledTimeframeOptions?.includes(timeframe.display) ||
      (timeframe.value === 'custom' &&
        !(
          showHistoricTimeFrameDateRangeOnMobile ||
          showHistoricTimeFrameDateRange
        ))
    ) {
      getNextAvailableTimeframeOption({
        timeframes,
        type: timeframe.type,
        disabledTimeframeOptions,
        callout,
        useTimeframeAggregations,
        customAggregations,
        getAggregation,
      })
    }
  }, [
    disabledTimeframeOptions,
    callout,
    customAggregations,
    timeframe.type,
    timeframe.display,
    useTimeframeAggregations,
    timeframes,
    showHistoricTimeFrameDateRange,
    timeframe.value,
    showHistoricTimeFrameDateRangeOnMobile,
  ])

  const {
    firstRange_startDate,
    firstRange_endDate,
    secondRange_startDate,
    secondRange_endDate,
  } = state

  const updateTimeframe = (e) => {
    let startDate, endDate
    if (e.custom) {
      startDate = moment(e.custom)
    } else {
      startDate = moment().subtract(e.value, e.timeValue).startOf('day')
    }
    endDate = moment().endOf('day').subtract(1, 'days')
    setState((prevState) => ({
      ...prevState,
      startDate,
      endDate,
    }))
    dateRangeUpdate(startDate, endDate, e.display, e.value, e.timeValue)
    closeMenu && closeMenu()
  }

  const getNewTimeframe = (startDate, endDate, display, value, timeValue) => {
    const newTimeframe = {
      type: 'historical',
      display: display
        ? display
        : `${startDate.format('L')} - ${endDate.format('L')}`,
      value: value ? value : 'custom',
      timeValue: timeValue ? timeValue : 'custom',
    }

    if (useTimeframeAggregations) {
      newTimeframe.aggregation = getAggregation({
        timeframe: newTimeframe,
        startDate,
        endDate,
        customAggregations,
      })
    }
    return newTimeframe
  }

  const comparisonDateRangeUpdate = (dateRangeData) => {
    // NOTE: comparisonDateRanges will only contain the dates from the dateRangeData
    const comparisonDateRanges = {
        firstRange_startDate: dateRangeData.firstRange_startDate,
        // NOTE: if a startDate is selected, but no endDate, we will set the endDate to the startDate; this is to ensure that theDateRange is always valid
        firstRange_endDate: dateRangeData.firstRange_endDate
          ? dateRangeData.firstRange_endDate
          : dateRangeData.firstRange_startDate,
        secondRange_startDate: dateRangeData.secondRange_startDate,
        secondRange_endDate: dateRangeData.secondRange_endDate
          ? dateRangeData.secondRange_endDate
          : dateRangeData.secondRange_startDate,
      },
      { firstRange_startDate: startDate, firstRange_endDate: endDate } =
        comparisonDateRanges

    setState((prevState) => ({
      ...prevState,
      startDate,
      endDate,
      ...comparisonDateRanges,
    }))

    // NOTE: if no startDate exists then there are not dates to compare and the filter should reset the filter dates to defaults
    if (!startDate) return resetDate()

    callout(
      'UPDATE_RANGE',
      startDate,
      endDate,
      getNewTimeframe(startDate, endDate),
      comparisonDateRanges
    )
  }

  const dateRangeUpdate = (startDate, endDate, display, value, timeValue) => {
    setState((prevState) => ({
      ...prevState,
      startDate,
      endDate,
    }))

    callout(
      'UPDATE_RANGE',
      startDate,
      endDate,
      getNewTimeframe(startDate, endDate, display, value, timeValue)
    )
  }

  const resetDate = () => {
    setState((prevState) => ({
      ...prevState,
      startDate: null,
      endDate: null,
      firstRange_startDate: null,
      firstRange_endDate: null,
      secondRange_startDate: null,
      secondRange_endDate: null,
    }))
    callout('RESET')
  }

  useEffect(() => {
    if (timeframe.value === 'custom') {
      let startDate, endDate, dates
      dates = timeframe.display.split(' - ')
      startDate = dates[0]
      endDate = dates[1]
      setState((prevState) => ({
        ...prevState,
        startDate,
        endDate,
      }))
    }
  }, [timeframe.display, timeframe.value])

  useEffect(() => {
    if (comparisonDateRange) {
      /** Keep individual comparison dates in sync, especially when the global filter is reset */
      const {
        firstRange_endDate,
        firstRange_startDate,
        secondRange_endDate,
        secondRange_startDate,
      } = comparisonDateRange
      setState((prevState) => ({
        ...prevState,
        firstRange_startDate: firstRange_startDate
          ? moment(firstRange_startDate)
          : null,
        firstRange_endDate: firstRange_endDate
          ? moment(firstRange_endDate)
          : null,
        secondRange_startDate: secondRange_startDate
          ? moment(secondRange_startDate)
          : null,
        secondRange_endDate: secondRange_endDate
          ? moment(secondRange_endDate)
          : null,
      }))
    }
  }, [comparisonDateRange])

  return (
    <div className={`${styles.timeframeFilter} ${styles.customDateIconStyle}`}>
      {timeframes.map((t) => (
        <TimeframeButton
          el={t}
          disabled={
            (disabledTimeframeOptions?.includes(t.display) || t.disabled) ??
            false
          }
          updateTimeframe={updateTimeframe}
          timeframe={timeframe}
          key={t.id}
        />
      ))}
      {showHistoricTimeFrameDateRange && (
        <>
          <ComparisonDatePickerPopup
            showComparisonRange={getComparisonDateRange}
            onApply={(selectionState) =>
              comparisonDateRangeUpdate(selectionState)
            }
            selectedCustomDateRange={
              timeframe.type === 'historical' && timeframe.value === 'custom'
            }
            initial_firstRange_startDate={firstRange_startDate}
            initial_firstRange_endDate={firstRange_endDate}
            initial_secondRange_startDate={secondRange_startDate}
            initial_secondRange_endDate={secondRange_endDate}
          />
        </>
      )}
    </div>
  )
}

function getAggregation({ timeframe, ...rest }) {
  const validAggregations = getValidAggregationsForHistoricalTimeframe({
    timeframe,
    ...rest,
  })

  return validAggregations?.length ? validAggregations[0] : ''
}

export function getValidAggregationsForHistoricalTimeframe({
  timeframe,
  startDate,
  endDate,
  customAggregations,
}) {
  // NOTE: The first item in the array will be the default for each timeValue
  const { timeValue, value } = timeframe
  if (timeValue === 'day') {
    if (value === 1)
      return customAggregations ? customAggregations['1D'] : ['hour']
    return customAggregations ? customAggregations['30D'] : ['day', 'week']
  }
  if (timeValue === 'week')
    return customAggregations ? customAggregations['1W'] : ['day']
  if (timeValue === 'month') {
    if (value === 3 && customAggregations) return customAggregations['3M']
    if (value === 6 && customAggregations) return customAggregations['6M']
    return ['week', 'day', 'month']
  }
  if (timeValue === 'year')
    return customAggregations
      ? customAggregations['1Y']
      : ['month', 'week', 'day']

  if (timeValue === 'custom') {
    if (!moment.isMoment(startDate)) {
      startDate = moment(startDate)
    }
    if (!moment.isMoment(endDate)) {
      endDate = moment(endDate)
    }

    const dayDifference = endDate.diff(startDate, 'days')

    if (customAggregations?.custom) {
      for (const obj of customAggregations?.custom) {
        if (obj.maxDayDifference) {
          if (
            dayDifference >= (obj.minDayDifference ?? 0) && // Updated condition to '>=' if same day is selected as start date and end date
            dayDifference < obj.maxDayDifference
          ) {
            return obj.aggregations
          }
        } else if (
          dayDifference > (obj.minDayDifference && obj.minDayDifference)
        ) {
          return obj.aggregations
        }
      }
    }

    if (dayDifference < 2) return ['hour']
    if (dayDifference >= 2 && dayDifference < 60) return ['day', 'week']
    if (dayDifference >= 60 && dayDifference < 365)
      return ['month', 'week', 'day']
    if (dayDifference >= 365) return ['month', 'week', 'day']
  }

  return []
}

HistoricalTimeframe.propTypes = {
  callout: PropTypes.func.isRequired,
  timeframes: PropTypes.array.isRequired,
  timeframe: PropTypes.object.isRequired,
  closeMenu: PropTypes.func,
}
