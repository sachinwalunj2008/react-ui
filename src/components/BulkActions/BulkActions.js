import React from 'react'
import PropTypes from 'prop-types'
import BulkActionsContentDisplay from './BulkActionsContentDisplay'
import { Icon, PopoverAndMobileDrawer, Button } from '../../module'

/**
 * @deprecated This component should not be used. Please use PrimaryActionButton instead.
 **/
const BulkActions = ({
  icon,
  customText,
  children,
  buttonClass,
  customClass = '',
  disabled,
}) => {
  return (
    <div className={`bulk-actions-container animated fadeInUp ${customClass}`}>
      <PopoverAndMobileDrawer
        content={
          <BulkActionsContentDisplay>{children}</BulkActionsContentDisplay>
        }
        tippyProps={{
          placement: 'top',
          className: 'popover-actions',
          maxWidth: 'none',
          appendTo: document.body,
        }}
      >
        <Button
          className={`action-btn ${buttonClass ? buttonClass : ''}`}
          disabled={disabled}
        >
          {customText ? (
            customText
          ) : (
            <Icon
              icon={`${icon ? icon : 'options'}`}
              customClass='bulk-actions-icon'
            />
          )}
        </Button>
      </PopoverAndMobileDrawer>
    </div>
  )
}

export default BulkActions

BulkActions.propTypes = {
  icon: PropTypes.string,
  customText: PropTypes.node,
  children: PropTypes.any,
  buttonClass: PropTypes.string,
  customClass: PropTypes.string,
  disabled: PropTypes.bool,
}
