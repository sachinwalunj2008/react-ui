import React from 'react'
import { useMediaQuery, Icon, Button } from '../../module'
import { ToastContainer, Slide } from 'react-toastify'

const PatternToastContainer = (): JSX.Element => {
  const isMobileView = useMediaQuery({ type: 'max', breakpoint: 'sm' })

  return (
    <ToastContainer
      position='top-center'
      autoClose={3000}
      closeButton={({ closeToast }) => (
        <Button as='unstyled' onClick={closeToast}>
          <Icon icon='x' size='12px' />
        </Button>
      )}
      closeOnClick={isMobileView} // Can close on tap if on mobile
      draggable={isMobileView} // Can swipe to close in mobile
      pauseOnHover
      pauseOnFocusLoss // when leaving the window, the timeout of the toast will pause until window is in focus again
      hideProgressBar // by default, there is a progress bar to show when the toast when close
      transition={Slide}
    />
  )
}

export default PatternToastContainer
