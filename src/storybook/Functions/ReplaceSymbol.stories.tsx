import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { replaceSymbol } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (args: {
  /** The string that needs to be passed into this function. */
  text: string
  /** The new string to replace the `characterToReplace`. */
  newCharacter: string
  /** The new string that needs to be replaced. */
  characterToReplace: string
  /** Option to prevent the use of `capitalize` (used in this function) and keep the casing of the string passed into `text`. */
  keepCasing?: boolean
}): JSX.Element => {
  const { text, newCharacter, characterToReplace, keepCasing } = args
  return (
    <>{replaceSymbol(text, newCharacter, characterToReplace, keepCasing)}</>
  )
}
Example.storyName = 'replaceSymbol'
Example.args = {
  text: 'hello_world',
  newCharacter: ' ',
  characterToReplace: '_',
}

export default {
  title: 'Helper Functions/replaceSymbol',
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
              import { replaceSymbol } from '@patterninc/react-ui'

              replaceSymbol('hello_world', ' ', '_')

              Output: 'Hello World'
            `}
            description='A function used to replace a character in a string with another character. This can be helpful when using a key in an object as some type of label.'
            whenToUse={[
              <span key='first-line'>
                <code>replaceSymbol</code> is used when you want to replace a
                single character in a string.
              </span>,
              <i key='second-line'>
                Note: This function can easily be broken and used for purposes
                other than what it was intended to be used for. We plan to
                create a new function to replace this one.
              </i>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
