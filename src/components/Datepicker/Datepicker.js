import React, { Component } from 'react'
import {
  DateRangePicker,
  isInclusivelyBeforeDay,
  isInclusivelyAfterDay,
  SingleDatePicker,
} from 'react-dates'
import { Icon } from '../../module'
import moment from 'moment'
import PropTypes from 'prop-types'

/**
 * @deprecated Please do not use this component, Use DatePickerNew.
 **/
class Datepicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: this.props.startDate || null,
      endDate: this.props.endDate || null,
      focusedInput: null,
      preSelected: this.props.preSelected || null,
      selected: this.props.selected || 'Last 7 Days',
      showSelect: this.props.showSelect || false,
      showCustom: this.props.showCustom || false,
      startDateId: this.props.startDateId,
      endDateId: this.props.endDateId,
      focused: this.props.focused,
      caretOffsetAfter: '41px',
      caretOffsetBefore: '40px',
      showAllDates: this.props.showAllDates ?? false,
    }
  }

  componentDidMount() {
    let inputArr = document.querySelectorAll('.datepicker input')
    for (let i = 0; i < inputArr.length; i++) {
      inputArr[i].setAttribute('readonly', '')
    }
  }

  datesChanged = (startDate, endDate) => {
    if (this.props.resetDate && startDate === null && endDate === null) {
      this.props.resetDate()
    }
    this.setState(
      {
        startDate:
          this.props.startDateReset && !startDate && !endDate
            ? this.props.startDateReset
            : startDate?.clone().startOf('day'),
        endDate:
          this.props.endDateReset && !startDate && !endDate
            ? this.props.endDateReset
            : endDate?.clone().endOf('day'), // make sure we're always seeing the full dataset by setting to endOf('day')
      },
      () => {
        this.props.onDatesChange(
          this.state.startDate,
          this.state.endDate,
          this.props.closeMenu
        )
      }
    )
  }

  updateSingleDate = (startDate) => {
    this.props.onDateChange(startDate)
    this.setState({
      startDate: startDate,
    })
  }

  handleInputFocus = (focused, stateName) => {
    let caretOffsetBefore = 40,
      caretOffsetAfter = 41
    if (focused === 'endDate') {
      caretOffsetBefore = 190
      caretOffsetAfter = 191
    }
    return this.setState({
      [stateName]: focused,
      caretOffsetAfter: caretOffsetAfter + 'px',
      caretOffsetBefore: caretOffsetBefore + 'px',
    })
  }

  isOutsideRange = (day) => {
    const {
        hasFutureDates = false,
        specifiedDay,
        isOutsideRangeHandler,
        showAllDates,
      } = this.props,
      dateFunction = hasFutureDates
        ? isInclusivelyAfterDay
        : isInclusivelyBeforeDay

    if (showAllDates) {
      return false // no dates will be outside of range is showing all dates
    }
    return (
      !dateFunction(day, specifiedDay ? specifiedDay : moment()) ||
      isOutsideRangeHandler?.(day)
    )
  }

  render() {
    const {
      startDate,
      endDate,
      focusedInput,
      caretOffsetBefore,
      caretOffsetAfter,
    } = this.state
    const {
      /** The display format of the selected start and end dates */
      dateRangeFormat = 'MMM D',
      /** The display format of single date */
      singleDateDisplayFormat = 'MMMM DD, YYYY',
      startDateId,
      /** Placeholder text for start date */
      startDatePlaceholder,
      endDateId,
      /** Placeholder text for end date */
      endDatePlaceholder,
      isSingle,
      customId,
      reopenOnClear,
      monthsNum,
      customClass,
      orientation,
    } = this.props
    return (
      <div
        className={`datepicker ${customClass ? customClass : ''} ${
          orientation ? orientation : ''
        } ${window.innerWidth <= 768 && !orientation ? 'vertical' : ''}`}
      >
        {isSingle ? (
          <div
            className={`${startDate ? 'blur' : ''} ${
              this.state.focused ? 'focus' : ''
            }`}
            style={{
              '--caretOffsetBefore': caretOffsetBefore,
              '--caretOffsetAfter': caretOffsetAfter,
            }}
          >
            <SingleDatePicker
              date={this.state.startDate} // momentPropTypes.momentObj or null
              onDateChange={(startDate) => this.updateSingleDate(startDate)} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) =>
                this.handleInputFocus(focused, 'focused')
              } // PropTypes.func.isRequired
              numberOfMonths={1}
              navPrev={<Icon icon='left' />}
              navNext={<Icon icon='right' />}
              customInputIcon={<Icon icon='calendar' />}
              hideKeyboardShortcutsPanel={true}
              displayFormat={singleDateDisplayFormat}
              id={`single-datepicker-${customId}`} // PropTypes.string.isRequired,
              isOutsideRange={(day) => this.isOutsideRange(day)}
            />
          </div>
        ) : (
          <div
            className={`${startDate ? 'blur' : ''} ${
              focusedInput ? 'focus' : ''
            }`}
            style={{
              '--caretOffsetBefore': caretOffsetBefore,
              '--caretOffsetAfter': caretOffsetAfter,
            }}
          >
            <DateRangePicker
              startDate={startDate} // momentPropTypes.momentObj or null,
              startDateId={startDateId} // PropTypes.string.isRequired,
              endDate={endDate} // momentPropTypes.momentObj or null,
              endDateId={endDateId} // PropTypes.string.isRequired,
              startDatePlaceholderText={startDatePlaceholder}
              endDatePlaceholderText={endDatePlaceholder}
              onDatesChange={({ startDate, endDate }) =>
                this.datesChanged(startDate, endDate)
              } // PropTypes.func.isRequired,
              focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={(focusedInput) =>
                this.handleInputFocus(focusedInput, 'focusedInput')
              } // PropTypes.func.isRequired,
              showClearDates={true}
              hideKeyboardShortcutsPanel={true}
              numberOfMonths={monthsNum || 2}
              orientation={
                orientation
                  ? orientation
                  : window.innerWidth <= 768
                  ? 'vertical'
                  : 'horizontal'
              }
              navPrev={<Icon icon='left' />}
              navNext={<Icon icon='right' />}
              customArrowIcon={<Icon icon='arrowLong' />}
              customInputIcon={<Icon icon='calendar' />}
              customCloseIcon={
                <span className='uppercase'>
                  {this.props.reset ? 'Reset' : 'Clear'}
                </span>
              }
              displayFormat={dateRangeFormat}
              inputIconPosition='after'
              reopenPickerOnClearDates={reopenOnClear || false}
              isOutsideRange={(day) => this.isOutsideRange(day)}
              minimumNights={0}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Datepicker

Datepicker.propTypes = {
  hasFutureDates: PropTypes.bool,
  showAllDates: PropTypes.bool,
  onDatesChange: PropTypes.func,
  onDateChange: PropTypes.func,
  startDateId: PropTypes.string,
  endDateId: PropTypes.string,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  dateRangeFormat: PropTypes.string,
  singleDateDisplayFormat: PropTypes.string,
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  preSelected: PropTypes.string,
  selected: PropTypes.string,
  showSelect: PropTypes.string,
  showCustom: PropTypes.string,
  isSingle: PropTypes.bool,
  specifiedDay: PropTypes.object,
  reset: PropTypes.bool,
  resetDate: PropTypes.func,
  focused: PropTypes.bool,
}
