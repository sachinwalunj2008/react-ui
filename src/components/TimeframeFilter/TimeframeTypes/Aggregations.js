import React, { useCallback, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { usePrevious, useToggle } from '../../../module'

import TimeframeButton from './TimeframeButton'
import { getValidAggregationsForCurrentTimeframe } from './CurrentTimeframe'
import { getValidAggregationsForHistoricalTimeframe } from './HistoricalTimeframe'
import { getValidAggregationsForQuarterlyTimeframe } from './QuarterlyTimeframe'
import styles from '../_timeframe-filter.module.scss'

export default function Aggregations({
  timeframe,
  callout,
  startDate,
  endDate,
  customAggregations,
  updateToValidFilterState,
}) {
  let validAggregations = useMemo(() => [], [])

  const location = useLocation()
  const prevLocation = usePrevious(location?.pathname),
    quarterlyAggregationsEnabled = useToggle('quarter_aggregations')

  const getValidAggregationOptions = useCallback(() => {
    // TODO: add the other timeframe types
    let aggregations = []
    if (timeframe.type === 'current') {
      aggregations = getValidAggregationsForCurrentTimeframe(
        timeframe.timeValue,
        customAggregations?.current
      )
    } else if (timeframe.type === 'historical') {
      aggregations = getValidAggregationsForHistoricalTimeframe({
        timeframe,
        startDate,
        endDate,
        customAggregations: customAggregations?.historical,
      })
    } else {
      // must be quarterly
      aggregations = getValidAggregationsForQuarterlyTimeframe(
        timeframe,
        customAggregations?.quarterly
      )
    }

    return aggregations
  }, [customAggregations, endDate, startDate, timeframe])

  const updateTimeframe = useCallback(
    (newAggregation) => {
      callout('UPDATE_AGGREGATION', { aggregation: newAggregation })
    },
    [callout]
  )

  // Reset the custom aggregation values in case of path change
  useEffect(() => {
    if (prevLocation !== location?.pathname) {
      let validAggregations = getValidAggregationOptions()
      const validAggregationBy = validAggregations.includes(
        timeframe.aggregation
      )
        ? timeframe.aggregation
        : validAggregations[0]
      updateTimeframe(validAggregationBy)
    }
  }, [
    location?.pathname,
    timeframe?.aggregation,
    getValidAggregationOptions,
    updateTimeframe,
    prevLocation,
  ])

  validAggregations = getValidAggregationOptions()

  /**
   * Below useEffect is used to check if the current aggregation is valid or not
   * If aggregation is not valid then it resets to its default available aggegation
   */
  useEffect(() => {
    if (
      quarterlyAggregationsEnabled &&
      !validAggregations.includes(timeframe?.aggregation)
    ) {
      updateToValidFilterState('UPDATE_AGGREGATION', {
        aggregation: validAggregations[0],
      })
    }
  }, [
    timeframe?.aggregation,
    updateToValidFilterState,
    validAggregations,
    quarterlyAggregationsEnabled,
  ])

  return (
    <div>
      <div className={styles.aggregationHeader}>View By</div>
      <div className={styles.aggregationDescription}>
        This will aggregate chart data by:
      </div>
      <div className={styles.timeframeFilter}>
        <TimeframeButton
          disabled={!validAggregations.includes('hour')}
          updateTimeframe={() => updateTimeframe('hour')}
          el={{ id: 1, display: 'Hour', timeValue: 'hour' }}
          timeframe={timeframe}
          timeframeKey='aggregation'
        />
        <TimeframeButton
          disabled={!validAggregations.includes('day')}
          updateTimeframe={() => updateTimeframe('day')}
          el={{ id: 2, display: 'Day', timeValue: 'day' }}
          timeframe={timeframe}
          timeframeKey='aggregation'
        />
        <TimeframeButton
          disabled={!validAggregations.includes('week')}
          updateTimeframe={() => updateTimeframe('week')}
          el={{ id: 3, display: 'Week', timeValue: 'week' }}
          timeframe={timeframe}
          timeframeKey='aggregation'
        />
        <TimeframeButton
          disabled={!validAggregations.includes('month')}
          updateTimeframe={() => updateTimeframe('month')}
          el={{ id: 4, display: 'Month', timeValue: 'month' }}
          timeframe={timeframe}
          timeframeKey='aggregation'
        />
        {quarterlyAggregationsEnabled && (
          <TimeframeButton
            disabled={!validAggregations.includes('qtr')}
            updateTimeframe={() => updateTimeframe('qtr')}
            el={{ id: 5, display: 'QTR', timeValue: 'quarter', QUARTER: true }}
            timeframe={timeframe}
            timeframeKey='aggregation'
          />
        )}
      </div>
    </div>
  )
}
