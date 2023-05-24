import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { errorCheck } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (args: {
  /** The error code received. */
  errorCode: number
  /** The callback to handle the error */
  callback: () => void
  /** Optional value to pass back to the callback */
  value?: string
}): JSX.Element => {
  return (
    <>
      Check console for output.
      {errorCheck(args.errorCode, args.callback, args.value)}
    </>
  )
}
Example.storyName = 'errorCheck'
Example.args = {
  errorCode: 503,
  callback: (value: string) => console.log('callback', value),
}

export default {
  title: 'Helper Functions/errorCheck',
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
              import { errorCheck } from '@patterninc/react-ui'

              errorCheck(503, (value: string) => console.log('callback', value), 'value')

              Output to console: 'value'
            `}
            description='A function used to act on an error from an api.'
            whenToUse={[
              <span key='first-line'>
                <code>errorCheck</code> is used when you need to handle an api
                error.
              </span>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
