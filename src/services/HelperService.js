import { capitalize, notEmpty } from '../module'

const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE':
        return {
          ...state,
          ...action.payload,
        }
      default:
        return state
    }
  },
  inputHandler = (
    dispatcher,
    name,
    value,
    localStorageName,
    type = 'UPDATE'
  ) => {
    if (value !== null && value !== undefined) {
      if (name === 'sortBy' && localStorageName) {
        localStorage.setItem(localStorageName, JSON.stringify(value))
      }
      dispatcher({
        type: type,
        payload: {
          [name]: value,
        },
      })
    }
  },
  /** @deprecated - This function is not useful anymore. Currently, only old pages in Predict use this function. Those instances will need to be removed. */
  percentageString = (percent, decimalScale, csvString) => {
    let round = Math.floor(percent * 100) !== 99
    if (percent * 100 >= 1 || percent * 100 === 0) {
      return decimalScale && !round
        ? `${percent * 100}%`
        : `${Math.round(percent * 100)}%`
    } else {
      if (csvString) {
        return `${(percent * 100).toFixed(2)}%`
      } else {
        return '\x3c1%'
      }
    }
  },
  /** @deprecated - This function is not helpful and is misleading as it does not have any currency logic associated with it. It would be more helpful to have this function along with the ability to format the value with currency code and symbol. */
  currencyFormat = (value, toFixed) => {
    return Number(value)
      ?.toFixed(!isNaN(toFixed) ? toFixed : 2)
      ?.replace(/\d(?=(?:\d{3})+(?!\d))/g, '$&,')
  },
  /** @deprecated - This function is only helpful for US currency, but we handle many currencies. We plan to update `currencyFormat` to handle currency values better. */
  currencyString = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  },
  aggregateDatapoints = (data, propName) => {
    function getSum(total, num) {
      return total + num
    }
    if (data?.length > 0) {
      return data
        ?.map((r) => (propName ? Number(r[propName]) : Number(r)))
        ?.reduce(getSum, 0)
    } else {
      return null
    }
  },
  replaceSymbol = (text, joinOption, splitSymbol, keepCasing) => {
    let nameFix = text?.split(splitSymbol || '_')
    if (!keepCasing) {
      nameFix = nameFix?.map((e) => {
        e = capitalize(e)
        return e
      })
    }
    return nameFix?.join(joinOption || ' ')
  },
  createPageName = (page) => {
    let split = page?.split('/'),
      result = split?.[1]?.slice(0)
    return result?.charAt(0)?.toUpperCase() + result?.slice(1)
  },
  propertyToSort = (property, bool) => {
    if (property[0] === '-') {
      property = property.substr(1)
    }
    return function (a, b) {
      if (a[property] === '—') {
        a[property] = null
      }
      let value1, value2
      if (isNaN(a[property])) {
        value1 = a[property]?.toString()?.toLowerCase()
        value2 = b[property]?.toString()?.toLowerCase()
      } else {
        value1 = Number(a[property])
        value2 = Number(b[property])
      }

      if (a[property] === b[property]) {
        return 0
      } else if (a[property] === null) {
        return 1
      } else if (b[property] === null) {
        return -1
      } else if (bool) {
        return value1 < value2 ? 1 : -1
      } else if (!bool) {
        return value1 < value2 ? -1 : 1
      }
    }
  },
  sortFilter = (array, prop, bool) => {
    let filteredState = array.sort(propertyToSort(prop, bool))
    return filteredState
  },
  gridPropertyToSort = (property, bool) => {
    return function (a, b) {
      let index
      for (let i = 0, len = a.length; i < len; i++) {
        if (a[i].hasOwnProperty(property)) {
          index = i
          break
        }
      }
      let value1, value2
      if (isNaN(a[index][property])) {
        value1 = a[index][property]?.toString()?.toLowerCase()
        value2 = b[index][property]?.toString()?.toLowerCase()
      } else {
        value1 = Number(a[index][property])
        value2 = Number(b[index][property])
      }

      if (a[index][property] === b[index][property]) {
        return 0
      } else if (a[index][property] === null) {
        return 1
      } else if (b[index][property] === null) {
        return -1
      } else if (bool) {
        return value1 < value2 ? 1 : -1
      } else if (!bool) {
        return value1 < value2 ? -1 : 1
      }
    }
  },
  gridSortFilter = (array, prop, bool) => {
    let filteredState = array.sort(
      gridPropertyToSort(prop?.replace(/\s/g, ''), bool)
    )
    return filteredState
  },
  sortNestedObj = (arr, prop, bool) => {
    prop = prop?.split('.')
    var len = prop.length

    arr.sort(function (a, b) {
      var i = 0

      while (i < len) {
        if (isNaN(a[prop[i]])) {
          a = a[prop[i]] ? a[prop[i]]?.toString()?.toLowerCase() : null
          b = b[prop[i]] ? b[prop[i]]?.toString()?.toLowerCase() : null
        } else {
          a = a[prop[i]] ? Number(a[prop[i]]) : null
          b = b[prop[i]] ? Number(b[prop[i]]) : null
        }
        i++
      }
      if (a === b) {
        return 0
      } else if (a === null) {
        return 1
      } else if (b === null) {
        return -1
      } else if (bool) {
        return a < b ? 1 : -1
      } else if (!bool) {
        return a < b ? -1 : 1
      }
      return false
    })
    return arr
  },
  getActiveTab = (tabsArr, path) => {
    let id = 0
    for (let i = 0; i < tabsArr.length; i++) {
      if (path?.includes(tabsArr[i].route)) {
        id = tabsArr[i].id
      }
    }
    return id
  },
  errorCheck = (errorCode, callback, value = '') => {
    switch (errorCode) {
      case 503:
        callback(value ? value : 'appdown')
        break
      case 500:
      case 502:
      case 504:
        callback(value ? value : 'timeout')
        break
      case 404:
        callback(value ? value : 'notfound')
        break
      default:
        callback(value ? value : 'appdown')
        break
    }
  },
  formValidation = (formObj, exclude) => {
    return !Object.keys(formObj)?.every((key) => {
      if (exclude?.includes(key)) {
        return true
      } else if (typeof formObj[key] === 'object') {
        return formObj[key]?.id !== -1
      } else {
        return notEmpty(formObj[key])
      }
    })
  },
  stopEvents = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  },
  dateFormatString = 'MMM DD, YYYY @ hh:mm A',
  formatDimensions = (length, width, height, dimension) => {
    let unit = ''
    switch (dimension) {
      case 'in':
        unit = '"'
        break
      default:
        unit = dimension
    }
    return `${Number(length)}${unit} x ${Number(width)}${unit} x ${Number(
      height
    )}${unit}`
  },
  formatWeight = (weight, dimension) => {
    let unit = ''
    switch (dimension) {
      case 'lb':
        unit = 'lbs'
        break
      default:
        unit = dimension
    }
    return `${Number(weight)} ${unit}`
  },
  reduceAndOrAverage = (arr, prop, totalToDivideBy, extras) => {
    let {
      round,
      floor,
      prefix,
      suffix,
      percentage,
      thousandSeparator,
      toFixed,
    } = extras ? extras : {}
    let empty_values = 0
    let total =
      arr?.reduce((sum, el) => {
        let check = prop ? el[prop] : prop
        if (check === null || check === '') {
          empty_values++
        }
        return sum + (check !== '' ? check : null) * (percentage ? 100 : 1)
      }, 0) / (totalToDivideBy ? totalToDivideBy - empty_values : 1)
    if (round) {
      total = Math.round(total)
    }
    if (floor) {
      total = Math.floor(total)
    }
    if (thousandSeparator) {
      total = total?.toLocaleString()
    }
    if (toFixed !== null && toFixed !== undefined) {
      total = Number(total)?.toFixed(toFixed)
    }
    return `${prefix || ''}${total}${suffix || ''}`
  },
  chunk = (array, size) => {
    const chunked_arr = []
    let copied = [...array]
    const numOfChild = Math.ceil(copied.length / size)
    // Round up to the nearest integer
    for (let i = 0; i < numOfChild; i++) {
      chunked_arr.push(copied.splice(0, size))
    }
    return chunked_arr
  }

export {
  reducer,
  inputHandler,
  percentageString,
  currencyFormat,
  currencyString,
  aggregateDatapoints,
  replaceSymbol,
  createPageName,
  propertyToSort,
  sortFilter,
  gridPropertyToSort,
  gridSortFilter,
  sortNestedObj,
  getActiveTab,
  errorCheck,
  formValidation,
  stopEvents,
  dateFormatString,
  formatDimensions,
  formatWeight,
  reduceAndOrAverage,
  chunk,
}
