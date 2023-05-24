import React, { useState, useRef } from 'react'
import { CSVLink } from 'react-csv'
import DownloadLoader from '../Loaders/DownloadLoader/DownloadLoader'
import { hasValue, IconStringList, Button, Icon } from '../../module'
import styles from './_single-csv.module.scss'

type CsvFormat<CsvParams> = {
  /** Api to get the CSV data */
  api: (
    apiArg?: string | number | undefined | unknown,
    csvParams?: unknown
  ) => Promise<Blob>
  /** Optional api arguments */
  apiArg?: string | number | unknown
  /** Api parameters to be passed in for response filtering */
  params: CsvParams
  /** Optional async downloading. This is useful if the CSV download takes a long time to generate. */
  asyncDownload?: boolean
  /** Optional callout after clicking on the csv link */
  callout?: () => void
}

type CSV<CsvItem extends Record<string, unknown>, CsvParams, HeaderItem> =
  | CsvFormatType<CsvParams>
  | CsvDataType<CsvItem, HeaderItem>

type CsvBase = {
  /** CSV name to be displayed on the downloaded spreadsheet */
  csvName: string
  /** Link name to be displayed in the UI */
  linkName: string
  /** Optional file type for CSV */
  ['xls_file']?: 'xls' | 'csv'
  /** Optional boolean to let us know if there was an error in the consuming component */
  error?: boolean
  /** If there was an error, then we would want to alert the consuming component with this callback */
  errorCallback?: () => void
  /** Optional className */
  customClass?: string
  /** Optional button className */
  btnCustomClass?: string
  /** @deprecated - Optional prop to show a button instead of a link - this should not be used. */
  variant?: 'button'
  /** Optional icon to use instead of the default `download` icon. */
  icon?: IconStringList
}

type CsvDataType<
  CsvItem extends Record<string, unknown>,
  HeaderItem
> = CsvBase & {
  /** Formatted CSV data. This data is generated on the consuming component and passed in. */
  csvData: CsvItem[]
  csvFormat?: never
  /** Optional callout after clicking the csv link */
  callout?: (link?: HTMLDivElement | string) => void
  /** Optional headers to be passed into the CSV */
  headers?: HeaderItem[]
  /** Optional className for the csv link */
  hiddenClass?: string
}

type CsvFormatType<CsvParams> = CsvBase & {
  csvData?: never
  /** This will generate a CSV by utilizing an api. Not generated on the front end. */
  csvFormat: CsvFormat<CsvParams>
}

type SingleCsvProps<
  CsvItem extends Record<string, unknown>,
  CsvParams,
  HeaderItem
> = {
  /** Determines how the CSV will be generated. */
  csv: CSV<CsvItem, CsvParams, HeaderItem>
  /** Optional close function */
  close?: () => void
  /** Optional prop to show just the download icon when a single option exists. */
  onlyOption?: boolean
  /** Optionally hide this component until some condition is met. */
  hidden?: boolean
  /** Optional identifier */
  csvId?: string
  /** Optionally hide the download icon */
  hideIcon?: boolean
}

const SingleCsv = <
  CsvItem extends Record<string, unknown>,
  CsvParams,
  HeaderItem
>({
  csv,
  close,
  onlyOption,
  hidden,
  csvId,
  hideIcon,
}: SingleCsvProps<CsvItem, CsvParams, HeaderItem>): JSX.Element => {
  const [clicked, setClicked] = useState(false)
  const [loading, setLoading] = useState(false)
  const linkElement = useRef()

  if ((csv.csvData && csv.csvData.length > 0 && clicked) || csv.error) {
    if (clicked) {
      setClicked(false)
      if (csv.error && csv.errorCallback) {
        setTimeout(() => {
          csv.errorCallback?.()
        }, 500)
      }
    }
  }

  if (!csv.csvFormat && csv.csvData?.length > 0) {
    const splitCSV = (sep: string | unknown) =>
      typeof sep === 'string' ? sep.replace(/"/g, '""') : sep

    csv.csvData = csv.csvData.map((d) => {
      Object.keys(d).forEach((v: keyof CsvItem) => {
        // @ts-expect-error TypeScript has issues with iterating over an Object
        d[v] = splitCSV(d[v])
      })
      return d
    })
  }

  const getCsvData = () => {
    if (!loading && csv.csvFormat) {
      setLoading(true)
      const csvParams = {
        ...csv.csvFormat?.params,
        format: 'csv',
      }
      let apiCall
      if (hasValue(csv.csvFormat?.apiArg)) {
        apiCall = csv.csvFormat.api(csv.csvFormat?.apiArg, csvParams)
      } else {
        apiCall = csv.csvFormat.api(csvParams)
      }
      apiCall
        .then((response) => {
          if (response && !csv.csvFormat?.asyncDownload) {
            const BOMChar = '\uFEFF'
            const blob = new Blob([BOMChar + response], {
              type: 'text/csv;charset=utf-8;',
            })
            const link = document.createElement('a')
            if (link.download !== undefined) {
              link.setAttribute('href', URL.createObjectURL(blob))
              link.setAttribute(
                'download',
                `${csv.csvName}.${csv['xls_file'] ? 'xls' : 'csv'}`
              )
              link.style.visibility = 'hidden'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }
          }
          csv.csvFormat?.callout?.()
          close?.()
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <React.Fragment>
      <div
        className={`${styles.csvLink} ${
          clicked || hidden ? styles.hidden : ''
        } ${onlyOption ? styles.onlyOption : ''}`}
      >
        <div
          className={`${styles.linkName} ${styles.customDisplay} ${
            csv.customClass || ''
          }`}
          id={csvId || 'link-name'}
          onClick={() => {
            if (!csv.csvFormat) {
              // @ts-expect-error Looking into this error still
              csv.callout?.(linkElement.current?.link)
              setClicked(true)
            }
          }}
        >
          {csv?.variant === 'button' ? (
            <Button
              as='unstyled'
              onClick={csv.csvFormat && getCsvData}
              className={csv.btnCustomClass ? csv.btnCustomClass : ''}
            >
              {csv.linkName}
            </Button>
          ) : (
            !hideIcon && (
              <>
                {csv.csvFormat ? (
                  <Button
                    as='unstyled'
                    onClick={() => {
                      if (!loading) {
                        getCsvData()
                      }
                    }}
                  >
                    {loading ? (
                      <DownloadLoader />
                    ) : (
                      <Icon icon='download' customClass={styles.iconStyles} />
                    )}
                  </Button>
                ) : (
                  <Icon
                    icon={csv.icon ? csv.icon : 'download'}
                    customClass={styles.iconStyles}
                  />
                )}
              </>
            )
          )}
          {!onlyOption ? (
            <span onClick={csv.csvFormat && getCsvData} data-test='link-name'>
              {csv.linkName}
            </span>
          ) : null}
        </div>
        {clicked && (
          <div className={styles.loaderContainer}>
            <DownloadLoader />
            <span>{csv.linkName}</span>
          </div>
        )}
        {!csv.csvFormat && (
          // @ts-expect-error Looking into this error still
          <CSVLink
            data={csv.csvData}
            headers={csv.headers}
            filename={`${csv.csvName}.csv`}
            asyncOnClick={true}
            target='_self'
            onClick={(_, done) => {
              if (csv.csvData.length > 0) {
                if (close) {
                  close()
                }
                done()
              }
            }}
            ref={linkElement}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default SingleCsv
