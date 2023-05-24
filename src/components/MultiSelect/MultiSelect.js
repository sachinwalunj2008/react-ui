import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Popover, Checkbox, capitalize, SearchBar } from '../../module'

/**
 * @deprecated This component does not support the most recent requirements and designs. It should not be used. Use MultipleSelection.
 **/
const MultiSelect = ({
  clickText,
  checkedItems,
  callout,
  options,
  wrapperCustomClass = '',
  dropdownClassName = '',
  showCheckAllBox = true,
  allCallout,
  label,
  optionKeyName,
  dropdownLabel = null,
  disabledItems,
  popoverPosition = 'right',
  optGroup,
  optGroupSections,
  selectType,
  searchBar,
  searchBarPlaceholder = 'Search...',
  checkAllCustomClass = '',
  secondaryValue = '',
  noOptionsMessage = 'No options available',
  noResultsMessage = 'No results found',
  disabledCheckAll,
}) => {
  const [inputValue, setInputValue] = useState(''),
    itemField = options?.[0]?.stateName ?? optionKeyName ?? 'text',
    filteredOptions =
      searchBar && inputValue !== ''
        ? options.filter((o) =>
            o[itemField]
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .includes(inputValue.toLowerCase())
          )
        : options,
    itemFieldMapper = (a) => a[itemField],
    allRenderedItemsChecked = options.length === checkedItems.length

  useEffect(() => {
    filteredOptions?.forEach((option) => {
      if (checkedItems.find((item) => item.id === option.id)) {
        option.isChecked = true
      }
    })
  }, [checkedItems, filteredOptions])

  return (
    <Popover
      position={popoverPosition}
      clickText={clickText}
      customClass={`${wrapperCustomClass} multiselect-container extraItem ${
        secondaryValue ? 'multiselect-second-value' : ''
      }`}
      labelText={dropdownLabel}
    >
      {() => (
        <div className='scroll-container'>
          {searchBar && (
            <div className='dropdown-search-item-wrapper mt-8 px-10 bdrr-4'>
              <SearchBar
                value={inputValue}
                onChange={setInputValue}
                placeholder={searchBarPlaceholder}
                autoFocus
                // Adding the `minWidth` here to prevent the `SearchBar` from being too large in this component. Without this, the `SearchBar` will overflow out of the `MultiSelect` component.
                minWidth={200}
              />
            </div>
          )}
          <div
            className={`checkbox-container py-8 bdrb bdrc-medium-purple ${dropdownClassName}`}
          >
            {filteredOptions.map((e) => {
              const itemText = e[itemField]
              return (
                <div
                  key={itemText}
                  className={`${
                    optGroup
                      ? 'checkbox grid'
                      : `checkbox py-4 px-16 flex ${
                          secondaryValue ? 'grid' : ''
                        }`
                  }`}
                >
                  <Checkbox
                    name={'checkbox'}
                    checked={checkedItems
                      ?.map(itemFieldMapper)
                      ?.includes(itemText)}
                    stateName={itemText}
                    callout={callout}
                    label={label && capitalize(itemText)}
                    disabled={disabledItems
                      ?.map(itemFieldMapper)
                      ?.includes(itemText)}
                    type={selectType}
                    customClass={e?.customClass ?? ''}
                  />
                  {optGroup && optGroupSections[e.optGroupingKey] && (
                    <span className='fs-10 uppercase'>
                      {optGroupSections[e.optGroupingKey]}
                    </span>
                  )}
                  {secondaryValue && (
                    <span className={`checkbox-second-value`}>
                      {e[secondaryValue]}
                    </span>
                  )}
                </div>
              )
            })}
            {filteredOptions.length === 0 && options.length !== 0 && (
              <div>
                <span className='fs-12 message-container'>
                  {noResultsMessage}
                </span>
              </div>
            )}
            {options.length === 0 && (
              <div>
                <span className='fs-12 message-container'>
                  {noOptionsMessage}
                </span>
              </div>
            )}
          </div>
          {showCheckAllBox && (
            <div className='all-checkbox py-8 px-16'>
              <Checkbox
                name={'checkbox'}
                checked={allRenderedItemsChecked}
                stateName={'all'}
                callout={(_, isAllChecked) =>
                  allCallout(_, isAllChecked, filteredOptions)
                }
                label='Check All'
                disabled={
                  disabledCheckAll !== undefined
                    ? disabledCheckAll
                    : disabledItems?.length > 0
                }
                type={selectType}
                customClass={checkAllCustomClass}
              />
            </div>
          )}
        </div>
      )}
    </Popover>
  )
}

export default MultiSelect

MultiSelect.propTypes = {
  allCallout: PropTypes.func,
  checkAllCustomClass: PropTypes.string,
  checkedItems: PropTypes.array,
  callout: PropTypes.func,
  clickText: PropTypes.any,
  disabledCheckAll: PropTypes.bool,
  disabledItems: PropTypes.array,
  dropdownClassName: PropTypes.string,
  dropdownLabel: PropTypes.any,
  label: PropTypes.bool,
  optGroup: PropTypes.bool,
  optGroupSections: PropTypes.any,
  optionKeyName: PropTypes.string,
  options: PropTypes.array,
  popoverPosition: PropTypes.oneOf(['left', 'right', 'middle']),
  searchBar: PropTypes.bool,
  selectType: PropTypes.string,
  showCheckAllBox: PropTypes.bool,
  wrapperCustomClass: PropTypes.string,
}
