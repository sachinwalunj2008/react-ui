import React from 'react'
import styles from './_list-loading.module.scss'

export type ListLoadingProps = {
  /** If set to `true`, then 10 rows will be populated. Otherwise, 3 rows will be populated. */
  longList?: boolean
  /** Removes the `slideInUp` animation. Sometimes this is necessary when in small containers because the animation will make this component appear outside of that container. */
  noSlideInUp?: boolean
  /** This is a custom height set for the rows. This will override the default styles so do not do this unless you have a requirement to do so. */
  customHeight?: string
  /** This is a custom grid gap between the rows. This will override the default styles so do not do this unless you have a requirement to do so. */
  customGridGap?: string
  /** This will allow you to set a specific number of rows. This will override the default styles so do not do this unless you have a requirement to do so. */
  numberOfRows?: number
  /** This will allow altering the style of the list loading rows. It is only to be used under the direction of UX. */
  style?: Record<string, unknown>
}

const ListLoading = ({
  longList,
  noSlideInUp,
  customHeight,
  customGridGap,
  numberOfRows,
  style,
}: ListLoadingProps): JSX.Element => {
  const outerDivStyles = {
    '--custom-grid-gap': customGridGap || '12px',
  } as React.CSSProperties

  const innerDivStyles = {
    '--custom-height': customHeight || '48px',
  } as React.CSSProperties

  const numRows = numberOfRows ? numberOfRows : longList ? 10 : 3

  return (
    <div
      className={`${styles.listLoading} ${longList ? styles.longList : ''}`}
      style={outerDivStyles}
    >
      {[...Array(numRows).keys()].map((r) => {
        // The animated and slideInUp classes comes from animate.css. We need to determine if we want to continue to allow that global class or not.
        const animationClasses = `animated ${
          !noSlideInUp ? 'slideInUp' : ''
        } delay-${r}`
        return (
          <div
            className={`${styles.listLoadingRow} ${animationClasses}`}
            key={`list-loading-${r}`}
            style={innerDivStyles}
          >
            <span
              className={styles.innerSpan}
              style={{ ...style, animationDelay: `${0.2 * r}s` }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ListLoading
