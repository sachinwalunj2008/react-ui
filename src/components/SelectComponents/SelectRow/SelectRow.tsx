import React from 'react'
import { Checkbox, Heading1 } from '../../../module'
import styles from './_select-row.module.scss'

type OptionBase = {
  name: string
}

type SelectRowProps<Option extends OptionBase> = {
  highlightedIndex: number
  index: number
  selectedItems: Option[]
  option: Option
  hasCheckbox?: boolean
}

const SelectRow = <Option extends OptionBase>({
  highlightedIndex,
  index,
  selectedItems,
  option,
  hasCheckbox,
  ...rest
}: SelectRowProps<Option>): JSX.Element => {
  return (
    <li
      className={`${highlightedIndex === index ? 'bgc-light-blue' : ''} ${
        styles.optionRow
      }`}
      {...rest}
    >
      {hasCheckbox && (
        <Checkbox label='' checked={selectedItems.includes(option)} />
      )}
      {selectedItems.includes(option) ? (
        <Heading1 text={option.name} option />
      ) : (
        <span>{option.name}</span>
      )}
    </li>
  )
}

export default SelectRow
