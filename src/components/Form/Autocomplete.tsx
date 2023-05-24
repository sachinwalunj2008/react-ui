import React, { Fragment, useState } from 'react'
import Popover from '../Popover/Popover'
import AutocompleteOption from './AutocompleteOption'
import TextInput from './TextInput'
import styles from './_autocomplete-option.module.scss'

type InternalAutocompleteProps<Item> = {
  /** Callback to determine text that's displayed if selected item exists */
  getSelectedText: (selectedOption: Item) => string | number
  /** The callback function for updates to search input */
  onSearchChange: (value: string) => void
  /** The text for searching in the options */
  searchText: string
  /** The callback function when an option is selected */
  onChange: (selectedOption?: Item) => void
  /** Optional callback of the collection of options */
  options?: Item[]
  /** Optional value for the position of the dropdown arrow */
  position?: 'right' | 'left' | 'middle'
  /** Optional value for the direction of the dropdown arrow */
  direction?: 'top' | 'down'
  /** Optional value to determine if input for Autocomplete should automatically focus for typing */
  autoFocus?: boolean
  /** Optional value to display loading UI */
  loading?: boolean
  /** Optional object that's selected */
  selectedItem?: Item
  /** Optional component or string to render as header for dropdown of options */
  headerRender?: string | (() => JSX.Element)
  /** Optional text to display when no options are found */
  noOptionsText?: string
  /** Optional style class for input component */
  inputClassName?: string
  /** Optional style class for input label */
  inputLabelText?: string
  /** Optional placeholder for input UI for Autocomplete */
  placeholder?: string
}

type AutocompleteWithSingleOptionRender<Item> =
  InternalAutocompleteProps<Item> & {
    /**  Callback to determine the value of the key for each option element */
    getKey: (option: Item) => string
    optionRender: (
      option: Item,
      onClick: () => void,
      isSelected: boolean
    ) => JSX.Element | string
    optionsRender?: never
  }

type AutocompleteWithOptionsRender<Item> = InternalAutocompleteProps<Item> & {
  /** Callback to render all options as a component. Cannot use with optionRender */
  optionsRender: (
    handleOptionChange: (option: Item) => void,
    config: {
      options: Item[]
      selectedItem?: Item
    }
  ) => JSX.Element
  getKey?: never
  optionRender?: never
}

type AutocompleteProps<Item> =
  | AutocompleteWithSingleOptionRender<Item>
  | AutocompleteWithOptionsRender<Item>

type OptionsProps<Item> = {
  close: () => void
  handleChange: (item: Item, close: () => void) => void
  optionRender?: (
    option: Item,
    onClick: () => void,
    isSelected: boolean
  ) => JSX.Element | string
  optionsRender?: (
    handleOptionChange: (option: Item) => void,
    config: {
      options: Item[]
      selectedItem?: Item
    }
  ) => JSX.Element
  options?: Item[]
} & Pick<
  AutocompleteProps<Item>,
  'selectedItem' | 'getKey' | 'noOptionsText' | 'searchText'
>

interface HeaderProps {
  headerRender?: string | (() => JSX.Element)
}

function Options<Item>({
  close,
  optionRender,
  optionsRender,
  options,
  selectedItem,
  getKey,
  handleChange,
  noOptionsText,
  searchText,
}: OptionsProps<Item>) {
  if (optionsRender) {
    return optionsRender((option) => handleChange(option, close), {
      options: options ?? [],
      selectedItem,
    })
  }

  if (!options?.length) {
    return (
      <div className={styles.noOptionsWrapper}>
        <span>{noOptionsText || 'No Options Available'}</span>
      </div>
    )
  }

  return (
    <>
      {options.map((option) => {
        const isSelected = selectedItem
            ? getKey?.(option) === getKey?.(selectedItem)
            : false,
          opt = optionRender?.(
            option,
            () => handleChange(option, close),
            isSelected
          )
        if (typeof opt === 'string') {
          return (
            <AutocompleteOption
              key={getKey?.(option)}
              isSelected={isSelected}
              onClick={() => handleChange(option, close)}
              text={opt}
              searchText={searchText}
            />
          )
        }
        return <Fragment key={getKey?.(option)}>{opt}</Fragment>
      })}
    </>
  )
}

function Header({ headerRender }: HeaderProps) {
  if (!headerRender) return null
  if (typeof headerRender === 'string') {
    return (
      <div>
        <span className={styles.headerRender}>{headerRender}</span>
      </div>
    )
  }
  return headerRender()
}

function Autocomplete<Item>({
  getSelectedText,
  onSearchChange,
  searchText,
  onChange,
  position = 'right',
  direction,
  autoFocus,
  loading,
  selectedItem,
  options,
  getKey,
  headerRender,
  optionRender,
  optionsRender,
  noOptionsText,
  inputClassName,
  inputLabelText,
  placeholder,
}: AutocompleteProps<Item>): JSX.Element {
  const handleChange = (item: Item, close: () => void): void => {
      close()
      onChange(item)
    },
    handleTextChange = (value: string | number) => {
      if (selectedItem) {
        onChange()
      }
      onSearchChange(value.toString())
    },
    [isOnFocus, setIsOnFocus] = useState(false)

  return (
    // TODO: convert to PopoverAndMobileDrawer or other non-deprecated component. Autocomplete functionality is coupled to Popover currently
    <Popover
      hideCarat
      position={position}
      fullWidth
      direction={direction}
      // top offset ensures dropdown options do not overlap input
      top={71}
      isTextInputOnFocus={isOnFocus}
      clickRender={() => (
        <TextInput
          autoComplete='off'
          value={
            selectedItem
              ? getSelectedText(selectedItem)?.toString()
              : searchText
          }
          fullWidth
          setIsOnFocus={setIsOnFocus}
          autoFocus={autoFocus}
          callout={(_, value) => handleTextChange(value)}
          classType={inputClassName}
          labelText={inputLabelText}
          placeholder={placeholder}
        />
      )}
    >
      {(close) => (
        <div
          style={{ maxHeight: 250, overflowY: 'auto' }}
          className={styles.optionsStyle}
        >
          <Header headerRender={headerRender} />
          {loading ? (
            <div>
              <span>Loading</span>
            </div>
          ) : (
            <Options
              close={close}
              searchText={searchText}
              noOptionsText={noOptionsText}
              selectedItem={selectedItem}
              options={options}
              optionRender={optionRender}
              optionsRender={optionsRender}
              getKey={getKey}
              handleChange={handleChange}
            />
          )}
        </div>
      )}
    </Popover>
  )
}

export default Autocomplete
