import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '../../module'

/**
 * @deprecated Please do not use this. These were meant to be used with Lists, but those are being deprecated.
 **/
const StickyHeaderSort = ({
  header,
  defaultSort,
  options,
  setSortBy,
  redText,
  listLength,
  downloads,
  optGroup,
  optGroupingKey,
  optGroupSections,
  customClass = '',
}) => {
  return (
    <div
      className={`sticky-header-sort ${customClass} flex justify-content-between full-width`}
    >
      <h2 className={`title animated fadeInLeft ${redText ? 'red' : ''}`}>
        {header}
      </h2>
      {options && (
        <div className='sort-by-container animated fadeInRight'>
          {downloads && downloads}
          {listLength > 3 && (
            <>
              <span className='text-by-dropdown margin-right'>Sort By</span>
              <Select
                name='sortBy'
                selectedItem={defaultSort}
                position={'right'}
                options={options}
                optionKeyName='text'
                stateName={'sortBy'}
                customClass={''}
                onChange={setSortBy}
                optGroup={optGroup}
                optGroupingKey={optGroupingKey}
                optGroupSections={optGroupSections}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default StickyHeaderSort

StickyHeaderSort.propTypes = {
  header: PropTypes.any,
  defaultSort: PropTypes.object,
  options: PropTypes.array,
  setSortBy: PropTypes.func,
  listLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  redText: PropTypes.bool,
}
