import { uniqBy } from 'lodash'
import moment from 'moment'
import React from 'react'
import {
  DateRange,
  hasValue,
  Icon,
  ListLoading,
  MultipleSelection,
  Toggle,
} from '../../module'
import FormLabel from '../FormLabel/FormLabel'
import styles from './_filter.module.scss'

const Select = React.lazy(() =>
  import(/* webpackChunkName: "select" */ '../Form/Select')
)
const TextInput = React.lazy(() =>
  import(/* webpackChunkName: "textInput" */ '../Form/TextInput')
)
const ToggleOptions = React.lazy(() =>
  import(
    /* webpackChunkName: "toggleOptions" */ '../ToggleOptions/ToggleOptions'
  )
)
const MultiSelect = React.lazy(() =>
  import(/* webpackChunkName: "multiSelect" */ '../MultiSelect/MultiSelect')
)

const FilterMenu = ({
  states,
  close,
  resetDate,
  onChangeCallout,
  loading,
  children,
  topChildren = false,
}) => {
  const updateFilters = (name, value) => {
    onChangeCallout(name, value)
  }

  const handleInput = (name, value, textInput) => {
    if (!textInput) {
      hasValue(value) && updateFilters(name, value)
    } else {
      updateFilters(name, value)
    }
  }

  const clearInput = (name, clearCallout) => {
    handleInput(name, '', 'textInput')
    clearCallout()
  }

  const handleMultiSelect = (key, name, value, filteredOptions) => {
    let checked = [...states[key].defaultValue],
      configObj = states[key],
      options = filteredOptions || configObj.options,
      optionKeyName = configObj.optionKeyName,
      match = options.find((o) => o[optionKeyName] === name)
    let sender = {}
    if (name === 'all') {
      sender.allCheck = value
      const checkedOptions = options.map((option) => ({
        ...option,
        isChecked: value,
      }))
      checked = uniqBy([...checkedOptions, ...checked], 'id').filter(
        (option) => option.isChecked
      )
    } else {
      sender.allCheck = false
      if (value) {
        checked.push({ ...match, isChecked: value })
      } else {
        let removeIndex = checked.indexOf(match)
        checked.splice(removeIndex, 1)
      }
    }
    sender.defaultValue = checked
    sender.clickText = checked.length
      ? checked.length <= 3
        ? [...checked]
            .map((c) => c[optionKeyName])
            .sort()
            .join(', ')
        : `${checked.length} Selections`
      : states[key]?.defaultClickText
    onChangeCallout(key, sender)
  }

  const handleDates = (start, end, stateName) => {
    onChangeCallout(stateName ?? 'dates', { start_date: start, end_date: end })
  }

  const inputKeyUp = (callout, shouldClose) => {
    if (callout) {
      callout()
    }
    if (shouldClose) {
      close()
    }
  }

  return (
    <>
      {!loading ? (
        <div className={styles.filterMenuStyle}>
          {topChildren && children?.({ close })}
          <React.Suspense fallback={<ListLoading />}>
            {Object.values(states).map((s, i) => {
              if (s?.type === 'select') {
                return (
                  <div
                    className='single-filter select'
                    key={s?.stateName || s?.labelText}
                  >
                    <Select
                      name={s.name ? s.name : ''}
                      labelTooltip={s?.labelTooltip}
                      rightLabel={s?.rightLabel}
                      position={'right'}
                      searchBar={s.searchBar}
                      selectedItem={s.defaultValue}
                      clickText={s.clickText}
                      options={s.options}
                      customClass={`select ${
                        s.customClass ? s.customClass : ''
                      }`}
                      optionKeyName={s.optionKeyName ? s.optionKeyName : 'text'}
                      secondaryValue={s?.secondaryValue}
                      noSplitValueDivider={s.noSplitValueDivider}
                      stateName={Object.keys(states)[i]}
                      onChange={handleInput}
                      selectAllItem={s.selectAllItem}
                      selectAllPrefix={s.selectAllPrefix}
                      stationary
                      labelText={s.labelText}
                      onSearchChange={s.onSearchChange}
                    />
                  </div>
                )
              } else if (s?.type === 'dates') {
                return (
                  <div
                    className='single-filter date'
                    key={s?.stateName || s?.labelText}
                  >
                    <label className={styles.filterDatesStyle}>
                      {s.labelText}
                    </label>
                    <DateRange
                      selected
                      placement={s.placement}
                      startDate={s.defaultValue.start_date}
                      endDate={s.defaultValue.end_date}
                      specifiedDay={s.specifiedDay}
                      callout={(start, end) =>
                        handleDates(start, end, s.stateName)
                      }
                      position='right'
                      customClass={s.customClass}
                      resetDate={
                        resetDate
                          ? resetDate
                          : () => handleDates('', '', s.stateName)
                      }
                      stationary={s.stationary}
                      showCalendar
                      customClickText={(start, end) => (
                        <div className={styles.customClickText}>
                          {start && end
                            ? `${moment(start).format('MM/DD/YY')} to ${moment(
                                end
                              ).format('MM/DD/YY')}`
                            : 'All'}
                          <Icon icon='calendar' size='14px' />
                        </div>
                      )}
                    />
                  </div>
                )
              } else if (s?.type === 'text') {
                return (
                  <div
                    className='single-filter text-input'
                    key={s?.stateName || s?.labelText}
                  >
                    <TextInput
                      value={s.defaultValue}
                      labelTooltip={s?.labelTooltip}
                      rightLabel={s?.rightLabel}
                      onBlurCallout={s.onBlurCallout ? s.onBlurCallout : null}
                      callout={(name, value) =>
                        handleInput(name, value, 'textInput')
                      }
                      type={s.inputType ? s.inputType : 'text'}
                      stateName={s.stateName}
                      classType={`${s.customClass ? s.customClass : ''}`}
                      labelText={s.labelText}
                      keyUp={() => inputKeyUp(s.keyUp, s.shouldClose)}
                      clear={Boolean(s.clearCallout)}
                      clearCallout={() =>
                        clearInput(s.stateName, s.clearCallout)
                      }
                      placeholder={
                        s?.numberProps?.suffix
                          ? s.placeholder + s?.numberProps?.suffix
                          : s.placeholder
                      }
                      {...(s?.numberProps
                        ? {
                            min: s?.numberProps?.min,
                            max: s?.numberProps?.max,
                            step: s?.numberProps?.step,
                            maxLength: s?.numberProps?.max,
                            onlyWholeNumbers: s?.numberProps?.onlyWholeNumbers,
                            onlyPositiveNumbers:
                              s?.numberProps?.onlyPositiveNumbers,
                          }
                        : {})}
                    />
                  </div>
                )
              } else if (s?.type === 'toggle') {
                return (
                  <div
                    className='single-filter toggle'
                    key={s?.stateName || s?.labelText}
                  >
                    <ToggleOptions
                      options={s.options}
                      labelTooltip={s?.labelTooltip}
                      callout={(val) => handleInput(s?.stateName, val)}
                      stateName={s.stateName}
                      state={s.state}
                      selected={s.defaultValue}
                      customClass={s.customClass}
                      rightLabel={s.rightLabel}
                      labelText={
                        s.secondaryLabelText ? (
                          <span className={styles.secondaryLabelText}>
                            <span>{s.labelText}</span>
                            <span className='fs-12'>
                              {s.secondaryLabelText}
                            </span>
                          </span>
                        ) : (
                          <span>{s.labelText}</span>
                        )
                      }
                    />
                  </div>
                )
              } else if (s?.type === 'multiselect') {
                return (
                  <div
                    className='single-filter multiselect'
                    key={s?.stateName || s?.labelText}
                  >
                    <label className={styles.filterDatesStyle}>
                      {s.labelText}
                    </label>
                    <MultiSelect
                      popoverPosition={s.position || 'right'}
                      clickText={s.clickText}
                      label={s.label}
                      optionKeyName={s.optionKeyName}
                      dropdownLabel={s.dropdownLabel}
                      options={s.options}
                      optGroup={s.optGroup}
                      optGroupSections={s.optGroupSections}
                      checkedItems={s.defaultValue}
                      allCheck={s.allCheck ? ['all'] : []}
                      allCallout={(_, isAllChecked, filteredOptions) => {
                        handleMultiSelect(
                          s.stateName,
                          'all',
                          isAllChecked,
                          filteredOptions
                        )
                      }}
                      callout={(name, value) => {
                        handleMultiSelect(s.stateName, name, value)
                      }}
                      disabledItems={s.disabledItems}
                      wrapperCustomClass={s.wrapperCustomClass || 'select'}
                      dropdownClassName={s.dropdownClassName}
                      selectType={s.selectType}
                      searchBar={s.searchBar}
                      secondaryValue={s.secondaryValue}
                      noOptionsMessage={s.noOptionsMessage}
                    />
                  </div>
                )
              } else if (s?.type === 'multiple-selection') {
                return (
                  <MultipleSelection
                    key={s?.stateName || s?.labelText}
                    options={s.options.map((item) => item[s.optionKeyName])}
                    selectedOptions={s.selectedOptions}
                    callout={(selectedList) => {
                      updateFilters(s.stateName, selectedList)
                    }}
                    selectPlaceholder={s.selectPlaceholder}
                    labelText={s.labelText}
                    searchPlaceholder={s.searchPlaceholder}
                    noListDataText={s.emptyState}
                    labelTooltip={s?.labelTooltip}
                    rightLabel={s?.rightLabel}
                  />
                )
              } else if (s?.type === 'switch') {
                return (
                  <div
                    className='single-filter'
                    key={s?.stateName || s?.labelText}
                  >
                    <FormLabel
                      label={s.labelText}
                      tooltip={s?.labelTooltip}
                      rightLabel={s?.rightLabel}
                    />
                    <Toggle
                      checked={s.defaultValue}
                      callout={(value) => {
                        handleInput(s.stateName, value)
                      }}
                    />
                  </div>
                )
              }
              return null
            })}
          </React.Suspense>
          {!topChildren && children?.({ close })}
        </div>
      ) : (
        <ListLoading />
      )}
    </>
  )
}

export default FilterMenu

// defaultValue in the key value in the parent state that will be passed into each filter type input as the state and maintained value for that filter.
