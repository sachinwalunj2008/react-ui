import React from 'react'
import { NumericFormat } from 'react-number-format'
import {
  Icon,
  Mdash,
  MdashCheck,
  PercentageCheck,
  IconStringList,
} from '../../module'

/**
 * @deprecated Please use HeaderMetric instead
 **/
export interface StatFigureProps {
  /** string or JSX to display a stat title */
  title?: React.ReactNode | string
  /** string or JSX to display a stat subtitle */
  subtitle?: React.ReactNode | string
  /** string or JSX to display a stat list_heading */
  list_heading?: React.ReactNode
  /** determine what metric type is being used for the stat value */
  metric?: 'percentage' | 'currency' | 'units'
  /** custom string value appended to the stat value */
  suffix?: string
  /** use a thousand separator for large numbers */
  thousandSeparator?: boolean
  /** custom className values to be included with individual stats */
  customClass?: string
  /** icon name to be appended after the stat value */
  icon?: IconStringList
  /** are stat values in a loading state */
  loading?: boolean

  multipleStats?: boolean
  multipleStatsVertical?: boolean
  /** does the stat value have a decimal value; if so, the number of decimal places must be set with `decimalScale` */
  fixedDecimalScale?: boolean
  /** number of decimal places to display */
  decimalScale?: number
  useCustomDecimalScale?: boolean
  showLessThanZero?: boolean
  roundNumber?: boolean
  noConversion?: boolean
  currency?: string
  /** the numerical value to display */
  stat?: number
  /** second stat (utilizes many of the same props as original stat) */
  subStat?: StatFigureProps
}

const StatFigure = ({
  title,
  subtitle,
  list_heading,
  stat,
  subStat,
  metric,
  suffix,
  currency,
  thousandSeparator,
  customClass,
  icon,
  loading,
  multipleStats,
  fixedDecimalScale = false,
  decimalScale = 0,
  useCustomDecimalScale = false,
  roundNumber,
  noConversion,
  showLessThanZero = false,
  multipleStatsVertical,
}: StatFigureProps): JSX.Element => {
  return (
    <div className='stat-figure'>
      {title && <h3>{title}</h3>}
      {subtitle && <h4>{subtitle}</h4>}
      {list_heading && list_heading}
      {multipleStats &&
      (!multipleStatsVertical || (multipleStatsVertical && title)) ? (
        <div className='title-spacer' />
      ) : null}
      <div className='figure-wrapper'>
        <h1 className={customClass ? customClass : ''}>
          {!loading ? (
            <MdashCheck check={!!stat || stat === 0}>
              {metric === 'percentage' ? (
                <div className='icon-figure'>
                  <PercentageCheck
                    percent={stat}
                    decimalScale={decimalScale}
                    roundNumber={roundNumber}
                    noConversion={noConversion}
                    showLessThanZero={showLessThanZero}
                  />
                  {icon && (
                    <Icon
                      icon={icon}
                      customClass={`iconClass ${
                        customClass ? customClass : ''
                      }`}
                    />
                  )}
                </div>
              ) : (
                <span className='icon-figure'>
                  <NumericFormat
                    value={stat}
                    displayType='text'
                    prefix={currency ? currency : ''}
                    suffix={suffix && suffix}
                    decimalScale={
                      useCustomDecimalScale
                        ? decimalScale
                        : currency
                        ? 2
                        : decimalScale
                    }
                    fixedDecimalScale={!!(currency || fixedDecimalScale)}
                    thousandSeparator={!!(currency || thousandSeparator)}
                  />
                  {icon && (
                    <Icon
                      icon={icon}
                      customClass={`iconClass ${
                        customClass ? customClass : ''
                      }`}
                    />
                  )}
                </span>
              )}
            </MdashCheck>
          ) : (
            <Mdash />
          )}
        </h1>
        {subStat && (
          <>
            <div className='mini-divider'></div>
            <h1 className={subStat.customClass ? subStat.customClass : ''}>
              {!loading ? (
                <MdashCheck check={!!subStat.stat || subStat.stat === 0}>
                  {metric === 'percentage' ? (
                    <div className='icon-figure'>
                      <PercentageCheck
                        percent={subStat.stat}
                        decimalScale={subStat.decimalScale}
                        roundNumber={subStat.roundNumber}
                        noConversion={subStat.noConversion}
                        showLessThanZero={subStat.showLessThanZero}
                      />
                      {subStat.icon && (
                        <Icon
                          icon={subStat.icon}
                          customClass={`iconClass ${
                            subStat.customClass ? subStat.customClass : ''
                          }`}
                        />
                      )}
                    </div>
                  ) : (
                    <div className='icon-figure'>
                      <NumericFormat
                        value={subStat.stat}
                        displayType='text'
                        prefix={subStat.currency ? subStat.currency : ''}
                        suffix={subStat.suffix && subStat.suffix}
                        decimalScale={
                          subStat.useCustomDecimalScale
                            ? subStat.decimalScale
                            : subStat.currency
                            ? 2
                            : subStat.decimalScale
                        }
                        fixedDecimalScale={
                          !!(subStat.currency || subStat.fixedDecimalScale)
                        }
                        thousandSeparator={
                          !!(subStat.currency || subStat.thousandSeparator)
                        }
                      />
                      {subStat.icon && (
                        <Icon
                          icon={subStat.icon}
                          customClass={`iconClass ${
                            subStat.customClass ? subStat.customClass : ''
                          }`}
                        />
                      )}
                    </div>
                  )}
                </MdashCheck>
              ) : (
                <Mdash />
              )}
            </h1>
          </>
        )}
      </div>
    </div>
  )
}

export default StatFigure
