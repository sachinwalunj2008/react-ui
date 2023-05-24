import React, { Component } from 'react'
import { Icon } from '../../module'
import PropTypes from 'prop-types'

/**
 * @deprecated Please do not use this component
 **/
class Confirmation extends Component {
  componentDidMount() {
    let iconContainer = document.querySelector('.confirm-icon')
    if (this.props.text) {
      iconContainer.style.marginTop = '50px'
    }
  }

  render() {
    const { customClasses, icon, children } = this.props
    return (
      <div
        className={`confirmation-container animated fadeIn ${
          customClasses.container ? customClasses.container : ''
        }`}
      >
        <div
          className={`confirmation-bg animated ${
            customClasses.bg ? customClasses.bg : ''
          }`}
        />
        <div
          className={`confirmation animated ${
            customClasses.confirmation ? customClasses.confirmation : ''
          }`}
        >
          {icon && (
            <Icon
              icon={icon}
              customClass={`confirm-icon animated ${
                customClasses.icon ? customClasses.icon : ''
              }`}
            />
          )}
          {children && children}
        </div>
      </div>
    )
  }
}

export default Confirmation

Confirmation.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.element,
  customClasses: PropTypes.object,
}
