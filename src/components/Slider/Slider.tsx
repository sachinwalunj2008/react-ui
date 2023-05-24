import React from 'react'
import { NumericFormat } from 'react-number-format'
import { largeNumConversion, Tooltip } from '../../module'
import FormLabel from '../FormLabel/FormLabel'
import styles from './_slider.module.scss'

type SliderProps = {
  /** The number value to display slider */
  value: number
  /** Function to update the required of slider */
  updateValue: (value: number) => void
  /** Label above the slider */
  label: string
  /** min slider range */
  min?: number
  /** max slider range */
  max?: number
  /** steps between number on slider */
  step?: string | number
  /** passes back the current value of the slider */
  callout?: (value: number | string) => void
  /** used to format the values text displayed on right of the slider */
  prefix?: string
  /** used to format the values text displayed on right of the slider */
  suffix?: string
  /** set width of slider */
  width?: string
  /** Optional tooltip to display when hovering over the slider */
  tooltip?: Omit<TooltipProps, 'children'>
  /** Optional tooltip for to display when hovering over the label */
  labelTooltip?: Omit<TooltipProps, 'children'>
  /** Optional label to display on the top right side of the slider */
  rightLabel?: React.ReactNode
  /** Optionally show a red asterisk if this field should be required */
  required?: boolean
}

type TooltipProps = React.ComponentProps<typeof Tooltip>

const Slider = ({
  label,
  tooltip,
  labelTooltip,
  rightLabel,
  value,
  updateValue,
  min = 0,
  max = 100,
  step,
  callout,
  prefix,
  suffix,
  width,
  required,
}: SliderProps): JSX.Element => {
  const formattedNumber = largeNumConversion(value).val,
    largeNumSuffix = largeNumConversion(value).suffix
      ? largeNumConversion(value).suffix
      : '',
    formattedSuffix = `${largeNumSuffix}${suffix ? suffix : ''}`

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(Number(event.target.value))
  }

  const onMouseUp = (event: React.ChangeEvent<HTMLInputElement>) => {
    callout?.(event.target.value)
  }

  const inputProps = {
    className: styles.slider,
    name: 'slider',
    type: 'range',
    min: min,
    max: max,
    value: value,
    step: step,
    onChange: onChange,
    onMouseUp: () => onMouseUp,
    style: { width },
  }

  return (
    <>
      <FormLabel
        label={label}
        tooltip={labelTooltip}
        required={required}
        rightLabel={rightLabel}
      />
      <div className={styles.container}>
        {tooltip ? (
          <Tooltip position={'bottom'} {...tooltip}>
            <input {...inputProps} />
          </Tooltip>
        ) : (
          <input {...inputProps} />
        )}
        <span className={styles.value}>
          <NumericFormat
            value={formattedNumber}
            displayType='text'
            thousandSeparator
            suffix={formattedSuffix}
            decimalScale={2}
            prefix={prefix}
          />
        </span>
      </div>
    </>
  )
}

export default Slider
