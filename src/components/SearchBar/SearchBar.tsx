import React, { forwardRef, useState } from 'react'
import {
  Button,
  TextInput,
  Icon,
  notEmpty,
  DEBOUNCE_STANDARD_TIME,
  useMediaQuery,
} from '../../module'
import styles from './_search-bar.module.scss'

type SearchBarProps = {
  /** The value to be passed into the `SearchBar` */
  value: string
  /** The function that will update the `value` */
  onChange: (searchInputText: string) => void
  /** Optionally add a debounce in milliseconds. The default time is DEBOUNCE_STANDARD_TIME (250ms) */
  debounce?: number
  /** Optionally start with the `SearchBar` in a focused state */
  autoFocus?: boolean
  /** `SearchBar` placeholder text. The default placeholder is "Search" */
  placeholder?: string
  /** Optionally add a keyUp callout to perform */
  keyUpCallout?: () => void
  /** Optionally pass in a minimum width to make the `SearchBar` wider. The default `minWidth` is 300px.
   ** NOTE: This override only applies to tablet and desktop. It should only be used if UX needs to make the `SearchBar` minimum width something other than 300px. */
  minWidth?: number
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      onChange,
      debounce = DEBOUNCE_STANDARD_TIME,
      autoFocus,
      placeholder = 'Search',
      keyUpCallout,
      minWidth = 300,
    }: SearchBarProps,
    ref
  ): JSX.Element => {
    const isLargerThanMobile = useMediaQuery({ type: 'min', breakpoint: 'md' }),
      [focus, setFocus] = useState(false)

    return (
      <div
        className={styles.container}
        style={{
          ...(minWidth && isLargerThanMobile ? { minWidth } : {}),
        }}
      >
        <Icon icon='magnifier' size='16px' customClass={styles.searchIcon} />
        <TextInput
          value={value}
          callout={(_, value) => {
            onChange(value.toString())
          }}
          placeholder={placeholder}
          classType={`${styles.input} ${notEmpty(value) ? styles.hasText : ''}`}
          debounce={debounce}
          autoFocus={autoFocus}
          ref={ref}
          setIsOnFocus={(isOnFocus) => {
            setFocus(isOnFocus)
          }}
          keyUp={keyUpCallout}
        />
        {notEmpty(value) && (
          <Button
            as='unstyled'
            className={styles.buttonForXIcon}
            onClick={() => onChange('')}
          >
            <Icon
              icon='x'
              size='14px'
              customClass={`${styles.xIcon} ${focus ? styles.focused : ''}`}
            />
          </Button>
        )}
      </div>
    )
  }
)

export default SearchBar
