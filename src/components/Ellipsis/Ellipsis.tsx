import React from 'react'
import styles from './_ellipsis.module.scss'

const Ellipsis = (): JSX.Element => {
  return (
    <span className={styles.ellipsis}>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  )
}

export default Ellipsis
