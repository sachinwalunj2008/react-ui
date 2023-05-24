import React from 'react'
import moment from 'moment'
import styles from './_two-line-date-label.module.scss'

type TwoLineDateLabelProps = {
  x: number
  y: number
  payload: {
    value: string | number
  }
  xTickFormat?: boolean
}

const TwoLineDateLabel = ({
  x,
  y,
  payload,
  xTickFormat,
}: TwoLineDateLabelProps): JSX.Element => {
  const day = moment(new Date(payload.value)).utc()
  return (
    <g>
      <text className={styles.label} x={x} y={y}>
        <tspan
          fill='rgb(116, 121, 157)'
          textAnchor='middle'
          key='0'
          x={x}
          dy='1.1em'
        >
          {!xTickFormat ? day.format('MMM D') : payload.value}
        </tspan>
      </text>
    </g>
  )
}

export default TwoLineDateLabel
