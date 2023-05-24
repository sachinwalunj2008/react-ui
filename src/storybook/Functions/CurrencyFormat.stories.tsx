import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { currencyFormat } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (args: {
  /** The value that needs to be converted. */
  value: number
  /** Number of decimal places. If not set, this will default to 2. */
  toFixed?: number
}): JSX.Element => {
  const { value, toFixed } = args
  return <>{currencyFormat(value, toFixed)}</>
}
Example.storyName = 'currencyFormat'
Example.args = {
  value: 12345,
  toFixed: 1,
}

export default {
  title: '[Deprecated]/Helper Functions/currencyFormat',
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
              import { currencyFormat } from '@patterninc/react-ui'

              currencyFormat(12345, 1)

              Output: 12,345.0
            `}
            description={
              <span>
                <code>currencyFormat</code> is used when you need to format a
                number. It is meant to be used for currencies, but has{' '}
                <b>
                  <i>no currency options built into this function</i>
                </b>
                .
              </span>
            }
            whenToUse={[
              `This function is not helpful and is misleading as it does not have any currency logic associated with it.`,
              `We need to have this function have the ability to format the value with currency code and symbol.`,
            ]}
            deprecated
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
