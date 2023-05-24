import React, { useState } from 'react'
import { ComponentMeta } from '@storybook/react'
import { Button, usePrevious } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (): JSX.Element => {
  const [value, setValue] = useState(0)
  const previous = usePrevious(value)

  return (
    <div className='flex gap-16 align-items-center'>
      <div>
        <div>Current Value: {value}</div>
        <div>Previous Value: {previous}</div>
      </div>
      <Button onClick={() => setValue(value + 1)}>Increase Current</Button>
    </div>
  )
}
Example.storyName = 'usePrevious'
Example.args = {}

export default {
  title: 'Hooks/usePrevious',
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
              import { usePrevious } from '@patterninc/react-ui'

              const [value, setValue] = useState(0)
              const previous = usePrevious(value)

              Output: Previous value.

              ** The initial value here will be undefined since there is not a previous value yet.
              Once the state {value} gets updated, then the {previous} value will be 0**
            `}
            description='A hook used to get the dimensions of the browser window.'
            whenToUse={[
              <span key='first-line'>
                <code>usePrevious</code> is a hook and will store the previous
                value of a given state. This can be a great tool to compare a
                current and previous value. An example might be using{' '}
                <code>usePrevious</code> to store the previous location pathname
                so that you can take an action if the pathname changes.
              </span>,
            ]}
            noArgs
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
