import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { largeNumConversion } from '../../module'
import { DocsTemplate } from '../../../.storybook'
import OutputForDemo from '../../../.storybook/templates/OutputForDemo'

export const Example = (args: {
  /** The string or number that needs to be passed into this function. */
  num: string | number
}): JSX.Element => {
  const { val, suffix } = largeNumConversion(args.num)
  return (
    <OutputForDemo
      output={
        <span>
          Value: <b>{val}</b> Suffix: <b>{suffix}</b>
        </span>
      }
    />
  )
}
Example.storyName = 'largeNumConversion'
Example.args = {
  num: 1234567,
}

export default {
  title: 'Helper Functions/largeNumConversion',
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
              import { largeNumConversion } from '@patterninc/react-ui'

              largeNumConversion(1234567)

              Output: { val: 1.234567, suffix: 'M'}
            `}
            description='A function used to abbreviate large numbers in order to save space in the UI.'
            whenToUse={[
              <span key='first-line'>
                <code>largeNumConversion</code> is used when you have large
                numbers (in the millions or billions) and you need to abbreviate
                them.
              </span>,
              <span key='second-line'>
                The <code>val</code> and <code>suffix</code> that will be
                returned should be used to format the desired number.
              </span>,
              <i key='third-line'>
                Note: This function will not format the number. The number will
                need to be formatted after getting these converted values.
              </i>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
