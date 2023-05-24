import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './_report-loader.module.scss'
/**
 * @deprecated Please do not continue to use this loader. UX does not want this used anymore.
 **/
const ReportLoader = ({ noDelay, noText, customClass, loadingMessage }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let timeoutId
    if (noDelay) {
      setLoading(false)
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false)
      }, 500)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [noDelay])

  return (
    <div className={customClass ? customClass : ''}>
      {!loading && (
        <div className={styles.loadingContainer}>
          {!noText && (
            <div className={`${styles.textContainer} animated fadeInDown`}>
              <span className={styles.dark}>
                {`${loadingMessage ? loadingMessage : 'Generating Report.'}`}
                &nbsp;&nbsp;
              </span>
              <span className={styles.light}>This may take a few moments.</span>
            </div>
          )}
          <div className='animated fadeInUp'>
            <div className={styles.reportLoader}>
              <div className={styles.dots}></div>
              <div className={styles.dots}></div>
              <div className={styles.dots}></div>
              <div className={styles.dots}></div>
              <div className={styles.dots}></div>
              <div className={styles.dots}></div>
              <div className={styles.dots}></div>
              <div className={styles.dots}></div>
              <div className={styles.dots}></div>
              <div className={styles.dots}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportLoader

ReportLoader.propTypes = {
  noDelay: PropTypes.bool,
  noText: PropTypes.bool,
  customClass: PropTypes.string,
  loadingMessage: PropTypes.node,
}
