import React from 'react'
import { MdashCheck } from '../../module'
import styles from './_label-data.module.scss'

export type LabelAndDataProps = {
  /** Content to show as label. */
  label: React.ReactNode
  /** Boolean to decide whether to show data. */
  check: boolean
  /** Optional children element can be added */
  children?: React.ReactNode
  /** Optional class for data. */
  customClass?: string
  /** Optional class for label. */
  labelClass?: string
  /** Content to show in data. */
  data: React.ReactNode
}
export default function LabelAndData({
  label,
  data,
  check,
  children,
  customClass = '',
  labelClass = '',
}: LabelAndDataProps): JSX.Element {
  return (
    <span className={styles.labelAndData}>
      <label className={labelClass}>{label}</label>
      <MdashCheck check={!!check} customClass={customClass}>
        <span className={customClass}>{data}</span>
      </MdashCheck>
      {children}
    </span>
  )
}
