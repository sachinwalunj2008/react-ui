import React from 'react'
import { NumericFormat } from 'react-number-format'
import { largeNumConversion } from '../../module'
import styles from './_pill.module.scss'

export const pillColorList = [
  'red',
  'blue',
  'green',
  'purple',
  'medium-purple',
  'dark-purple',
] as const
export type PillColorList = typeof pillColorList[number]

type PillProps = {
  /** Available colors for the Pill */
  color: PillColorList
  /** The number to display inside the Pill */
  number: number
  /** Loading state for the Pill */
  loading?: boolean
}

const Pill = ({ color, number, loading }: PillProps): JSX.Element => {
  const formattedNumber = largeNumConversion(number).val
  return (
    <div className={`${styles.base} ${styles[color]}`}>
      {!loading ? (
        <NumericFormat
          value={formattedNumber}
          displayType='text'
          thousandSeparator
          suffix={largeNumConversion(number).suffix}
          decimalScale={2}
        />
      ) : (
        // Using this instead of `Mdash` because our `Mdash` component does not support the colors that `Pill` needs.
        <span>&mdash;</span>
      )}
    </div>
  )
}

export default Pill
