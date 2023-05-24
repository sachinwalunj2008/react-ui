import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../module'

/** @deprecated - Please do not use this component. PrimaryActionButton is the standard for this now. */
const Fab = ({
  customClass = '',
  position,
  menu,
  children,
  callout,
  verticalPosition,
  adjustPosition,
}) => {
  let isWebKit = navigator.userAgent.indexOf('AppleWebKit') !== -1
  const [fabPosition, setFabPosition] = useState(
    adjustPosition && isWebKit ? verticalPosition || 125 : 20
  )

  useEffect(() => {
    if (adjustPosition && isWebKit && window.innerWidth < 768) {
      const setPosition = () => {
        let el = document.querySelector('.app-content-layout')
        if (el.scrollHeight - el.scrollTop === el.clientHeight) {
          setFabPosition(20)
        } else {
          setFabPosition(verticalPosition || 125)
        }
      }
      document.addEventListener('scroll', setPosition, true)
      return () => {
        document.removeEventListener('scroll', setPosition, true)
      }
    }
  }, [adjustPosition, isWebKit, verticalPosition])

  return (
    <Button
      as='button'
      styleType='primary'
      className={`fab ${customClass}`}
      style={{
        position: position ? 'absolute' : 'relative',
        [position]: `20px`,
        bottom: `${fabPosition}px`,
      }}
      onClick={callout}
    >
      {menu ? (
        <span className='menu-icon'>
          <span />
          <span />
          <span />
        </span>
      ) : (
        children
      )}
    </Button>
  )
}

export default Fab

Fab.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  customClass: PropTypes.string,
  menu: PropTypes.bool,
  callout: PropTypes.func,
}
