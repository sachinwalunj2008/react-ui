import moment from 'moment'
import { currencyString } from './HelperService'
import { abbreviateNumber } from '../module'

const GREEN_COLOR = 'var(--green)',
  RED_COLOR = 'var(--red)',
  PURPLE_COLOR = 'var(--purple)',
  LAVENDER_COLOR = 'var(--lavender)',
  transparent = 'var(--white)'

export const colors = [
  GREEN_COLOR,
  RED_COLOR,
  PURPLE_COLOR,
  LAVENDER_COLOR,
  transparent,
]

export const createMonthAgoData = (graphData, keyName, weeklyDataPoints) => {
  let oneMonthAgo,
    oneMonthAgoValue,
    aggregateValue = 0,
    monthDate = new Date(moment().subtract(1, 'month')),
    parsedMonth = Date.parse(monthDate)

  oneMonthAgo = parsedMonth / 10_000_000
  graphData.filter((item, i) => {
    let closeToMonthAgoCheck =
        Math.round((oneMonthAgo - item.date / 10000000).toFixed(1) / 10) * 10,
      day = item.date
    if (
      moment(day).format('MMM DD YYYY') ===
      moment(parsedMonth).format('MMM DD YYYY')
    ) {
      oneMonthAgo = day / 10_000_000
      if (Array.isArray(keyName)) {
        for (let j = 0; j < keyName.length; j++) {
          aggregateValue += item[keyName[j]]
        }
        oneMonthAgoValue = aggregateValue
      } else {
        oneMonthAgoValue = item[keyName]
      }
    } else if (
      !oneMonthAgoValue &&
      oneMonthAgo - item.date / 10_000_000 > 0 &&
      oneMonthAgo - item.date / 10_000_000 < 60
    ) {
      let daysFromLastDataPoint = closeToMonthAgoCheck.toString().slice(0, 1),
        nextNum,
        num,
        averageNum
      if (Array.isArray(keyName)) {
        let weeklyAggregate = 0,
          nextNumAggregate = 0
        for (let k = 0; k < keyName.length; k++) {
          weeklyAggregate += item[keyName[k]]
          nextNumAggregate += graphData[i + 1]
            ? graphData[i + 1][keyName[k]]
            : graphData[i][keyName[k]]
        }
        nextNum = nextNumAggregate
        num = (aggregateValue - nextNum) / 7
        averageNum = aggregateValue - num * (Number(daysFromLastDataPoint) + 1)
        oneMonthAgoValue = weeklyDataPoints
          ? weeklyAggregate +
            (Math.abs(weeklyAggregate - nextNum) / 7) *
              daysFromLastDataPoint *
              (weeklyAggregate < nextNum ? 1 : -1)
          : daysFromLastDataPoint === 0
          ? aggregateValue
          : Math.round(averageNum)
      } else {
        nextNum = graphData[i + 1]
          ? graphData[i + 1][keyName]
          : graphData[i][keyName]
        num = (item[keyName] - nextNum) / 7
        averageNum = item[keyName] - num * (Number(daysFromLastDataPoint) + 1)
        oneMonthAgoValue = weeklyDataPoints
          ? (item[keyName] + nextNum) / 2
          : daysFromLastDataPoint === 0
          ? item[keyName]
          : Math.round(averageNum)
      }
    }
    return item
  })
  if (
    (Array.isArray(keyName) &&
      keyName.some((k) => {
        return k.toLowerCase().includes('revenue')
      })) ||
    (!Array.isArray(keyName) &&
      (keyName.toLowerCase().includes('revenue') ||
        keyName.toLowerCase().includes('sales')))
  ) {
    oneMonthAgoValue = currencyString(oneMonthAgoValue)
  } else {
    oneMonthAgoValue = oneMonthAgoValue.toFixed(0)
  }
  return { date: oneMonthAgo, value: oneMonthAgoValue }
}

export const createDataKeyLegend = (obj, colorSet) => {
  let colorPalette = colorSet ? colorSet : colors
  if (obj.tooltip) {
    delete obj.tooltip
  }
  delete obj.date
  let length = Object.keys(obj).length
  let keyLegend = []
  for (var i = 0; i < length; i++) {
    keyLegend.push({
      key: Object.keys(obj)[i],
      stroke: colorPalette[i],
    })
  }
  return keyLegend
}

export const dateRangeIncludesTodayCheck = (endDate) => {
  return (
    moment(endDate).startOf('day').format('MM-DD-YYYY') ===
    moment().startOf('day').format('MM-DD-YYYY')
  )
}

export const createYAxisWidth = (dataMax, prefix, suffix) => {
  let max = dataMax ? abbreviateNumber(dataMax.toFixed(0)) : 0
  return (
    (max.toString().length +
      (prefix ? prefix.toString().length : 0) +
      (suffix ? suffix.toString().length : 0)) *
    3
  )
}

export const lineAnimationDelay = (length) => {
  if (length > 20) {
    return 800
  } else if (length > 4) {
    return 600
  }
}

export const lineAnimationDuration = (length) => {
  if (length > 20) {
    return 450
  } else if (length > 4) {
    return 700
  }
}

export const statColors = () => {
  return {
    success: GREEN_COLOR,
    error: RED_COLOR,
    standard: LAVENDER_COLOR,
  }
}

export const getHeight = (width) => {
  if (width > 768 && width < 1440) {
    return 160
  } else {
    return 200
  }
}
