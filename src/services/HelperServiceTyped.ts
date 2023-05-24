import { SortByProps } from '../components/SortColumn/SortColumn'
import styles from '../components/TableComponents/_table.module.scss'

export const capitalize = (string: string): string => {
  if (typeof string !== 'string') return ''
  return string.charAt(0)?.toUpperCase() + string.slice(1)
}

export const hasValue = (item: unknown): boolean => {
  return item !== null && item !== undefined
}

export const notEmpty = (item: unknown): boolean => {
  return item !== '' && item !== false && item !== null && item !== undefined
}

export const trimText = (text = '', characterLength: number): string => {
  // Protecting against passing in 0 or negative numbers. Without this check, we could technically have a result of just the ...
  if (characterLength < 1) {
    return text
  }
  return text?.length > characterLength
    ? `${text.substring(0, characterLength).trim()}...`
    : text
}

export const debounce = <T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
): VoidFunction => {
  let timer: NodeJS.Timeout | undefined

  return (...args: T): Promise<U> => {
    if (timer) {
      clearTimeout(timer)
    }
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait)
    })
  }
}

//// Active Cell Class ////
export type ActiveCellClassProps = {
  /** activeName - The key that is active for sorting */
  activeName: string
  /** cells - A single key OR an array of keys that contain the keys for a column cell */
  cells: string | string[]
  /** color - If you want a background color other than light-blue.
   * To use this, you need to create a style in _table.module.scss
   * and pass that class name in as the string */
  color?: string
}

export const activeCellClass = ({
  cells = '',
  activeName,
  color,
}: ActiveCellClassProps): string => {
  const isActive = Array.isArray(cells)
    ? cells.some((key) => key === activeName)
    : cells === activeName

  return isActive ? (color ? styles[color] : styles.lightBlueBackground) : ''
}
//// End Active Cell Class ////

//// Has Sticky Column Style ////
type HasStickyColumnStyleProps = {
  colIndex: number
  stickyLeftColumn?: number
  stickyRightColumn?: number
  tableHeadersLength: number
}

export const hasStickyColumnStyle = ({
  colIndex,
  stickyLeftColumn = 1,
  stickyRightColumn,
  tableHeadersLength,
}: HasStickyColumnStyleProps): string => {
  if (stickyLeftColumn && Number(stickyLeftColumn)) {
    if (Number(stickyLeftColumn) === colIndex) {
      return 'last-sticky-cell-left'
    }
    if (Number(stickyLeftColumn + 1) === colIndex) {
      return styles.extraLeftPadding
    }
  }
  if (Number(stickyRightColumn) === tableHeadersLength - (colIndex - 1)) {
    return 'first-sticky-cell-right ' + styles.extraLeftPadding
  }
  return ''
}

/**
 * List of columns that have string to be sorted, ex: ['seller_name', 'marketplace'];
 * Pattern has determined that alpha-numeric values be sorted opposite to convention so that `desc` is A-Z, 0-9 and `asc` is 9-0, Z-A
 **/
type ColumnsWithStringArray = string[]
/** string format: `prop:value` or `prop:value:lowercase` */
type ParamString = string

export const standardSortParams = (
  sortBy: SortByProps,
  columnsWithStrings?: ColumnsWithStringArray
): ParamString => {
  const lowercase = columnsWithStrings?.includes(sortBy.prop)
    ? `:lowercase`
    : ''
  let sortDirection = sortBy.flip ? 'asc' : 'desc'
  if (columnsWithStrings?.includes(sortBy.prop)) {
    sortDirection = sortBy.flip ? 'desc' : 'asc'
  }
  return `${sortBy.prop}:${sortDirection}${lowercase}`
}

export const largeNumConversion = (
  num?: string | number
): { val: number; suffix?: string } => {
  const absVal = Math.abs(Number(num)),
    lessThanMillion = absVal < 1.0e6

  if (lessThanMillion) {
    return { val: Number(num) }
  }

  const isBillions = absVal >= 1.0e9,
    scale = isBillions ? 1.0e9 : 1.0e6,
    suffix = isBillions ? 'B' : 'M',
    val = Number(num) / scale

  return { val, suffix }
}

// Example output: campaign_types_report => Campaign Types Report
export const snakeCaseToTitle = (string: string): string => {
  return string
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

// Standard time in ms for debounce
export const DEBOUNCE_STANDARD_TIME = 250
