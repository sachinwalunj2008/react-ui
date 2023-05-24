import React from 'react'
import { Icon, PopoverAndMobileDrawer, Button } from '../../module'
import TimeframeFilterBody from './TimeframeFilterBody'
import styles from './_timeframe-filter.module.scss'

type TimeframeFilterProps = {
  /** Function to be called when an option is clicked */
  callout: () => void
  /** Selected time frame */
  timeframe: {
    type: string
    display: string
    value?: number
    timeValue: string
    quarter?: number
    year?: string
  }
  /** historical time frame options in a array */
  historicalTimeframes?: {
    id: number
    display: string
    value: number
    timeValue: string
  }[]
  /** Show/hide the Current timeframe sections based on this boolean value */
  currentTimeframe?: boolean
  /** Show/hide the Quartely/Yearly timeframe sections based on this boolean value  */
  quarterlyTimeframe?: boolean
}

const tippyProps: React.ComponentPropsWithoutRef<
  typeof PopoverAndMobileDrawer
>['tippyProps'] = {
  placement: 'right',
  maxWidth: 'none',
  className: `${styles.datepickerContainer} ${styles.timeframeFilterWrapper}`,
  // due to the Calendar component acting weird on Tippy close, we have to set the tippy closing duration to 0 to avoid some rendering issues
  duration: [300, 0],
}

const TimeframeFilter = ({
  callout,
  historicalTimeframes,
  timeframe,
  currentTimeframe,
  quarterlyTimeframe,
}: TimeframeFilterProps): JSX.Element => {
  return (
    <PopoverAndMobileDrawer
      content={
        <TimeframeFilterBody
          callout={callout}
          historicalTimeframes={historicalTimeframes}
          timeframe={timeframe}
          currentTimeframe={currentTimeframe}
          quarterlyTimeframe={quarterlyTimeframe}
          comparisonDateRange={undefined}
          getComparisonDateRange={undefined}
          customAggregations={undefined}
          startDate={undefined}
          endDate={undefined}
        />
      }
      tippyProps={tippyProps}
    >
      <Button className={styles.timeframeButtonWrapper}>
        <Icon icon='calendar' size='16px' customClass={styles.iconStyle} />
        {timeframe.display}
      </Button>
    </PopoverAndMobileDrawer>
  )
}
export default TimeframeFilter
