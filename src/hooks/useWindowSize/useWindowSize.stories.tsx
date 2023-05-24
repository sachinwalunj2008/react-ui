import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { useWindowSize } from '../../module'
import { DocsTemplate } from '../../../.storybook'
import OutputForDemo from '../../../.storybook/templates/OutputForDemo'

export const Example = (): JSX.Element => {
  const { width, height } = useWindowSize()
  return (
    <div>
      <span className='fs-14'>
        The width and height dimensions of your browser window. Resize this Docs
        window to see the updated values.
      </span>
      <OutputForDemo
        output={
          <span>
            Width: <b>{width}px</b>, Height: <b>{height}px</b>
          </span>
        }
      />
    </div>
  )
}
Example.storyName = 'useWindowSize'
Example.args = {}

export default {
  title: 'Hooks/useWindowSize',
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
              import { useWindowSize } from '@patterninc/react-ui'

              const containerDimensions = useWindowSize()

              Output: { width: number, height: number }
            `}
            description='A hook used to get the dimensions of the browser window.'
            whenToUse={[
              <span key='first-line'>
                <code>useWindowSize</code> is a hook and will run anytime the
                window size is changed.
              </span>,
              <span key='first-line'>
                This hook give you access to the <code>width</code> and{' '}
                <code>height</code> of the browser window.
              </span>,
            ]}
            noArgs
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
