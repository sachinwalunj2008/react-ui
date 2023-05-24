import React from 'react'
import { NumericFormat } from 'react-number-format'
import { NavLink } from 'react-router-dom'
import {
  Button,
  Checkbox,
  hasValue,
  Icon,
  IconStringList,
  largeNumConversion,
  Mdash,
  MdashCheck,
  PercentageCheck,
  Tooltip,
  useMediaQuery,
} from '../../module'
import Ellipsis from '../Ellipsis/Ellipsis'
import { chartColors } from './HeaderMetricGroup'
import styles from './header_metric_group.module.scss'
import { TooltipProps } from '../Tooltip/Tooltip'

type HeaderMetricBase = {
  /** The key override for the metric - if it needs to be different than `title` */
  key?: string
  /** Text to display in metric */
  title: string
  /** Tooltip content to display next to title in metric */
  tooltip?: TooltipProps['tooltipContent']
  /** Tooltip content to display when hovering over the metric values. */
  metricTooltip?: TooltipProps['tooltipContent']
  /** Used for internal links only */
  linkTo?: string
  /** The font size that will change the main data of the metric. */
  fontSize?: 'fs-16' | 'fs-18' | 'fs-22'
  /** Boolean to determine loading state */
  loading: boolean
  /** Optional className can be added */
  className?: string
}

type HeaderMetricValueType = HeaderMetricBase & {
  /** Value to display in metric */
  value?: number
  /** Change value to display in metric */
  change?: number
  /** Percentage change to display in metric */
  pctChange?: number
  /** Currency to display in metric */
  currency?: CurrencyProps
  /** Value format to display in metric */
  formatType?: 'number' | 'percentage'
  /** Metric icon to display in metric */
  metricIcon?: IconStringList
  /** Decimal scale applied to value in metric */
  decimalScale?: number
  /** When we have a percentage value we should use this if we want to round that percentage value */
  roundNumber?: boolean
  /** Reverse the change value display */
  reverse?: boolean
  /** Allow the radio button to be displayed */
  showRadio?: boolean
  /** When showRadio is true, use this prop to handle the function that needs to be called when the radio is clicked */
  callout?: ({ ...param }: CalloutProps) => void
  /** This will set the metric number and checkbox color from list of chartColors */
  checkboxColor?: chartColors
  /** When true, this will set the change value, and change icon to our purple color */
  isNeutralColor?: boolean
  /** Checked state override of the metric radio button by default */
  isChecked?: boolean
  /** Optional className can be added to the metric value */
  metricValueClassName?: string
  /** Display values in a truncated format. i.e. 1.4M instead of 1,400,000 */
  truncateValues?: boolean
  /** DisplayS the full percentage change value if set to true. Otherwise, it will display `<1%` if set to false */
  showLessThanZeroPercentageChange?: boolean
  /** There are some instances where a custom element needs to replace the percentage values. This is where that should live. */
  customSecondaryValue?: React.ReactNode
  secondaryInfo?: never
}

type HeaderMetricTextType = HeaderMetricBase & {
  /** Any value apart from change metrics. Eg: string, text */
  secondaryInfo: string
  value?: never
  change?: never
  pctChange?: never
  currency?: never
  formatType?: never
  metricIcon?: never
  decimalScale?: never
  roundNumber?: never
  reverse?: never
  showRadio?: never
  callout?: never
  checkboxColor?: never
  isNeutralColor?: never
  isChecked?: never
  metricValueClassName?: never
  truncateValues?: never
  showLessThanZeroPercentageChange?: never
  customSecondaryValue?: never
}

export type HeaderMetricProps = HeaderMetricValueType | HeaderMetricTextType

export type CalloutProps = {
  /** When showRadio is true, use this prop to the function that needs to be called when the radio is clicked */
  name: string
  checked: boolean
}
export type CurrencyProps = {
  /** Currency code to display after metric (ex: 100฿) */
  currencyCode: string
  /** Currency symbol to display before metric (ex: $100) */
  currencySymbol: string
}
type changeObjectProps = {
  /** This className will be added to the change value */
  className: string
  /** This className will be added to the text */
  textClassName: string
  /** Text to display in determine change */
  text: string
  /** Icon to display in determine change */
  icon: IconStringList
}
const HeaderMetric = ({
  callout,
  change,
  checkboxColor = 'purple',
  className = '',
  currency,
  customSecondaryValue,
  decimalScale = 0,
  fontSize,
  formatType = 'number',
  isChecked = false,
  isNeutralColor = false,
  linkTo,
  loading,
  metricIcon,
  metricValueClassName = '',
  pctChange = 0,
  reverse = false,
  roundNumber = false,
  secondaryInfo,
  showLessThanZeroPercentageChange = true,
  showRadio = false,
  title,
  tooltip,
  truncateValues,
  value,
  metricTooltip,
}: HeaderMetricProps): JSX.Element => {
  const screenIsMdMax = useMediaQuery({ type: 'max', breakpoint: 'md' })
  const screenIsXlMax = useMediaQuery({ type: 'max', breakpoint: 'xl' })

  const currencySuffix =
    currency?.currencyCode && currency?.currencyCode !== 'USD'
      ? ` ${currency?.currencyCode}`
      : undefined

  /** Display percentage change */
  const percentageChange = (pctChange: number, reverse: boolean) => {
    return (
      <>
        {determineChange(pctChange, reverse, isNeutralColor).text !==
          'No Change' && (
          <PercentageCheck
            percent={Math.abs(Number(pctChange))}
            roundNumber={false}
            decimalScale={2}
            showLessThanZero={showLessThanZeroPercentageChange}
          />
        )}
      </>
    )
  }
  /** Display determine change and reverse logic, return the className, textClassName, text & icon */
  const determineChange = (
    changePct: number,
    reverse?: boolean,
    isNeutralColor?: boolean
  ) => {
    let changeObject: changeObjectProps = {
      className: isNeutralColor ? styles.iconPurple : styles.iconBlue,
      textClassName: isNeutralColor ? styles.fontPurple : styles.fontBlue,
      text: 'No Change',
      icon: 'trendEven',
    }
    if (!reverse) {
      if (changePct < 0) {
        changeObject = {
          textClassName: isNeutralColor
            ? styles.fontPurple
            : styles.fontDarkRed,
          className: isNeutralColor ? styles.iconPurple : styles.iconDarkRed,
          text: 'Decrease',
          icon: 'trendDown',
        }
      } else if (changePct > 0) {
        changeObject = {
          textClassName: isNeutralColor
            ? styles.fontPurple
            : styles.fontDarkGreen,
          className: isNeutralColor ? styles.iconPurple : styles.iconDarkGreen,
          text: 'Increase',
          icon: 'trendUp',
        }
      }
    } else {
      if (changePct < 0) {
        changeObject = {
          textClassName: isNeutralColor
            ? styles.fontPurple
            : styles.fontDarkGreen,
          className: isNeutralColor ? styles.iconPurple : styles.iconDarkGreen,
          text: 'Decrease',
          icon: 'trendDown',
        }
      } else if (changePct > 0) {
        changeObject = {
          textClassName: isNeutralColor
            ? styles.fontPurple
            : styles.fontDarkRed,
          className: isNeutralColor ? styles.iconPurple : styles.iconDarkRed,
          text: 'Increase',
          icon: 'trendUp',
        }
      }
    }
    return changeObject
  }

  const metricValue = truncateValues ? largeNumConversion(value).val : value,
    metricChangeValue = truncateValues
      ? largeNumConversion(change).val
      : change,
    valueSuffix = truncateValues ? largeNumConversion(value).suffix : null,
    changeSuffix = truncateValues ? largeNumConversion(change).suffix : null,
    metricValueSuffix = `${valueSuffix ? `${valueSuffix} ` : ''}${
      currencySuffix ? currencySuffix : ''
    }`,
    metricChangeSuffix = `${changeSuffix ? `${changeSuffix} ` : ''}${
      currencySuffix ? currencySuffix : ''
    }`,
    largeNumDecimalScale =
      truncateValues && value && value > 1.0e6 ? 2 : decimalScale,
    largeNumChangeDecimalScale =
      truncateValues && change && change > 1.0e6 ? 2 : decimalScale

  /** Display change value */
  const showChangeValue = (change: number) => {
    const value =
      metricChangeValue && formatType === 'percentage'
        ? metricChangeValue * 100
        : metricChangeValue

    return (
      <div className={styles.changeMetric}>
        <MdashCheck check={!!hasValue(value)}>
          <NumericFormat
            value={Math.abs(Number(value))}
            displayType='text'
            decimalScale={largeNumChangeDecimalScale}
            fixedDecimalScale={!!decimalScale}
            thousandSeparator
            prefix={currency?.currencySymbol}
            suffix={metricChangeSuffix}
            className={
              determineChange(change, reverse, isNeutralColor).textClassName
            }
          />
        </MdashCheck>
        <div className={styles.divider}></div>
        <MdashCheck check={!!hasValue(pctChange)}>
          <span
            className={
              determineChange(change, reverse, isNeutralColor).textClassName
            }
          >
            {percentageChange(pctChange, reverse)}
          </span>
        </MdashCheck>
        <MdashCheck check={!!hasValue(change)}>
          <Icon
            icon={determineChange(change, reverse, isNeutralColor).icon}
            size={'10px'}
            customClass={
              determineChange(change, reverse, isNeutralColor).className
            }
          />
        </MdashCheck>
      </div>
    )
  }

  const metricDisplay = () => {
    return secondaryInfo ? (
      <MdashCheck
        check={!!hasValue(secondaryInfo) && !loading}
        customClass={`${
          fontSize ? fontSize : screenIsMdMax ? styles.fs16 : styles.fs18
        }`}
      >
        {secondaryInfo}
      </MdashCheck>
    ) : (
      <Tooltip
        position='bottom'
        customClass={
          !metricTooltip ||
          !hasValue(metricValue) ||
          !hasValue(value) ||
          loading
            ? styles.none
            : ''
        }
        tooltipContent={metricTooltip}
      >
        <div className={styles.metricContainer}>
          <div className={styles.metricIconAndMainMetric}>
            {metricIcon && <Icon icon={metricIcon} size='12px' />}
            <MdashCheck
              check={!!(hasValue(metricValue) || hasValue(value)) && !loading}
            >
              <div
                className={`${
                  fontSize
                    ? fontSize
                    : screenIsMdMax
                    ? styles.fs16
                    : styles.fs18
                } ${
                  showRadio
                    ? isChecked
                      ? styles.fwSemibold
                      : ''
                    : metricValueClassName
                } `}
              >
                {formatType === 'percentage' ? (
                  <PercentageCheck
                    percent={Math.abs(Number(value))}
                    roundNumber={roundNumber}
                    decimalScale={decimalScale}
                    showLessThanZero
                  />
                ) : (
                  <NumericFormat
                    value={metricValue}
                    displayType='text'
                    decimalScale={largeNumDecimalScale}
                    fixedDecimalScale={!!decimalScale}
                    thousandSeparator
                    prefix={currency?.currencySymbol}
                    suffix={metricValueSuffix}
                  />
                )}
              </div>
            </MdashCheck>
          </div>
          {change === undefined ? (
            <></>
          ) : (
            <div>
              {!loading &&
                (change !== undefined && !!hasValue(pctChange) ? (
                  customSecondaryValue ? (
                    customSecondaryValue
                  ) : (
                    showChangeValue(change)
                  )
                ) : (
                  <div className={styles.noChangeValue}>
                    <Mdash dark />
                    <Tooltip tooltipContent='No comparison values available for this metric.'>
                      <Icon
                        icon='info'
                        customClass={styles.iconBlue}
                        size='10px'
                      />
                    </Tooltip>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Tooltip>
    )
  }

  /** Radio button handler */
  const inputHandler = () => {
    callout?.({ name: title, checked: !isChecked })
  }

  const mainAction = () => {
    // TODO: Create a skeleton loading experience. UX is creating a mockup for us to do this.
    return (
      <div
        className={
          linkTo
            ? styles.mainActionContainerWithLink
            : styles.mainActionContainerWithoutLink
        }
      >
        <Button
          as='unstyled'
          onClick={inputHandler}
          className={!showRadio ? styles.noCursor : ''}
        >
          <div className={styles.mainAction} style={{ flex: '1 1 100%' }}>
            <div className={styles.labelContainer}>
              <div className={styles.fs12}>
                {loading ? (
                  <span>
                    Fetching Data
                    <Ellipsis />
                  </span>
                ) : (
                  title ?? 'No Data Found'
                )}
              </div>
              {tooltip && (
                <Tooltip position='top' tooltipContent={tooltip}>
                  <Icon icon='info' customClass={styles.iconBlue} size='12px' />
                </Tooltip>
              )}
            </div>
            {metricDisplay()}
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`${styles.headerMetricContainer} ${className}`}
      style={{
        flex: screenIsMdMax
          ? '1 1 100%'
          : screenIsXlMax
          ? '1 1 30.11%'
          : '1 1 14.66%',
      }}
    >
      <div className={styles.mainActionContainer} style={{ flex: '1 1 100%' }}>
        <div className={styles.statsContainer}>
          {showRadio && (
            <div style={{ marginTop: '2px' }}>
              <Checkbox
                name={title}
                stateName={title}
                checked={isChecked}
                type='radio'
                callout={inputHandler}
                label={title}
                hideLabel
                radioSize={'10'}
                checkboxColor={checkboxColor}
                disabled={loading}
              />
            </div>
          )}
          {mainAction()}
        </div>
        {linkTo && (
          <NavLink to={linkTo}>
            <Icon icon='right' customClass={styles.iconBlue} size='16px' />
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default HeaderMetric
