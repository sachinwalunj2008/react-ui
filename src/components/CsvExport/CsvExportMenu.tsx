import React from 'react'
import SingleCsv from './SingleCsv'
import styles from './_csv-export.module.scss'

type SingleCsvProps = React.ComponentProps<typeof SingleCsv>

type CsvExportMenuProps = {
  options: SingleCsvProps['csv'][]
  close: () => void
  customClass?: string
  csvId?: string
}

const CsvExportMenu = ({
  options,
  close,
  customClass = '',
  csvId,
}: CsvExportMenuProps): JSX.Element => {
  return (
    <div className={customClass}>
      <div className={styles.downloadOptions}>
        {options.map((e) => {
          return (
            <SingleCsv csv={e} key={e.csvName} close={close} csvId={csvId} />
          )
        })}
      </div>
    </div>
  )
}

export default CsvExportMenu
