import React, { useState } from 'react'
import { Icon, Tippy, Button } from '../../module'
import CsvExportMenu from './CsvExportMenu'
import SingleCsv from './SingleCsv'
import styles from './_csv-export.module.scss'

type SingleCsvProps = React.ComponentProps<typeof SingleCsv>

type CsvExportProps = {
  /** The download options that are defined in the SingleCsvProps. Includes `csvName`, `linkName`, `csvData` (if we create the CSV on our end), `csvFormat` (if the backend creates the CSV), and other options. */
  csvDownloadOptions: SingleCsvProps['csv'][]
  /** Determines if this component is shown immediately. A reason why this would be `false` is if we have to wait for an api to finish so that the data will be available for the CSV. This only happens when the frontend generates the CSV and should never be false when the backend generates the CSV. */
  initialDisplay: boolean
  /** Determines when to show the download icon. */
  show: boolean
  /** Boolean value that opens popover even when there is only one download option */
  alwaysShowDropdown?: boolean
  /** Optional custom id for the HTML id attribute that corresponds to the component */
  csvId?: string
  /** Position of the popover */
  position?: 'right' | 'left' | 'middle'
}

const CsvExport = ({
  csvDownloadOptions,
  initialDisplay,
  show,
  alwaysShowDropdown,
  csvId,
  position = 'right',
}: CsvExportProps): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false)
  if (!initialDisplay) {
    return <></>
  } else {
    if (csvDownloadOptions.length > 1 || alwaysShowDropdown) {
      return (
        <Tippy
          placement='bottom'
          content={
            <CsvExportMenu
              options={csvDownloadOptions}
              close={() => setShowOptions(false)}
              csvId={csvId}
            />
          }
          maxWidth='none'
          interactive
          appendTo={document.body}
          visible={showOptions}
          onClickOutside={() => setShowOptions(false)}
          duration={[null, 0]}
        >
          <span>
            <Button as='unstyled' onClick={() => setShowOptions(true)}>
              <Icon icon='download' customClass={styles.iconColor} />
            </Button>
          </span>
        </Tippy>
      )
    } else {
      csvDownloadOptions[0].customClass =
        `animated ${!show ? 'fadeOut' : 'fadeIn'} ` +
        (csvDownloadOptions[0].customClass || '')
      return (
        <SingleCsv
          csv={csvDownloadOptions[0]}
          onlyOption
          hidden={!show}
          csvId={csvId}
        />
      )
    }
  }
}

export default CsvExport

// EXAMPLE OF CSVDOWNLOADOPTIONS

// csvDownloadOptions = [
//    **** (csv 1) ****
//   {
//      **** (used for the menu dropdown when multiple csv's are available) ****
//     linkName: 'Sellers',
//     **** (name of the file that gets downloaded) ****
//     csvName: 'Sellers',
//     **** (used so when csvData fetch is done, element can be selected from DOM and clicked to download) ****
//     hiddenClass: 'bbsellers',
//    **** (if csv download failed - stop spinner/loader) ****
//     csvError: boolean,
//    **** (errorCallback needs to be set back to false once spinner/loader stops so user can retry download if desired) ****
//    errorCallback: () => setError(false)
//     **** (the JSON formatted csv) ****
//     csvData:
//       endOfFeed && sellers.length > 0
//         ? createCsvData(sellers)
//         : csvSellers,
//     **** (if all the data hasn't been fetched - create callout to fetch the data otherwise just immediately download) ****
//     callout: endOfFeed
//       ? element => element.click()
//       : element => {
//           this.getAllSellers(
//             customer.id,
//             startDate,
//             endDate,
//             sortBy ? sortBy : defaultSort,
//             productId,
//             filters,
//             element
//           )
//         }
//   },
//    **** (csv 2) ****
//   {
//      blah blah
//   }
// ]
