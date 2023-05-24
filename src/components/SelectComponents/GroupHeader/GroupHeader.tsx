import React from 'react'
import styles from './_group-header.module.scss'

type GroupHeaderProps = {
  headerText: string
}

const GroupHeader = ({ headerText }: GroupHeaderProps): JSX.Element => {
  return <div className={styles.container}>{headerText}</div>
}

export default GroupHeader
