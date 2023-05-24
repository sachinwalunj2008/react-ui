import React from 'react'
import { NumericFormat } from 'react-number-format'
import { hasValue } from '../../module'

const PercentageCheck = ({
  percent = 0,
  decimalScale,
  lessThanZeroText,
  noConversion,
  customClass = '',
  roundNumber,
  showLessThanZero,
}: PercentageCheckProps): JSX.Element => {
  const round =
    typeof roundNumber === 'boolean'
      ? roundNumber
      : Math.floor(percent * 100) !== 99

  const conversion = noConversion ? 1 : 100,
    convertedPercent = percent * conversion

  // If the converted percent is between 0 and 1, we would show the < 1% (or custom) unless showLessThanZero is true
  if (showLessThanZero || convertedPercent >= 1 || convertedPercent === 0) {
    return (
      <NumericFormat
        value={
          hasValue(decimalScale) && !round
            ? convertedPercent
            : Math.round(convertedPercent)
        }
        suffix='%'
        decimalScale={hasValue(decimalScale) ? decimalScale : 0}
        displayType='text'
        thousandSeparator={true}
        fixedDecimalScale={true}
        className={customClass}
      />
    )
  } else {
    return (
      <span className={customClass}>
        {lessThanZeroText ? lessThanZeroText : '< 1%'}
      </span>
    )
  }
}

export default PercentageCheck

interface PercentageCheckProps {
  // The number that will be converted to a percentage
  // This was made optional because of some limitation
  percent?: number
  // The number of decimal places that will be used
  decimalScale?: number
  // If the converted percentage is between 0 and 1, then this text will be displayed instead of the percentage
  lessThanZeroText?: string
  // This determines whether the `percent` that is passed will be multiplied by 100
  noConversion?: boolean
  // This allows us to round our percentage value
  roundNumber?: boolean
  // Optional classes can be added for styling
  customClass?: string
  // When the converted percentage is between 0 and 1, we would show `< 1%` (or the `lessThanZeroText` value). If we want to show the actual value instead, then this needs to be true.
  showLessThanZero?: boolean
}
