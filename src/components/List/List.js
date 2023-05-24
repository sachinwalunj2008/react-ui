import React from 'react'
import PropTypes from 'prop-types'

/** @deprecated Use Table component */
const List = ({ children, customClass = '' }) => {
  return (
    <div className={`standard-list ${customClass}`}>
      <ul className='list'>{children}</ul>
    </div>
  )
}

export default List

List.propTypes = {
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
}
