import React from 'react'
import moment from 'moment'
import { Heading1, sortFilter } from '../../../module'

type LineTooltipProps = {
  /** Determines whether to show the tooltip */
  active: boolean
  /** Payload from the graph data */
  payload: Array<{
    dataKey: string
    tooltipId: number
    color?: string
    value: number | string
  }>
  /** This is always a date */
  label: string
  /** Optional classname */
  className?: string
  /** Optional prefix added to the values */
  prefix?: React.ReactNode
  /** Optional suffix added to the values */
  suffix?: React.ReactNode
  /** Optional secondary date value */
  tooltipSecondDate?: boolean
  /** Optionally arrange the order of the values in the tooltip */
  tooltipOrder?: Array<string>
}

const LineTooltip = ({
  active,
  payload,
  label,
  className,
  prefix,
  suffix,
  tooltipSecondDate,
  tooltipOrder,
}: LineTooltipProps): JSX.Element => {
  if (tooltipOrder) {
    payload.map((e) => {
      const tooltipId = tooltipOrder.indexOf(e.dataKey) + 1
      e.tooltipId = tooltipId
      return e
    })
    payload = sortFilter(payload, 'tooltipId', '')
  }
  const day = moment.utc(label).format('MMM Do')
  if (active) {
    return (
      <div className={`${className}-tooltip`}>
        <div className='top-section flex'>
          <Heading1 text={day} customClass={'title'} />
          {tooltipSecondDate && (
            <React.Fragment>
              <span className='second-date-mdash'>
                &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
              </span>
              <h1 className='title second-title'>
                {moment(new Date(label)).add(6, 'days').format('MMM Do')}
              </h1>
            </React.Fragment>
          )}
        </div>
        <div className='stat-box justify-content-between'>
          {payload.map((e) => {
            if (e.dataKey.includes('dontuse')) {
              return null
            }
            return (
              <div key={e.dataKey} className='stat-container'>
                <div className='title'>
                  {e.dataKey
                    .toLocaleString()
                    .split('_')
                    .map(
                      (word) => word.charAt(0)?.toUpperCase() + word.slice(1)
                    )
                    .join(' ')}
                </div>
                <div className='stat' style={{ color: e.color }}>
                  {prefix && prefix}
                  {prefix && prefix === '$'
                    ? e.value.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })
                    : e.value.toLocaleString()}
                  {suffix && suffix}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return <></>
}

export default LineTooltip
