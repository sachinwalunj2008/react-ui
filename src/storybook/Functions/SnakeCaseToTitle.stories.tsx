import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { snakeCaseToTitle } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (args: {
  /** The string that needs to be passed into this function. */
  string: string
}): JSX.Element => {
  return <>{snakeCaseToTitle(args.string)}</>
}
Example.storyName = 'snakeCaseToTitle'
Example.args = {
  string: 'hello_there_world!',
}

export default {
  title: 'Helper Functions/snakeCaseToTitle',
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
              import { snakeCaseToTitle } from '@patterninc/react-ui'

              snakeCaseToTitle('hello_there_world')

              Output: 'Hello There World'
            `}
            description='A function used to convert a string in snake case to title case. The first letter in every word will be capitalized.'
            whenToUse={[
              <span key='first-line'>
                <code>snakeCaseToTitle</code> is helpful when you want to use a{' '}
                <code>key</code> from an object as the display value in the UI.
              </span>,
              <span key='second-line'>
                <i>Note</i>: this only works with strings that are snake case.
                For example: <code>this_is_snake_case</code>.
              </span>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
