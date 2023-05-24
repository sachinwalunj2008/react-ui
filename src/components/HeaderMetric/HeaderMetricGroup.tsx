import React from 'react'
import HeaderMetric, { HeaderMetricProps, CalloutProps } from './HeaderMetric'
import styles from './header_metric_group.module.scss'

export type HeaderMetricGroupProps = {
  /** Header metric array of data */
  data: Array<Omit<HeaderMetricProps, 'checkboxColor' | 'loading'>>
  /** Boolean to determine loading state */
  loading: boolean
  /** Show radio button */
  showRadio?: boolean
  /** When showRadio is true, use this prop to handle the function that needs to be called when the radio is clicked */
  mainCallOut?: ({ ...param }: CalloutProps) => void
  /** The number of metrics above the HeaderMetricGroup that will offset the colors accordingly. */
  otherMetricCount?: number
  /** The metrics currently active. */
  activeMetrics?: string[]
  /** For styling purposes: when there are no elements below this component we need to handle the styles correctly. */
  styleBottom?: boolean
  /** Optional array of colors if the order of the colors needs to be manually defined instead of using the default defined here. */
  colors?: chartColors[]
}

export const checkboxColorOptions = [
  //////// Group 1 //////////
  'chart-standard-royal',
  'chart-standard-pink',
  'chart-standard-blue',
  'chart-standard-orange',
  'chart-standard-purple',
  'chart-standard-teal',
  'chart-standard-yellow',
  'chart-standard-green',
  'chart-standard-red',
  //////// Group 2 //////////
  'chart-light-3-royal',
  'chart-light-3-pink',
  'chart-light-3-blue',
  'chart-light-3-orange',
  'chart-light-3-purple',
  'chart-light-3-teal',
  'chart-light-3-yellow',
  'chart-light-3-green',
  'chart-light-3-red',
  //////// Group 3 //////////
  'chart-light-5-royal',
  'chart-light-5-pink',
  'chart-light-5-blue',
  'chart-light-5-orange',
  'chart-light-5-purple',
  'chart-light-5-teal',
  'chart-light-5-yellow',
  'chart-light-5-green',
  'chart-light-5-red',
  //////// Group 4 //////////
  'chart-dark-2-royal',
  'chart-dark-2-pink',
  'chart-dark-2-blue',
  'chart-dark-2-orange',
  'chart-dark-2-purple',
  'chart-dark-2-teal',
  'chart-dark-2-yellow',
  'chart-dark-2-green',
  'chart-dark-2-red',
  //////// Group 5 //////////
  'chart-dark-3-royal',
  'chart-dark-3-pink',
  'chart-dark-3-blue',
  'chart-dark-3-orange',
  'chart-dark-3-purple',
  'chart-dark-3-teal',
  'chart-dark-3-yellow',
  'chart-dark-3-green',
  'chart-dark-3-red',
  //////// Group 6 //////////
  'chart-light-2-royal',
  'chart-light-2-pink',
  'chart-light-2-blue',
  'chart-light-2-orange',
  'chart-light-2-purple',
  'chart-light-2-teal',
  'chart-light-2-yellow',
  'chart-light-2-green',
  'chart-light-2-red',
  //////// Single Color //////////
  'purple',
  //////// Other Colors //////////
  'blue',
  'red',
  'dark-yellow',
] as const // casting as const to define the types `chartColors` below. This way we define the list once and it will update everywhere `chartColors` is used. https://steveholgado.com/typescript-types-from-arrays/

export type chartColors = typeof checkboxColorOptions[number]

const HeaderMetricGroup = ({
  data,
  mainCallOut,
  showRadio = false,
  otherMetricCount = 0,
  activeMetrics,
  loading,
  styleBottom,
  colors,
}: HeaderMetricGroupProps): JSX.Element => {
  const gridCount =
      data.length <= 6 ? data.length : (data.length / 2).toFixed(),
    style = {
      '--grid-count': `${gridCount}`,
    } as React.CSSProperties

  const isItemChecked = (item: string) => {
    return activeMetrics?.some((metric) => metric === item)
  }

  return (
    <div className={styles.groupContainer} style={style}>
      {data.map((item, index) => {
        let updatedColors = [...checkboxColorOptions]
        if (otherMetricCount) {
          updatedColors = [...checkboxColorOptions].slice(otherMetricCount)
        }
        if (colors) {
          updatedColors = colors.concat(updatedColors)
        }
        return item?.secondaryInfo ? (
          <HeaderMetric
            key={`${index}_${item?.key ? item.key : item.title}`}
            className={`${styles.headerMetricClass} ${
              styleBottom ? styles.transparentBottom : ''
            }`}
            linkTo={item.linkTo}
            loading={loading}
            secondaryInfo={item.secondaryInfo}
            title={item.title}
            tooltip={item.tooltip}
            metricTooltip={item.metricTooltip}
          />
        ) : (
          <HeaderMetric
            key={`${index}_${item?.key ? item.key : item.title}`}
            title={item.title}
            tooltip={item.tooltip}
            value={item.value}
            change={item.change}
            pctChange={item.pctChange}
            currency={item.currency}
            formatType={item.formatType}
            metricIcon={item.metricIcon}
            reverse={item.reverse}
            linkTo={item.linkTo}
            callout={(data) => mainCallOut?.(data)}
            showRadio={showRadio}
            decimalScale={item.decimalScale}
            roundNumber={item.roundNumber}
            checkboxColor={updatedColors[index]}
            isNeutralColor={item.isNeutralColor}
            isChecked={isItemChecked(item?.key ? item.key : item.title)}
            className={`${styles.headerMetricClass} ${
              styleBottom ? styles.transparentBottom : ''
            }`}
            metricValueClassName={item.metricValueClassName}
            loading={loading}
            truncateValues={item.truncateValues}
            customSecondaryValue={item.customSecondaryValue}
            metricTooltip={item.metricTooltip}
          />
        )
      })}
    </div>
  )
}

export default HeaderMetricGroup
