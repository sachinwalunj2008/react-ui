import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import TimeframeButton from './TimeframeButton'
import moment from 'moment'
import { getNextAvailableTimeframeOption } from '../../../services/TimeframeService'
import styles from '../_timeframe-filter.module.scss'

const timeframes = [
  {
    id: 1,
    display: 'Day',
    timeValue: 'day',
  },
  {
    id: 2,
    display: 'Week',
    timeValue: 'week',
  },
  {
    id: 3,
    display: 'Month',
    timeValue: 'month',
  },
  {
    id: 4,
    display: 'Year',
    timeValue: 'year',
  },
]

export const CurrentTimeframe = ({
  callout,
  closeMenu,
  timeframe,
  useTimeframeAggregations = false,
  customAggregations,
  disabledTimeframeOptions,
}) => {
  useEffect(() => {
    // If currently selected timeframe option is disabled for visited page
    // then switch to next available timeframe option.
    if (disabledTimeframeOptions?.includes(timeframe.display)) {
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
    timeframe.display,
    useTimeframeAggregations,
    timeframe.type,
  ])

  return (
    <div className={`${styles.timeframeFilter} ${styles.current}`}>
      {timeframes.map((t) => (
        <TimeframeButton
          el={t}
          key={t.id}
          disabled={
            (disabledTimeframeOptions?.includes(t.display) || t.disabled) ??
            false
          }
          updateTimeframe={() => {
            callout(
              'UPDATE_RANGE',
              moment().startOf(t.timeValue),
              moment().endOf(t.timeValue),
              {
                type: 'current',
                display: t.display,
                timeValue: t.timeValue,
                ...(useTimeframeAggregations
                  ? {
                      aggregation: getAggregation({
                        timeValue: t.timeValue,
                        customAggregations,
                      }),
                    }
                  : {}),
              }
            )
            closeMenu && closeMenu()
          }}
          timeframe={timeframe}
        />
      ))}
    </div>
  )
}

function getAggregation({ timeValue, customAggregations }) {
  const validAggregations = getValidAggregationsForCurrentTimeframe(
    timeValue,
    customAggregations
  )
  return validAggregations[0]
}

export function getValidAggregationsForCurrentTimeframe(
  timeValue,
  customAggregations
) {
  // NOTE: The first item in the array will be the default for each timeValue
  switch (timeValue) {
    case 'day':
      return customAggregations ? customAggregations.day : ['hour']

    case 'week':
      return customAggregations ? customAggregations.week : ['day']

    case 'month':
      return customAggregations ? customAggregations.month : ['day', 'week']

    case 'year':
      return customAggregations
        ? customAggregations.year
        : ['month', 'week', 'day']

    default:
      throw new Error('invalid display value passed')
  }
}

CurrentTimeframe.propTypes = {
  callout: PropTypes.func.isRequired,
  timeframe: PropTypes.object.isRequired,
  closeMenu: PropTypes.func,
}
