import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TimeframeButton from './TimeframeButton'
import moment from 'moment'
import { Select } from '../../../module'
import { getNextAvailableTimeframeOption } from '../../../services/TimeframeService'
import styles from '../_timeframe-filter.module.scss'

const timeframes = [
  {
    id: 1,
    display: '1Y',
    timeValue: 'year',
  },
  {
    id: 2,
    display: 'Q1',
    quarter: 1,
    timeValue: 'quarter',
  },
  {
    id: 3,
    display: 'Q2',
    quarter: 2,
    timeValue: 'quarter',
  },
  {
    id: 4,
    display: 'Q3',
    quarter: 3,
    timeValue: 'quarter',
  },
  {
    id: 5,
    display: 'Q4',
    quarter: 4,
    timeValue: 'quarter',
  },
]

const currentYear = new Date().getFullYear()
let years = []
for (let i = currentYear; i >= 2013; i--) {
  years.push({ id: `year-${i}`, value: i.toString() })
}

export const QuarterlyTimeframe = ({
  callout,
  closeMenu,
  timeframe,
  useTimeframeAggregations = false,
  customAggregations,
  disabledTimeframeOptions,
}) => {
  const defaultYear = timeframe.year ?? currentYear.toString()

  const [year, setYear] = useState({
    value: defaultYear,
  })

  useEffect(() => {
    // This is to display current year on Reset global filter
    setYear({ value: defaultYear })
  }, [defaultYear])

  useEffect(() => {
    // If currently selected timeframe option is disabled for visited page
    // then switch to next available timeframe option.
    if (
      disabledTimeframeOptions?.includes(
        timeframe.quarter ? timeframe?.display?.split(' ')[1] : '1Y'
      )
    ) {
      getNextAvailableTimeframeOption({
        timeframes,
        type: timeframe.type,
        disabledTimeframeOptions,
        year: year.value,
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
    timeframe.quarter,
    useTimeframeAggregations,
    year.value,
  ])

  const updateTimeframe = (e) => {
    let startDate, endDate
    if (e.quarter) {
      startDate = moment(moment().year(year.value))
        .quarter(e.quarter)
        .startOf('quarter')

      endDate = moment(moment().year(year.value))
        .quarter(e.quarter)
        .endOf('quarter')
    } else {
      startDate = moment().year(year.value).startOf('year')
      endDate = moment().year(year.value).endOf('year')
    }

    const newTimeframe = {
      type: 'quarterly',
      display: `${year.value}${e.quarter ? ` ${e.display}` : ''}`,
      year: year.value.toString(),
      quarter: e.quarter,
      timeValue: e.timeValue,
    }

    if (useTimeframeAggregations) {
      newTimeframe.aggregation = getAggregation(
        newTimeframe,
        customAggregations
      )
    }

    callout('UPDATE_RANGE', startDate, endDate, newTimeframe)
    closeMenu && closeMenu()
  }

  const updateYear = (_, y) => {
    if (y) {
      setYear(y)
      let startDate, endDate
      startDate = moment().year(y.value).startOf('year')
      endDate = moment().year(y.value).endOf('year')

      const newTimeframe = {
        type: 'quarterly',
        display: y.value.toString(),
        year: y.value.toString(),
        timeValue: 'year',
      }

      if (useTimeframeAggregations) {
        newTimeframe.aggregation = getAggregation(
          newTimeframe,
          customAggregations
        )
      }

      callout('UPDATE_RANGE', startDate, endDate, newTimeframe)
      closeMenu && closeMenu()
    }
  }

  return (
    <div className={styles.timeframeFilter}>
      <Select
        name='year'
        selectedItem={year}
        position={'right'}
        options={years}
        optionKeyName='value'
        stateName={'year'}
        customClass={
          disabledTimeframeOptions?.includes('1Y') ||
          disabledTimeframeOptions?.includes('Year')
            ? `${styles.filterButton} ${styles.disabled}`
            : ''
        }
        onChange={updateYear}
        disabled={
          (disabledTimeframeOptions?.includes('1Y') ||
            disabledTimeframeOptions?.includes('Year')) ??
          false
        }
      />
      {timeframes.map((t) => {
        let disabled =
          (disabledTimeframeOptions?.includes(t.display) || t.disabled) ?? false
        if (
          t.quarter &&
          moment(moment().year(year.value))
            .quarter(t.quarter)
            .startOf('quarter')
            .isAfter(new Date())
        ) {
          disabled = true
        }
        return (
          <TimeframeButton
            el={t}
            updateTimeframe={updateTimeframe}
            timeframe={timeframe}
            disabled={disabled}
            key={t.id}
            customDisplay={`${year.value}${t.quarter ? ` ${t.display}` : ''}`}
          />
        )
      })}
    </div>
  )
}

function getAggregation(timeframe, customAggregations) {
  const validAggregations = getValidAggregationsForQuarterlyTimeframe(
    timeframe,
    customAggregations
  )
  return validAggregations[0]
}

export function getValidAggregationsForQuarterlyTimeframe(
  timeframe,
  customAggregations
) {
  // NOTE: The first item in the array will be the default for each timeValue
  if (timeframe.timeValue === 'quarter') {
    return customAggregations
      ? customAggregations.quarter
      : ['month', 'week', 'day']
  }

  return customAggregations ? customAggregations.year : ['month', 'week', 'day']
}

QuarterlyTimeframe.propTypes = {
  callout: PropTypes.func.isRequired,
  timeframe: PropTypes.object.isRequired,
  closeMenu: PropTypes.func,
}
