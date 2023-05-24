import React from 'react'
import Scroll from 'react-scroll'
import { Button } from '../../module'
const ScrollLink = Scroll.Link

/**
 * @deprecated This component was used for Lists. Now that we are using Tables, this component is no longer useful.
 **/
const BackToTop = ({
  listLength,
  containerId,
  goTo,
  offset,
}: BackToTopProps): JSX.Element => (
  <>
    {listLength >= 30 && (
      <div className='back-to-top-button'>
        <p>You've reached the end of this page</p>
        <ScrollLink
          to={goTo ? goTo : 'App-content'}
          spy={true}
          smooth={true}
          duration={250}
          containerId={containerId ? containerId : 'app-content-layout'}
          offset={offset || -250}
        >
          <Button as='button' styleType='secondary'>
            Back to Top
          </Button>
        </ScrollLink>
      </div>
    )}
  </>
)

export default BackToTop

type BackToTopProps = {
  /** Number of items in list */
  listLength: number
  /** Optional container id*/
  containerId?: string
  /** Optional string to scroll to different place */
  goTo?: string
  /** How many pixels to offset */
  offset?: number
}
