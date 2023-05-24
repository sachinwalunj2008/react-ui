import moment from 'moment'

export const historicalTimeframes = [
  {
    id: 1,
    display: '1D',
    value: 1,
    timeValue: 'day',
  },
  {
    id: 2,
    display: '1W',
    value: 1,
    timeValue: 'week',
  },
  {
    id: 3,
    display: '30D',
    value: 30,
    timeValue: 'day',
  },
  {
    id: 4,
    display: '3M',
    value: 3,
    timeValue: 'month',
  },
  {
    id: 5,
    display: '6M',
    value: 6,
    timeValue: 'month',
  },
  {
    id: 6,
    display: '1Y',
    value: 1,
    timeValue: 'year',
  },
]

export const initialTimeframe = {
  type: 'historical',
  display: '30D',
  value: 30,
  timeValue: 'day',
}

const getHistoricalDate = (timeframe, date) => {
  if (timeframe?.value === 'custom') {
    const dates =
        date === 'startDate' || date === 'endDate'
          ? timeframe?.display.split(' - ')
          : timeframe?.compareDisplay?.split(' - '), // Used compare display to pull comparison start date and end date
      startDate = dates[0],
      endDate = dates[1]

    if (date === 'startDate' || date === 'compareStartDate') {
      return moment(startDate).startOf('day').format()
    } else {
      const endOfDayDate = moment(endDate).endOf('day')
      const now = moment()
      return now.isBefore(endOfDayDate) ? now.format() : endOfDayDate.format()
    }
  } else if (timeframe?.value === 'All') {
    if (date === 'startDate') {
      return moment('2017-01-01').format()
    } else {
      return moment().endOf('day').format()
    }
  } else {
    if (date === 'startDate') {
      return moment()
        .subtract(timeframe?.value, timeframe.timeValue)
        .startOf('day')
        .format()
    } else {
      return moment().endOf('day').subtract(1, 'days').format()
    }
  }
}

const getCurrentDate = (timeframe, date) => {
  if (date === 'startDate') {
    return moment().startOf(timeframe.timeValue).format()
  } else {
    return moment().endOf(timeframe.timeValue).format() // because 'current' dates always are from a beginning to end time period, and the component updates with those values, then on init we also need to start with the "end" timeframe as well
  }
}

const getQuarterlyDate = (timeframe, date) => {
  let startDate, endDate
  if (timeframe.quarter) {
    startDate = moment(moment().year(timeframe.year))
      .quarter(timeframe.quarter)
      .startOf('quarter')

    endDate = moment(moment().year(timeframe.year))
      .quarter(timeframe.quarter)
      .endOf('quarter')
  } else {
    startDate = moment().year(timeframe.year).startOf('year')
    endDate = moment().year(timeframe.year).endOf('year')
  }

  if (date === 'startDate') {
    return startDate.format()
  } else {
    return endDate.format()
  }
}

export function getTimeframeDates(timeframe, date) {
  let newDate
  switch (timeframe.type) {
    case 'historical':
      newDate = getHistoricalDate(timeframe, date)
      break
    case 'current':
      newDate = getCurrentDate(timeframe, date)
      break
    case 'quarterly':
      newDate = getQuarterlyDate(timeframe, date)
      break
    default:
      break
  }
  return newDate
}

export function checkForCorrectTimeframe(timeframe) {
  let arr = [
    'display',
    'timeValue',
    'type',
    ...(timeframe?.type === 'historical' ? ['value'] : []),
  ] // type: 'current' and 'quarterly' timeframes don't use 'value', so exclude that key from the list
  return (
    timeframe &&
    arr.every((element) => Object.keys(timeframe).includes(element))
  )
}

// Function to switch to the next available timeframe option
// If currently selected timeframe option is disabled for visited page
export const getNextAvailableTimeframeOption = ({
  timeframes,
  type,
  disabledTimeframeOptions,
  year = undefined,
  callout,
  useTimeframeAggregations,
  customAggregations,
  getAggregation,
}) => {
  const validOption = timeframes.filter(
    (option) => !disabledTimeframeOptions?.includes(option.display)
  )[0]

  const validFormattedOption = {
    type: type,
    display:
      type === 'quarterly'
        ? `${year}${validOption?.quarter ? ` ${validOption?.display}` : ''}`
        : validOption?.display,
    ...(type === 'quarterly' ? { year: year?.toString() } : {}),
    ...(type === 'quarterly' ? { quarter: validOption?.quarter } : {}),
    timeValue: validOption?.timeValue,
    ...(type === 'historical' ? { value: validOption?.value } : {}),
  }

  validOption &&
    callout(
      'UPDATE_RANGE',
      getTimeframeDates(validFormattedOption, 'startDate'),
      getTimeframeDates(validFormattedOption, 'endDate'),
      {
        ...validFormattedOption,
        ...(useTimeframeAggregations
          ? {
              aggregation: getAggregation({
                ...(type === 'current'
                  ? { timeValue: validOption?.timeValue }
                  : { timeframe: validFormattedOption }),
                ...(type === 'historical'
                  ? {
                      startDate: getTimeframeDates(
                        validFormattedOption,
                        'startDate'
                      ),
                      endDate: getTimeframeDates(
                        validFormattedOption,
                        'endDate'
                      ),
                    }
                  : {}),
                customAggregations,
              }),
            }
          : {}),
      }
    )
}
