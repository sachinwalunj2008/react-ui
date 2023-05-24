import React, { Component } from 'react'

/**
 * @deprecated The component should not be used and will be removed
 **/
class ClickedOutside extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.clicked()
    }
  }

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>
  }
}

export default ClickedOutside
