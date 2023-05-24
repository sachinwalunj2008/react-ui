import React, { useRef } from 'react'
import { ComponentMeta } from '@storybook/react'
import { useShowElement } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (args: { threshold?: number }): JSX.Element => {
  const myRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const refIsVisible = useShowElement(myRef, args.threshold || 0)

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Scroll Me!</h1>
      <div
        style={{
          overflow: 'scroll',
          height: '400px',
        }}
      >
        <div
          className='flex align-items-center justify-content-center bgc-medium-purple fs-18 fw-semi-bold'
          style={{
            height: '600px',
            width: '400px',
          }}
        >
          Part 1 - not visible
        </div>
        <div
          className='flex align-items-center justify-content-center bgc-medium-green fs-18 fw-semi-bold'
          style={{
            height: '600px',
            width: '400px',
          }}
          ref={myRef}
        >
          Part 2 - visible
        </div>
        <div
          className='flex align-items-center justify-content-center bgc-medium-blue fs-18 fw-semi-bold'
          style={{
            height: '600px',
            width: '400px',
          }}
        >
          Part 3 - not visible
        </div>
        {refIsVisible && (
          <div
            className='bgc-medium-red'
            style={{
              position: 'absolute',
              width: '60px',
              height: '60px',
              right: '30px',
              bottom: '250px',
              textAlign: 'center',
            }}
          >
            Hello There!
          </div>
        )}
      </div>
    </div>
  )
}
Example.storyName = 'useShowElement'
Example.args = {
  threshold: 0.1,
}

export default {
  title: 'Hooks/useShowElement',
  component: Example,
  argTypes: {
    threshold: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
  },
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
              import { useShowElement } from '@patterninc/react-ui'

              const myRef = useRef()

              const refIsVisible = useShowElement(myRef, 0.1)
              ...
              <div ref={myRef}>Part of a page</div>
              ...
              {refIsVisible && <div>Element shown conditionally</div>}
            `}
            description='A hook used to conditionally show an element based on if a
            ref is visible on the page.'
            whenToUse={[
              <span key='first-line'>
                <code>useShowElement</code> is a hook and will run anytime the
                ref or threshold change.
              </span>,
              <span key='first-line'>
                This hook is used to conditionally show an element based on if a
                ref is visible on the page. This can be used in tables to show
                the bulk action option only if the table is on the page.
              </span>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
