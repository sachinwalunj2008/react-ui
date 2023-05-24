import React from 'react'
import { TooltipProps } from 'recharts'
import { currencyFormat, Mdash, trimText } from '../../../module'
import DonutIcon from './Donut'
import styles from './_winnability.module.scss'

const donutRadius = [3, 5, 8, 13, 21, 34]

const Headline = ({
  text,
  combineFirstWord,
  color = 'purple',
}: {
  text: string
  combineFirstWord?: boolean
  color?: 'purple'
}): JSX.Element => {
  const headingArr = text?.split(' '),
    headingArrLength = headingArr.filter((val) => val).length,
    firstWordLength = headingArr[0].length
  let characterLength
  if ((firstWordLength < 5 || combineFirstWord) && headingArrLength > 1) {
    characterLength = headingArr[0].length + 1 + (headingArr[1].length - 2)
  } else if (firstWordLength < 5 && headingArrLength === 1) {
    characterLength = null
  } else {
    characterLength = firstWordLength - 2
  }
  return (
    <span>
      <span className={`${styles.header_with_underline} ${styles[color]}`}>
        {characterLength ? text.slice(0, characterLength) : text}
      </span>
      {characterLength && (
        <span>{text.slice(characterLength, text.length)}</span>
      )}
    </span>
  )
}

const DisplayRow = ({
  category,
  text,
}: {
  category: string
  text: string | JSX.Element
}) => (
  <div className={styles.row}>
    <div>{category}</div>
    <div className={styles.value}>{text}</div>
  </div>
)

const WinnabilityTooltip = ({
  active,
  payload = [],
}: TooltipProps<number, string>): JSX.Element => {
  if (active && payload && payload.length) {
    const label = trimText(payload[0].payload.name, 34) //To align tooltip header text ellipsis with the subtitle values.
    const winnabilityScore = payload[0].payload.x ? (
      `${payload[0].payload.x.toFixed(2)}`
    ) : (
      <Mdash />
    )
    const incrementalGrowth = payload[0].payload.incrementalGrowth ? (
      `${(payload[0].payload.incrementalGrowth * 100).toFixed(2)}%`
    ) : (
      <Mdash />
    )
    const size = payload[0].payload.z

    return (
      <div className={styles.tooltip_container}>
        <div className={styles.heading}>
          <Headline text={label} color='purple' />
        </div>
        <DisplayRow category='Size' text={`$${currencyFormat(size, 0)}`} />
        <DisplayRow category='Incremental Growth' text={incrementalGrowth} />
        <DisplayRow category='Winnability Score' text={winnabilityScore} />
      </div>
    )
  } else {
    return <></>
  }
}

export default WinnabilityTooltip

export const WinnabilityLegend = (): JSX.Element => {
  const legendItems = [
    'High Opportunity',
    'Attractive or Winnable',
    'Deprioritize',
  ]
  const colors = [
    'var(--chart-dark-1-green)',
    'var(--chart-dark-1-orange)',
    'var(--chart-dark-2-red)',
  ]
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '52px',
      }}
      className='fs-12'
    >
      {legendItems.map((status, i) => {
        const size = donutRadius[1]
        return (
          <div
            key={status}
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingRight: '24px',
            }}
          >
            <DonutIcon
              size={size}
              color={colors[i]}
              widthHeight={{ width: '16px', height: '12px' }}
            />
            <span>{status}</span>
          </div>
        )
      })}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[2, 3, 4].map((size) => {
          return (
            <div key={size} style={{ paddingRight: '4px' }}>
              <DonutIcon
                size={size}
                color='#000'
                viewBox={`0 ${-10 + size * 2} 12 12`}
                widthHeight={{ width: '10px', height: '10px' }}
              />
            </div>
          )
        })}
        <span>Market Size: The larger the bubble, the bigger the market</span>
      </div>
    </div>
  )
}
