import isEqual from 'lodash.isequal'
import moment from 'moment'

const cleanUpValues = (filters) => {
    if (!filters) {
      return
    }
    // USED TO PARSE VALUES FOR URL PARAMS
    let filterValues = {}
    for (let key in filters) {
      if (
        key === 'dates' ||
        filters[key]?.start_date ||
        filters[key]?.end_date
      ) {
        //USED FOR TIMEFRAME DATES
        if (filters[key].startDate)
          filterValues.start_date = { value: filters[key].startDate }
        if (filters[key].endDate)
          filterValues.end_date = { value: filters[key].endDate }

        // USED FOR DATE RANGES INSIDE FILTER MENU
        if (filters[key].start_date)
          filterValues[key !== 'dates' ? `${key}_start_date` : 'start_date'] = {
            value: filters[key].start_date,
          }
        if (filters[key].end_date)
          filterValues[key !== 'dates' ? `${key}_end_date` : 'end_date'] = {
            value: filters[key].end_date,
          }
      } else if (key === 'include' || key === 'exclude') {
        filterValues[key] = { value: filters[key].defaultValue }
      } else if (filters[key].id > 0) {
        if (key === 'fulfillment') {
          filterValues[filters[key].value] = { value: true }
        } else if (key === 'warehouse_status') {
          filterValues[key] = { value: filters[key].state }
        } else if (key === 'purchase_order_states') {
          filterValues[key] = { value: filters[key].state }
        } else {
          filterValues[key] = filters[key]
        }
      } else if (typeof filters[key] === 'string' && filters[key] !== '') {
        filterValues[key] = filters[key]
      }
    }
    if (Object.keys(filterValues).length === 0) {
      filterValues = null
    }
    return filterValues
  },
  compareArrays = (first, second) => {
    return (
      first?.every((e) => second.includes(e)) &&
      second?.every((e) => first.includes(e))
    )
  },
  createFilterCount = (filter, initialFilter, customValue) => {
    let count = 0
    if (filter && initialFilter) {
      for (const key in filter) {
        let filterValue = filter[key],
          initialFilterValue = initialFilter[key]
        if (customValue) {
          filterValue = filter[key][customValue]
          initialFilterValue = initialFilter[key][customValue]
        }
        if (
          Array.isArray(filterValue) &&
          !compareArrays(initialFilterValue, filterValue)
        ) {
          count++
        } else if (
          typeof filterValue === 'object' &&
          !Array.isArray(filterValue) &&
          !isEqual(initialFilterValue, filterValue)
        ) {
          if (filterValue.type === 'multiselect') {
            if (
              Array.isArray(filterValue.defaultValue) &&
              filterValue.defaultValue?.length > 0
            ) {
              count++
            }
          } else if (key === 'date') {
            if (
              moment(initialFilterValue.start_date).format('MM-DD-YYYY') !==
                moment(filterValue.start_date).format('MM-DD-YYYY') ||
              (initialFilterValue.end_date
                ? moment(initialFilterValue.end_date).format('MM-DD-YYYY') !==
                  moment(filterValue.end_date).format('MM-DD-YYYY')
                : false)
            ) {
              count++
            }
          } else {
            count++
          }
        } else if (
          (typeof filterValue === 'boolean' ||
            typeof filterValue === 'string') &&
          initialFilterValue !== filterValue
        ) {
          count++
        }
      }
    }
    if (count === 0) {
      count = null
    }

    return count
  }

export { cleanUpValues, compareArrays, createFilterCount }
