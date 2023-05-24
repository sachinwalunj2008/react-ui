import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, DatepickerNew, Tippy } from '../../module'
import SelectedDate from './SelectedDate'
import styles from './_date-range.module.scss'

const DateRange = ({
  startDate,
  singleDate,
  endDate,
  selected,
  specifiedDay,
  resetDate,
  callout,
  showCalendar,
  customClickText,
  hideCustomDateSearch,
  placement,
}) => {
  const [state, setState] = useState({
    start_date: null,
    end_date: null,
  })

  useEffect(() => {
    !startDate && !endDate && setState({ start_date: null, endDate: null })
  }, [startDate, endDate])

  const { start_date, end_date } = state

  const [showTippy, setShowTippy] = useState(false)

  const dateRangeCallout = (closeMenu) => {
    if (singleDate) {
      callout(start_date)
      closeMenu()
    } else if (start_date !== null && end_date !== null) {
      callout(start_date, end_date)
      closeMenu()
    }
  }

  const datepickerUpdate = (start, end, closeMenu) => {
    let startDate = moment(start)
    let endDate = end ? moment(end) : null
    setState((prevState) => ({
      ...prevState,
      start_date: startDate,
      end_date: endDate,
    }))
    hideCustomDateSearch &&
      customDateRangeCallout(startDate, endDate, closeMenu)
  }

  const closeTippy = () => {
    setShowTippy(false)
  }

  const customDateRangeCallout = (startDate, endDate, closeMenu) => {
    if (startDate !== null && endDate !== null) {
      callout(startDate, endDate)
      closeMenu()
    }
  }

  const singleDatepickerUpdate = (start, closeMenu) => {
    let date = moment(start).format('YYYY-MM-DD')

    setState((prevState) => ({
      ...prevState,
      start_date: date,
    }))
    callout(date)
    closeMenu()
  }

  const cancelSearch = (closeMenu, reset) => {
    setState({
      start_date: null,
      end_date: null,
    })
    closeMenu()
    reset && resetDate && resetDate()
  }

  let useable_start_date = start_date?.isValid() ? start_date : startDate,
    useable_end_date = end_date || endDate

  return (
    <div
      className={`${styles.dateRangeContainer} ${
        (
          customClickText && useable_start_date && !singleDate
            ? useable_end_date
            : useable_start_date
        )
          ? styles.darkBorder
          : styles.lightBorder
      }`}
    >
      <Tippy
        trigger='click'
        content={
          <div className={styles.dateRangeTippy}>
            {singleDate ? (
              <DatepickerNew
                startDate={moment(useable_start_date)}
                startDateId='datepicker-date'
                onDateChange={(startDate) =>
                  singleDatepickerUpdate(startDate, closeTippy)
                }
                specifiedDay={specifiedDay || moment()}
                isSingle
                focused
                customClass='right'
              />
            ) : (
              <DatepickerNew
                startDate={
                  useable_start_date ? moment(useable_start_date) : null
                }
                endDate={useable_end_date ? moment(useable_end_date) : null}
                startDateId='datepicker-start-date'
                endDateId='datepicker-end-date'
                onDatesChange={datepickerUpdate}
                specifiedDay={specifiedDay || moment()}
                closeMenu={closeTippy}
                resetDate={() => cancelSearch(closeTippy, true)}
                reset
                customClass='left'
              />
            )}
            {!hideCustomDateSearch && !singleDate && (
              <div className={styles.datepickerSearchButtons}>
                <Button
                  onClick={() => {
                    cancelSearch(closeTippy)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  styleType='primary-green'
                  onClick={() => {
                    dateRangeCallout(closeTippy)
                  }}
                >
                  Search
                </Button>
              </div>
            )}
          </div>
        }
        interactive
        placement={placement || 'bottom-end'}
        onClickOutside={closeTippy}
        visible={showTippy}
        appendTo={document.body}
        className={styles.tippyWidthOverride}
      >
        <div>
          <Button
            className={styles.buttonStyle}
            as='unstyled'
            onClick={() => setShowTippy(true)}
          >
            <div className={styles.selectedText}>
              {customClickText ? (
                customClickText(
                  useable_start_date ? moment(useable_start_date) : null,
                  !singleDate
                    ? useable_end_date
                      ? moment(useable_end_date)
                      : null
                    : useable_start_date
                    ? moment(useable_start_date)
                    : null
                )
              ) : (
                <SelectedDate
                  dateRangeSelected={selected}
                  startDate={
                    useable_start_date ? moment(useable_start_date) : null
                  }
                  endDate={
                    !singleDate
                      ? useable_end_date
                        ? moment(useable_end_date)
                        : null
                      : useable_start_date
                      ? moment(useable_start_date)
                      : null
                  }
                  singleDate={singleDate}
                  timeframe={!singleDate ? true : false}
                  showCalendar={showCalendar}
                />
              )}
            </div>
          </Button>
        </div>
      </Tippy>
    </div>
  )
}

export default DateRange
