import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { currencyString } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (args: {
  /** The value that needs to be converted. */
  value: number
}): JSX.Element => {
  const { value } = args
  return <>{currencyString(value)}</>
}
Example.storyName = 'currencyString'
Example.args = {
  value: 12345,
}

export default {
  title: '[Deprecated]/Helper Functions/currencyString',
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
              import { currencyString } from '@patterninc/react-ui'

              currencyString(12345)

              Output: $12,345.00
            `}
            description={
              <span>
                <code>currencyString</code> is used when you need to format a
                number into US currency.{' '}
                <b>It does not handle other currencies.</b>.
              </span>
            }
            whenToUse={[
              `This function is only helpful for US currency, but we handle many currencies.`,
              `We plan to update currencyFormat to handle currency values better.`,
            ]}
            deprecated
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
