import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { useIsMobileView } from '../../module'
import { DocsTemplate } from '../../../.storybook'
import OutputForDemo from '../../../.storybook/templates/OutputForDemo'

export const Example = (): JSX.Element => {
  const isMobileView = useIsMobileView()
  return (
    <div>
      <span className='fs-14'>Determines if the display is mobile sized.</span>
      <OutputForDemo
        output={
          <span>
            <b>{isMobileView.toString()}</b>
          </span>
        }
      />
    </div>
  )
}
Example.storyName = 'useIsMobileView'
Example.args = {}

export default {
  title: 'Hooks/useIsMobileView',
  component: Example,
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      page: () => (
        <>
          <DocsTemplate
            code={`
              import { useIsMobileView } from '@patterninc/react-ui'

              const isMobileView = useIsMobileView()

              Output: boolean
            `}
            description='A hook used to determine if the current view is sized for mobile.'
            whenToUse={[
              <span key='first-point'>
                <code>useIsMobileView</code> is a hook that will run anytime the
                page is rerendered.
              </span>,
              <span key='second-point'>
                This hook returns a boolean value; <code>true</code> if the page
                is mobile and <code>false</code> if the page is larger than
                mobile.
              </span>,
              <span key='third-point'>
                Based on <code>useMediaQuery</code> hook with <code>md</code> as
                max breakpoint size.
              </span>,
            ]}
            noArgs
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
