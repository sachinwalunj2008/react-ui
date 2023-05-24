import React from 'react'
import { Icon, IconStringList } from '../../../module'
import styles from './_download-loader.module.scss'

type DownloadLoaderProps = {
  /** Optionally change the icon */
  customIcon?: IconStringList
  /** Optional className */
  customClass?: string
}
const DownloadLoader = ({
  customIcon = 'refresh',
  customClass = '',
}: DownloadLoaderProps): JSX.Element => {
  return (
    <div className={`${styles.downloadLoaderContainer} ${customClass}`}>
      <Icon icon={customIcon} customClass={styles.rotate} size='20px' />
    </div>
  )
}

export default DownloadLoader
