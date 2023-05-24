import React from 'react'
import PropTypes from 'prop-types'
import styles from './_graph-loading.module.scss'

// Default to go off of
const smallSize = 130,
  largeSize = 250

let mainHeight, fakeLineSpread, sectionHeight

const GraphLoading = ({ size, height, lineCustomHeight = 0 }) => {
  if (height) {
    mainHeight = height - 40
    fakeLineSpread = height - 60
    sectionHeight = height - 100
  } else {
    switch (size) {
      case 'large':
        mainHeight = largeSize + 30
        fakeLineSpread = largeSize
        sectionHeight = largeSize - 80
        break
      case 'small':
        mainHeight = smallSize + 30
        fakeLineSpread = smallSize
        sectionHeight = smallSize - 80
        break
      default:
        mainHeight = largeSize + 30
        fakeLineSpread = largeSize
        sectionHeight = largeSize - 80
    }
  }

  return (
    <div className={styles.graphLoadingContainer}>
      <main style={{ height: mainHeight }} className={styles.main}>
        <div className={styles.fakeLinesContainer}>
          <div
            style={{
              height: lineCustomHeight ? lineCustomHeight : fakeLineSpread,
            }}
            className={styles.fakeLines}
          >
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
          </div>
          <div
            style={{
              height: lineCustomHeight ? lineCustomHeight : fakeLineSpread + 10,
            }}
            className={`${styles.fakeYaxisBoxes} fadify`}
          >
            <span className={`${styles.yTick} delay-1`} />
            <span className={`${styles.yTick} delay-2`} />
            <span className={`${styles.yTick} delay-3`} />
            <span className={`${styles.yTick} delay-4`} />
            <span className={`${styles.yTick} delay-5`} />
          </div>
        </div>
        <section
          className={styles.sectionWave}
          style={{ height: sectionHeight }}
        >
          {size === 'small' || (height && height <= 130) ? (
            <svg width='100%' height='100%' viewBox='0 0 500 100' version='1.1'>
              <g
                id='Page-1'
                stroke='none'
                strokeWidth='1'
                fill='none'
                fillRule='evenodd'
                strokeLinecap='round'
              >
                <path
                  className={`${styles.dash} dash_4`}
                  d='M16,16 C76.235,16 77.932,77 138.167,77 C198.402,77 198.402,16 260.333,16 C320.568,16 322.265,77 382.5,77 C442.735,77 442.735,16 504.667,16 C564.902,16 566.598,77 626.833,77 C687.068,77 687.068,16 749,16 C809.235,16 810.932,77 871.167,77 C931.402,77 931.402,16 993.333,16 C1053.568,16 1055.265,77 1115.5,77 C1175.735,77 1175.735,16 1237.667,16 C1297.902,16 1299.598,77 1359.833,77 C1420.068,77 1420.068,16 1482,16 C1542.235,16 1543.932,77 1605.864,77 C1666.099,77 1666.099,16 1728.031,16 C1788.266,16 1789.963,77 1851.895,77 C1912.13,77 1912.13,16 1974.062,16'
                  id='wave'
                  strokeWidth='4'
                />
              </g>
            </svg>
          ) : (
            <svg
              width='100%'
              height='100%'
              viewBox='100 0 1000 100'
              version='1.1'
            >
              <g
                id='Page-1'
                stroke='none'
                strokeWidth='1'
                fill='none'
                fillRule='evenodd'
                strokeLinecap='round'
              >
                <path
                  className={`${styles.dash} dash_4`}
                  d='M16,16 C76.235,16 77.932,77 138.167,77 C198.402,77 198.402,16 260.333,16 C320.568,16 322.265,77 382.5,77 C442.735,77 442.735,16 504.667,16 C564.902,16 566.598,77 626.833,77 C687.068,77 687.068,16 749,16 C809.235,16 810.932,77 871.167,77 C931.402,77 931.402,16 993.333,16 C1053.568,16 1055.265,77 1115.5,77 C1175.735,77 1175.735,16 1237.667,16 C1297.902,16 1299.598,77 1359.833,77 C1420.068,77 1420.068,16 1482,16 C1542.235,16 1543.932,77 1605.864,77 C1666.099,77 1666.099,16 1728.031,16 C1788.266,16 1789.963,77 1851.895,77 C1912.13,77 1912.13,16 1974.062,16'
                  id='wave'
                  strokeWidth='4'
                />
              </g>
            </svg>
          )}
        </section>
        <div
          className={`${styles.fakeXaxisBoxes} fadify ${styles.fakeLinesContainer}`}
        >
          <span className={`${styles.xTick} delay-1`} />
          <span className={`${styles.xTick} delay-2`} />
          <span className={`${styles.xTick} delay-3`} />
          <span className={`${styles.xTick} delay-4`} />
          <span className={`${styles.xTick} delay-5`} />
        </div>
      </main>
    </div>
  )
}
export default GraphLoading

GraphLoading.propTypes = {
  size: PropTypes.string,
  height: PropTypes.number,
  lineCustomHeight: PropTypes.number,
}
