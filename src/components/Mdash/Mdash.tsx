import React from 'react'
import styles from './_mdash.module.scss'

type MdashProps = {
  /** Optionally add a class */
  customClass?: string
  /** Optionally use the dark-purple color variation */
  dark?: boolean
}

export default function Mdash({
  customClass = '',
  dark,
}: MdashProps): JSX.Element {
  return (
    <span
      className={`${
        dark ? styles.mdashTextDarkPurple : styles.mdashTextBlue
      } ${customClass}`}
    >
      &mdash;
    </span>
  )
}
