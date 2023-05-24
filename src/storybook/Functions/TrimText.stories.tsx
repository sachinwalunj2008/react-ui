import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { trimText } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (args: {
  /** The text you want to display. */
  text: string
  /** The number of characters you want to display before the ellipsis is shown. */
  characterLength: number
}): JSX.Element => {
  return <>{trimText(args.text, args.characterLength)}</>
}
Example.storyName = 'trimText'
Example.args = {
  text: 'Hello World!',
  characterLength: 2,
}

export default {
  title: 'Helper Functions/trimText',
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
              import { trimText } from '@patterninc/react-ui'

              trimText('Hello World!', 2)

              Output: 'He...'
            `}
            description={`A function used to show some a portion of text then followed by an ellipsis (...).`}
            whenToUse={[
              <span key='first-line'>
                <code>trimText</code> is mostly used to trim long text.
              </span>,
              <span key='second-line'>
                The second argument value should not be greater than the text
                length.
              </span>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
