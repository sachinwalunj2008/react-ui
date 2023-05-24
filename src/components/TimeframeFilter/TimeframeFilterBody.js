import React from 'react'
import PropTypes from 'prop-types'
import styles from './_timeframe-filter.module.scss'

const HistoricalTimeframe = React.lazy(() =>
  import(
    /* webpackChunkName: "historicalTimeframe" */ './TimeframeTypes/HistoricalTimeframe'
  ).then((mod) => ({ default: mod.HistoricalTimeframe }))
)
const CurrentTimeframe = React.lazy(() =>
  import(
    /* webpackChunkName: "currentTimeframe" */ './TimeframeTypes/CurrentTimeframe'
  ).then((mod) => ({ default: mod.CurrentTimeframe }))
)
const QuarterlyTimeframe = React.lazy(() =>
  import(
    /* webpackChunkName: "quarterlyTimeframe" */ './TimeframeTypes/QuarterlyTimeframe'
  ).then((mod) => ({ default: mod.QuarterlyTimeframe }))
)
const Aggregations = React.lazy(() =>
  import(
    /* webpackChunkName: "timeframeAggregations" */ './TimeframeTypes/Aggregations'
  )
)

// TODO: convert to .tsx
const TimeframeFilterBody = ({
  callout,
  historicalTimeframes,
  timeframe,
  currentTimeframe,
  quarterlyTimeframe,
  closeMenu,
  useTimeframeAggregations = false,
  customAggregations,
  startDate,
  endDate,
  disableTimeFrameFilter = false,
  hideCustomDateSearch = false,
  showHistoricTimeFrameDateRange = true,
  showHistoricTimeFrameDateRangeOnMobile = false, // for mobile
  comparisonDateRange,
  getComparisonDateRange,
  disabledTimeframeOptions = undefined,
  updateToValidFilterState = () => null,
}) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div
        className={`${styles.timeframeContainer} ${
          disableTimeFrameFilter ? styles.disableTimeframeColumn : ''
        }`}
        style={{
          justifyContent: useTimeframeAggregations ? 'space-between' : 'start',
        }}
      >
        <div>
          {currentTimeframe && (
            <>
              <div
                className={`${styles.timeframeSectionHeader} ${
                  timeframe.type === 'current' ? styles.active : ''
                }`}
                data-timeframe-section-header='timeframe-body'
              >
                Current
              </div>
              <CurrentTimeframe
                callout={callout}
                timeframe={timeframe}
                closeMenu={closeMenu}
                useTimeframeAggregations={useTimeframeAggregations}
                customAggregations={customAggregations?.current}
                disabledTimeframeOptions={disabledTimeframeOptions?.current}
              />
            </>
          )}
          {(currentTimeframe || quarterlyTimeframe) && (
            <div
              className={`${styles.timeframeSectionHeader} ${
                timeframe.type === 'historical' ? styles.active : ''
              }`}
              data-timeframe-section-header='timeframe-body'
            >
              Historical
            </div>
          )}
          <HistoricalTimeframe
            callout={callout}
            timeframes={historicalTimeframes}
            timeframe={timeframe}
            closeMenu={closeMenu}
            useTimeframeAggregations={useTimeframeAggregations}
            hideCustomDateSearch={hideCustomDateSearch}
            showHistoricTimeFrameDateRange={showHistoricTimeFrameDateRange}
            comparisonDateRange={comparisonDateRange}
            getComparisonDateRange={getComparisonDateRange}
            customAggregations={customAggregations?.historical}
            disabledTimeframeOptions={disabledTimeframeOptions?.historical}
            showHistoricTimeFrameDateRangeOnMobile={
              showHistoricTimeFrameDateRangeOnMobile
            }
          />
          {quarterlyTimeframe && (
            <>
              <div
                className={`${styles.timeframeSectionHeader} ${
                  timeframe.type === 'quarterly' ? styles.active : ''
                }`}
                data-timeframe-section-header='timeframe-body'
              >
                Quarterly / Yearly
              </div>
              <QuarterlyTimeframe
                callout={callout}
                timeframe={timeframe}
                closeMenu={closeMenu}
                useTimeframeAggregations={useTimeframeAggregations}
                customAggregations={customAggregations?.quarterly}
                disabledTimeframeOptions={disabledTimeframeOptions?.quarterly}
              />
            </>
          )}

          {showHistoricTimeFrameDateRangeOnMobile && (
            <>
              <div
                className={`${styles.timeframeSectionHeader} ${
                  timeframe.type === 'historical' ? styles.active : ''
                }`}
                data-timeframe-section-header='timeframe-body-historical'
              >
                Custom Date
              </div>

              <HistoricalTimeframe
                callout={callout}
                timeframes={[]}
                timeframe={timeframe}
                closeMenu={closeMenu}
                useTimeframeAggregations={useTimeframeAggregations}
                hideCustomDateSearch={hideCustomDateSearch}
                showHistoricTimeFrameDateRange={true}
                comparisonDateRange={comparisonDateRange}
                getComparisonDateRange={getComparisonDateRange}
                customAggregations={customAggregations?.historical}
                disabledTimeframeOptions={disabledTimeframeOptions?.historical}
                showHistoricTimeFrameDateRangeOnMobile={
                  showHistoricTimeFrameDateRangeOnMobile
                }
              />
            </>
          )}
        </div>
        {useTimeframeAggregations && (
          <Aggregations
            timeframe={timeframe}
            callout={callout}
            startDate={startDate}
            endDate={endDate}
            customAggregations={customAggregations}
            updateToValidFilterState={updateToValidFilterState}
          />
        )}
      </div>
    </React.Suspense>
  )
}

export default TimeframeFilterBody

TimeframeFilterBody.propTypes = {
  callout: PropTypes.func.isRequired,
  timeframe: PropTypes.object.isRequired,
  historicalTimeframes: PropTypes.array,
  currentTimeframe: PropTypes.bool,
  quarterlyTimeframe: PropTypes.bool,
  closeMenu: PropTypes.func,
  disableTimeFrameFilter: PropTypes.bool,
}
