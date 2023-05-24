import React from 'react'
import { Button } from '../../../module'
import styles from '../_timeframe-filter.module.scss'

const TimeframeButton = ({
  updateTimeframe,
  el,
  timeframe,
  disabled,
  customDisplay,
  timeframeKey = 'display',
}) => {
  const isSelected =
    timeframe[timeframeKey]?.toLowerCase?.() ===
    (customDisplay?.toLowerCase?.() || el.display?.toLowerCase?.())
  return (
    <Button
      as='unstyled'
      className={`${styles.filterButton} ${isSelected ? styles.active : ''} ${
        el.customClass ? el.customClass : ''
      } ${disabled ? styles.disabled : ''}`}
      key={el.id}
      disabled={disabled}
      onClick={() => {
        !isSelected && !disabled && updateTimeframe(el)
      }}
    >
      {el.display}
    </Button>
  )
}

export default TimeframeButton
