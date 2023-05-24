import Downshift from 'downshift'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import {
  Heading1,
  Icon,
  PopoverMenu,
  ReportLoader,
  Tooltip,
  trimText,
  WrapMatchingText,
} from '../../module'
import PopoverToggle from '../PopoverToggle/PopoverToggle'
import styles from './_select.module.scss'
import { EmptyState } from '../../module'

const TEXT_LIMIT = 50

const SelectHeader = ({
  header = '',
  secondaryHeader = '',
  secondaryValuePosition = '',
}) => {
  if (!header) {
    return null
  }
  const SecondaryHeader = ({ className }) =>
    secondaryHeader && (
      <span
        className={`dropdown-option-secondary-value ${styles.textTransform} ${className}`}
      >
        {secondaryHeader}
      </span>
    )

  return (
    <li
      className={` dropdown-item has-secondary-value ${styles.selectHeaderStyle} `}
    >
      {secondaryValuePosition === 'before' && (
        <SecondaryHeader className='before' />
      )}
      <span className='dropdown-option-value'>{header}</span>
      {secondaryValuePosition !== 'before' && (
        <SecondaryHeader className='after' />
      )}
    </li>
  )
}

const OptionText = ({ text, match = '', selected = false }) => {
  const newText = trimText(text, TEXT_LIMIT)
  if (selected) {
    return <Heading1 text={newText} />
  }

  if (!match) {
    return newText
  }

  return <WrapMatchingText text={newText} match={match} />
}

const Select = ({
  name,
  optionKeyName,
  options,
  labelText,
  rightLabel,
  customClass,
  isError,
  searchBar,
  optGroup,
  optGroupSections,
  optGroupingKey,
  position,
  clickText,
  onClick,
  defaultText,
  verticalDisplay,
  offset,
  disabled,
  selectedItem,
  secondaryValue,
  viewItem,
  secondaryValuePosition,
  onChange,
  stateName,
  ignoredValues,
  noOptionsText,
  selectAllItem,
  selectAllPrefix,
  selectAllSuffix,
  onBlurCallout,
  required,
  stationary,
  loading,
  dropdownClassName = '',
  onSearchChange,
  header = '',
  secondaryHeader = '',
  highlightMatchText = '',
  fieldToMatch,
  isOpen,
  mobilePopover = false,
  mobileMenuHeaders,
  onOpenChange,
  clickTextCustomClass,
  animationType,
  autoFocus,
  noSplitValueDivider,
  keyValue = 'id',
  viewItemText = 'View',
  popoverCustomStyles = {},
  labelTooltip,
}) => {
  // Grouping of data according to optGroupingKey i.e customer 'state'
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [searchedString, setSearchedString] = useState('')
  const popoverMenuRef = useRef(null),
    dropdownRef = useRef(null)
  const keyWiseGrouping = (optionsData, key) => {
    return optionsData.reduce((result, currentValue) => {
      result[currentValue[key]] = result[currentValue[key]] || []
      result[currentValue[key]].push(currentValue)
      return result
    }, {})
  }
  let formattedData = []
  if (optGroup) {
    //  Data ordering like in given optGroupSections sequence
    let groupedData = keyWiseGrouping(options, optGroupingKey)
    formattedData = optGroupSections.reduce((result, currentValue) => {
      result.push({
        title: currentValue.display,
        data: groupedData[currentValue.value],
      })
      return result
    }, [])
  }

  let highlight = false,
    searchId = `select-component-${name}`,
    popRef = React.createRef()

  const timeoutRef = useRef()
  const stateReducer = (state, changes) => {
    let type = changes.type,
      changeTypes = Downshift.stateChangeTypes

    if (!type && (changes.isOpen === false || changes.isOpen) && onOpenChange) {
      onOpenChange(changes.isOpen)
      return changes
    }

    // clear the search input except for whatever conditions you want to exclude
    if (
      type !== changeTypes.changeInput &&
      type !== changeTypes.itemMouseEnter &&
      type !== changeTypes.keyDownArrowDown &&
      type !== changeTypes.keyDownArrowUp
    ) {
      changes.inputValue = ''
    }
    // send new selected item to parent
    onChange(stateName, changes.selectedItem)
    if (changes.isOpen !== undefined) {
      setOpenMenu(changes.isOpen)
    }

    // set highlighted item on selected item on initial open of dropdown
    if (!highlight) {
      let findMatch = options?.find(
        (o) => o[optionKeyName] === state?.selectedItem?.[optionKeyName]
      )
      changes.highlightedIndex =
        state?.selectedItem && options ? options.indexOf(findMatch) : 0
    } else if (changes.inputValue) {
      changes.highlightedIndex = 0
    }
    if (onBlurCallout && changes.isOpen === false) {
      onBlurCallout(stateName, changes.selectedItem)
    }
    return changes
  }

  const filteredDataFunction = (searchInput) => {
    let inputVal = searchInput.trim().toLowerCase()

    let filteredData = formattedData
      .map((section) => {
        return {
          title: section.title,
          data:
            section?.data?.filter((data) =>
              data[optionKeyName]
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(inputVal)
            ) ?? [],
        }
      })
      .filter((section) => section.data.length > 0)

    return filteredData
  }

  const indexedFilterData = (inputValue) => {
    let itemIndex = 0
    let sectionIndex = 0
    return filteredDataFunction(inputValue)?.reduce((result, currentValue) => {
      result.push({
        id: sectionIndex++,
        title: currentValue.title,
        data: currentValue.data.map((item) => ({
          ...item,
          itemIndex: itemIndex++,
        })),
      })
      return result
    }, [])
  }
  // this determines what string is used as the inputValue
  const itemToString = (item) => {
    return item === null ? '' : item[optionKeyName]
  }

  const scrollIntoView = (item) => {
    let minPos = mobilePopover ? 200 : 140
    if (item) {
      if (!highlight) {
        let myElement = document.querySelector(`.scroll-${item}`),
          topPos = 0
        if (myElement) {
          topPos = myElement.offsetTop - minPos
        }
        setTimeout(() => {
          highlight = true
          if (document.querySelector('.dropdown-options-container')) {
            document.querySelector('.dropdown-options-container').scrollTop =
              topPos
          }
        }, 100)
      }
    } else {
      highlight = true
    }
  }

  const resetHighlight = (isOuterClick) => {
    if (isOuterClick && onOpenChange) {
      onOpenChange(false)
    }
    highlight = false
  }

  const showSecondaryValue = (value) => {
    if (ignoredValues) {
      let lowercaseArr = ignoredValues.map((iv) => {
        return iv.toLowerCase()
      })
      if (!lowercaseArr.includes(value.toLowerCase())) {
        return value
      }
    } else {
      return value
    }
  }
  /**
   * clickable item link used in the opt-group dropdown items
   */
  const viewAction = (e, option, ds) => {
    e.stopPropagation()
    ds.toggleMenu()
    viewItem(option)
  }

  const handleSearchChange = (event) => {
    setSearchedString(event?.target?.value)
    // force the dropdown list to scroll to the top result in desktop view
    if (!mobilePopover && dropdownRef.current) {
      dropdownRef.current.scrollTop = 0
    }

    onSearchChange && onSearchChange(event?.target?.value)
  }

  const currentItem =
    typeof selectedItem === 'object'
      ? selectedItem
      : options?.find((o) => o[fieldToMatch ?? optionKeyName] === selectedItem)

  // Show the dropdown content if the animation is completed. when animation is present
  const showContent = animationType ? animationCompleted : true
  const closeDropdown = (ds) => {
    let menu = document.querySelector('.dropdown-box')
    menu.classList.remove('slideInRight')
    menu.classList.add('slideOutRight')
    timeoutRef.current = setTimeout(() => {
      ds.closeMenu()
    }, 500)
  }

  const setPopoverMenuRef = (ref) => {
    popoverMenuRef.current = ref
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    /**
     * This animation handling is needed to stop the side effect of animation
     * Currently used in the brand selection (responsive) in Predict App.
     */
    if (animationType) {
      if (openMenu) {
        popoverMenuRef.current?.addEventListener('animationend', (event) => {
          if (event.type === 'animationend') {
            setAnimationCompleted(true)
          }
        })
      } else {
        // on close of menu set to false
        setAnimationCompleted(false)
      }
    }

    /**
     * To clear the older currency searched text and resetting to default currrency list
     */
    if (!openMenu && onSearchChange) {
      onSearchChange('')
      setSearchedString('')
    }
  }, [openMenu, animationType, onSearchChange])

  useEffect(() => {
    return () => {
      popoverMenuRef.current?.removeEventListener('animationend', () => {})
    }
  }, [])

  const getNoResultFoundJSX = () => (
    <EmptyState
      primaryText={noOptionsText ?? 'No results found.'}
      background={false}
    />
  )

  return (
    <Downshift
      stateReducer={stateReducer}
      onOuterClick={() => resetHighlight(true)}
      onChange={resetHighlight}
      selectedItem={currentItem}
      itemToString={itemToString}
      initialHighlightedIndex={0}
      ref={popRef}
      isOpen={isOpen}
    >
      {(ds) => {
        return (
          <div className={`select-value ${disabled ? 'disabled' : ''}`}>
            <PopoverToggle
              position={position}
              labelText={labelText}
              rightLabel={rightLabel}
              isError={isError}
              optionKeyName={optionKeyName}
              customClass={customClass}
              downshift={ds}
              clickText={clickText}
              clickTextCustomClass={clickTextCustomClass}
              defaultText={defaultText}
              required={required}
              disabled={disabled}
              labelTooltip={labelTooltip}
              callout={() => {
                if (disabled) {
                  return
                } else {
                  ds.toggleMenu()
                  onClick && onClick()
                }
              }}
            />

            {ds.isOpen ? (
              <PopoverMenu
                downshift={ds}
                position={position}
                verticalDisplay={verticalDisplay}
                customClass={customClass}
                parent={popRef}
                offset={offset}
                selectAllItem={selectAllItem}
                selectAllPrefix={selectAllPrefix}
                selectAllSuffix={selectAllSuffix}
                optionKeyName={optionKeyName}
                hasLabel={labelText}
                stationary={stationary}
                dropdownClassName={dropdownClassName}
                mobilePopover={mobilePopover}
                animationType={animationType}
                setRef={setPopoverMenuRef}
                customStyles={popoverCustomStyles}
              >
                <div>
                  {mobilePopover && (
                    <div className='mobile-popover-header'>
                      {mobileMenuHeaders?.(() => {
                        closeDropdown(ds)
                      })}
                    </div>
                  )}
                  {ds.selectedItem && scrollIntoView(ds.selectedItem.id)}
                  {searchBar && (
                    <div
                      className={`dropdown-search-item-wrapper text-input ${styles.borderRadius}`}
                    >
                      {/* TODO: Use SearchBar. The SearchBar component will need to be udpated to handle the downshift props */}
                      <li
                        id='dropdown'
                        className={`dropdown-search-item ${styles.positionRelative}`}
                      >
                        <input
                          {...ds.getInputProps({
                            id: searchId,
                            className: 'dropdown-search',
                            placeholder: 'Search...',
                            onChange: handleSearchChange,
                            ...(onSearchChange
                              ? { value: searchedString }
                              : {}),
                          })}
                          autoComplete='off'
                          autoFocus={autoFocus ?? true}
                        />
                        <span
                          className={` animated clear-button gray ${
                            styles.searchChange
                          } ${
                            ds?.inputValue ||
                            (onSearchChange && searchedString.length >= 1)
                              ? 'fadeIn visible'
                              : ''
                          }`}
                          onClick={() => {
                            // If onSearchChange received then calls the callback function to clear/reset the current applied filter
                            if (onSearchChange) {
                              onSearchChange('')
                              setSearchedString('')
                            }
                            ds?.getInputProps()?.onChange({
                              target: { value: '' },
                            })
                          }}
                        >
                          Clear
                        </span>
                        <Icon
                          icon='magnifier'
                          customClass='search-icon'
                          size='16px'
                        />
                      </li>
                    </div>
                  )}
                  {!searchBar && (
                    <input
                      {...ds.getInputProps({
                        id: searchId,
                        className: 'dropdown-search',
                        placeholder: 'Search...',
                      })}
                      style={{
                        height: 0,
                        opacity: 0,
                        position: 'absolute',
                        lineHeight: 0,
                        padding: 0,
                      }}
                    />
                  )}
                  <div
                    className={`dropdown-options-container ${
                      optGroup ? 'extra-space' : ''
                    }`}
                    ref={dropdownRef}
                  >
                    <SelectHeader
                      header={header}
                      secondaryHeader={secondaryHeader}
                      secondaryValuePosition={secondaryValuePosition}
                    />
                    {showContent && !loading ? (
                      // ------------------NON SECTION LIST Component-----------------------
                      <>
                        {!optGroup && (
                          <>
                            {options && options.length > 0 && (
                              <>
                                {options
                                  .filter((option) => {
                                    if (!searchBar || onSearchChange) {
                                      return true
                                    } else {
                                      return (
                                        !ds.inputValue ||
                                        option[optionKeyName]
                                          ?.toLowerCase()
                                          .normalize('NFD')
                                          .replace(/[\u0300-\u036f]/g, '')
                                          .includes(ds.inputValue.toLowerCase())
                                      )
                                    }
                                  })
                                  .map((option, index) => {
                                    let currentSelectedItem =
                                      ds.selectedItem &&
                                      option[optionKeyName] ===
                                        ds.selectedItem[optionKeyName]
                                    return (
                                      <li
                                        key={option[keyValue]}
                                        {...ds.getItemProps({
                                          key: option[keyValue],
                                          item: option,
                                          className: `dropdown-item ${
                                            styles.secondaryValue
                                          } scroll-${option.id} ${
                                            secondaryValue
                                              ? `has-secondary-value ${
                                                  noSplitValueDivider
                                                    ? 'no-divider-line'
                                                    : ''
                                                }`.trim()
                                              : ''
                                          } ${
                                            option.customClass
                                              ? option.customClass
                                              : ''
                                          } ${
                                            ds.highlightedIndex === index
                                              ? 'highlighted-row'
                                              : ''
                                          } ${
                                            currentSelectedItem
                                              ? 'selected-item'
                                              : ''
                                          }`,
                                          index,
                                        })}
                                      >
                                        {secondaryValue &&
                                          secondaryValuePosition ===
                                            'before' && (
                                            <span
                                              className={`dropdown-option-secondary-value ${styles.textTransform} before`}
                                            >
                                              {showSecondaryValue(
                                                option[secondaryValue]
                                              )}
                                            </span>
                                          )}
                                        <span className='dropdown-option-value'>
                                          {option[optionKeyName]?.length <=
                                          TEXT_LIMIT ? (
                                            <OptionText
                                              text={option[optionKeyName]}
                                              selected={currentSelectedItem}
                                              match={highlightMatchText}
                                            />
                                          ) : (
                                            <Tooltip
                                              tooltipContent={
                                                option[optionKeyName]
                                              }
                                              position='top'
                                            >
                                              <OptionText
                                                text={option[optionKeyName]}
                                                selected={currentSelectedItem}
                                                match={highlightMatchText}
                                              />
                                            </Tooltip>
                                          )}
                                        </span>
                                        {secondaryValue &&
                                          (secondaryValuePosition === 'after' ||
                                            !secondaryValuePosition) && (
                                            <span
                                              className={`dropdown-option-secondary-value ${styles.textTransform} after`}
                                            >
                                              {showSecondaryValue(
                                                option[secondaryValue]
                                              )}
                                            </span>
                                          )}
                                      </li>
                                    )
                                  })}
                              </>
                            )}
                          </>
                        )}
                        {/* ---------------------------Section / OPTION group Component --------------------------- */}
                        {optGroup &&
                          options.length > 0 &&
                          filteredDataFunction(ds.inputValue).length > 0 && (
                            <>
                              {indexedFilterData(ds.inputValue).map(
                                (section) => {
                                  return (
                                    <div key={section.id}>
                                      <div
                                        className={`group-header-wrapper ${styles.textTransform}`}
                                      >
                                        <div className='group-header'>
                                          {section.title}
                                        </div>
                                      </div>
                                      {section.data.map((data) => {
                                        const index = data.itemIndex
                                        return (
                                          <li
                                            key={data.id}
                                            {...ds.getItemProps({
                                              key: data.id,
                                              item: data,
                                              className: `dropdown-item ${
                                                styles.secondaryValue
                                              } has-section-group ${
                                                !viewItem ? 'no-view-item' : ''
                                              } scroll-${data.id} ${
                                                data.customClass
                                                  ? data.customClass
                                                  : ''
                                              } ${
                                                ds.highlightedIndex === index
                                                  ? 'highlighted-row'
                                                  : ''
                                              }`,
                                              index,
                                            })}
                                          >
                                            <span className='dropdown-option-value'>
                                              {ds.selectedItem &&
                                              data[optionKeyName] ===
                                                ds.selectedItem[
                                                  optionKeyName
                                                ] ? (
                                                <Heading1
                                                  text={data[optionKeyName]}
                                                />
                                              ) : (
                                                data[optionKeyName]
                                              )}
                                            </span>
                                            <span
                                              className={`dropdown-option-secondary-value  ${styles.textTransform} before`}
                                            >
                                              {showSecondaryValue(
                                                data[secondaryValue]
                                              )}
                                            </span>
                                            {viewItem && (
                                              <span
                                                className={`dropdown-item-link ${styles.textTransform} before`}
                                                onClick={(e) => {
                                                  viewAction(e, data, ds)
                                                }}
                                              >
                                                {viewItemText}
                                              </span>
                                            )}
                                          </li>
                                        )
                                      })}
                                    </div>
                                  )
                                }
                              )}
                            </>
                          )}
                        {/* ----END--------------------------Section / OPTION group Component --------------------------- */}
                        {!onSearchChange &&
                          (options?.length === 0 ||
                            (searchBar &&
                              !indexedFilterData(ds?.inputValue)?.length &&
                              options?.filter((option) => {
                                return (
                                  !ds?.inputValue ||
                                  option[optionKeyName]
                                    ?.toLowerCase()
                                    ?.normalize('NFD')
                                    ?.replace(/[\u0300-\u036f]/g, '')
                                    ?.includes(ds.inputValue.toLowerCase())
                                )
                              })?.length === 0)) &&
                          getNoResultFoundJSX()}

                        {onSearchChange && options?.length === 0
                          ? getNoResultFoundJSX()
                          : ''}
                      </>
                    ) : (
                      <div
                        className='dropdown-options-container options-loader'
                        ref={dropdownRef}
                      >
                        <ReportLoader noText noDelay />
                      </div>
                    )}
                  </div>{' '}
                  {/* end map */}
                </div>
              </PopoverMenu>
            ) : (
              resetHighlight()
            )}
            <input type='hidden' name={name} value={ds.selectedItem || ''} />
          </div>
        )
      }}
    </Downshift>
  )
}

export default Select

Select.propTypes = {
  /**
   Name of the select options
  */
  name: PropTypes.string.isRequired,
  optionKeyName: PropTypes.string.isRequired,
  /**
    What the user can select from the dropdown dialog
  */
  options: PropTypes.array.isRequired,
  /**
    Optional label on top of input box
  */
  labelText: PropTypes.string,
  /**
    Optional class for styling
  */
  customClass: PropTypes.string,
  /**
    Optional boolean for showing error styling on input box
  */
  isError: PropTypes.bool,
  /**
    Optional search bar within options dropdown
  */
  searchBar: PropTypes.bool,
  /**
    Optional position for the dropdown box
  */
  position: PropTypes.oneOf(['left', 'right', 'middle']),
  /**
    Optional value for input box
  */
  clickText: PropTypes.any,
  /**
    Optional initial value for input box before selection
  */
  defaultText: PropTypes.any,
  /**
    Optional for flow of options in dropdown
  */
  verticalDisplay: PropTypes.oneOf(['up', 'down']),
  /**
    Optional value for extra distance from window's edge to display dropdown options
  */
  offset: PropTypes.number,
  /**
    Optional value to disable selecting
  */
  disabled: PropTypes.bool,
  /**
    The currently selected item
  */
  selectedItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool,
  ]),
  /**
    Additional value in an option
  */
  secondaryValue: PropTypes.any,
  /**
    Display additional value before or after primary value
  */
  secondaryValuePosition: PropTypes.oneOf(['before', 'after']),
  /**
    Callback when the selected item changes
  */
  onChange: PropTypes.func.isRequired,
  /**
    Optional callback when input box is clicked on
  */
  onClick: PropTypes.func,
  /**
    Optional callback for search input
  */
  onSearchChange: PropTypes.func,
  /**
    Optional attribute name for value in state object
  */
  stateName: PropTypes.string,
  /**
    Optional collection of values to not display for secondary option value
  */
  ignoredValues: PropTypes.any,
  /**
    Optional string to display when no search results are found
  */
  noOptionsText: PropTypes.string,
  /**
    Optional string to display in options for select all
  */
  selectAllItem: PropTypes.any,
  /**
    Optional prefix to insert in front of Select All option name
  */
  selectAllPrefix: PropTypes.string,
  /**
    Optional suffix to add end of Select All option name
  */
  selectAllSuffix: PropTypes.string,
  /**
    Optional callback when focus on Select is lost
  */
  onBlurCallout: PropTypes.func,
  /**
    Optional boolean to display styling for required input
  */
  required: PropTypes.bool,
  /**
    Optional boolean to dictate whether dropdown box should adjust to window
  */
  stationary: PropTypes.bool,
  /**
    Optional boolean to display loading state
  */
  loading: PropTypes.bool,
  /**
    Optional boolean indicate if option grouping is required - see related 'opt' props
  */
  optGroup: PropTypes.bool,
  /**
    Optional collection of group sections
  */
  optGroupSections: PropTypes.array,
  /**
    Optional grouping key to aggregate option data
  */
  optGroupingKey: PropTypes.string,
  /**
    Optional callback and UI for optGroup to view the item instead of selecting
  */
  viewItem: PropTypes.func,
  /**
    Optional header for dropdown box of options
  */
  header: PropTypes.string,
  /**
    Optional secondary header for dropdown box of options
  */
  secondaryHeader: PropTypes.string,
  /**
    Optional text to highlight matching option text
  */
  highlightMatchText: PropTypes.string,
  /**
    Optional text to match current item (as opposed to selected item)
  */
  fieldToMatch: PropTypes.string,
  /**
    Optional boolean to indicate whether Select component is opened or closed
  */
  isOpen: PropTypes.bool,
  /**
    Optional callback when any change occurs while dropdown options are open
  */
  onOpenChange: PropTypes.func,
  /**
    Optional style class for click text
  */
  clickTextCustomClass: PropTypes.string,
  /**
    Optional animation class for dropdown box appearance
  */
  animationType: PropTypes.string,
  /**
    Optional boolean to inidicate if input box should recieve focus first
  */
  autoFocus: PropTypes.bool,
  /**
    Optional boolean to decide to include divider line in case of secondary option
  */
  noSplitValueDivider: PropTypes.bool,
  /**
    Optional boolean to indicate if dropdown box should optimize for mobile
  */
  mobilePopover: PropTypes.bool,
  /**
    Optional callback to render mobile menu header with parameter to close dropdown
  */
  mobileMenuHeaders: PropTypes.func,
  /**
    Optional tooltip added to the label
    */
  labelTooltip: PropTypes.func,
  /**
   * Optional label to the top right of the select
   * */
  rightLabel: PropTypes.node,
}
