import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { capitalize } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (args: {
  /** The string that needs to be passed into this function. */
  string: string
}): JSX.Element => {
  return <>{capitalize(args.string)}</>
}
Example.storyName = 'capitalize'
Example.args = {
  string: 'hello world!',
}

export default {
  title: 'Helper Functions/capitalize',
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
              import { capitalize } from '@patterninc/react-ui'

              capitalize('hello world!')

              Output: 'Hello world!'
            `}
            description='A function used to capitalize the first character of a string.'
            whenToUse={[
              <span key='first-line'>
                <code>capitalize</code> is used when you only need the first
                character of a string capitalized.
              </span>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
