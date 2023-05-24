import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Icon, Button } from '../../module'
import styles from './_selected-date.module.scss'

const SelectedDate = ({
  dateRangeSelected,
  startDate,
  endDate,
  timeframe,
  singleDate,
  showCalendar,
}) => {
  return (
    <Button as='button' styleType='secondary' className={styles.SelectedDate}>
      {dateRangeSelected ? (
        <span className={styles.timeframeDateDisplay}>
          <span
            className={`${styles.dateDisplay} ${singleDate ? 'single' : ''}`}
          >
            {singleDate ? (
              <>
                {!showCalendar && (
                  <Icon
                    icon='calendar'
                    size='14px'
                    customClass={styles.iconStyle}
                  />
                )}
                <span className={styles.dateString}>
                  {moment(startDate).format('MMM DD, YYYY')}
                </span>
              </>
            ) : (
              <span>
                {moment(startDate).format('MM/DD/YY')} to{' '}
                {moment(endDate).format('MM/DD/YY')}
              </span>
            )}
          </span>
          {showCalendar && (
            <Icon icon='calendar' size='14px' customClass={styles.iconStyle} />
          )}
        </span>
      ) : (
        <Icon icon='calendar' size='14px' customClass={styles.iconStyle} />
      )}
    </Button>
  )
}

export default SelectedDate

SelectedDate.propTypes = {
  dateRangeSelected: PropTypes.bool.isRequired,
  startDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment),
  ]),
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment),
  ]),
  timeframe: PropTypes.bool,
  singleDate: PropTypes.bool,
}
