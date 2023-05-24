import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { reduceAndOrAverage } from '../../module'

export const Example = (args: {
  /** Array to reduce / average */
  arr: Record<string, unknown>[]
  /** Name of property to reduce over */
  prop: string
  /** Optional number to average by */
  totalToDivideBy?: number | null
  /** Various extra props to modify result */
  extras?: {
    /** rounds result */
    round?: boolean
    /** floors result */
    floor?: boolean
    /** adds thousand separator to result */
    thousandSeparator?: boolean
    /** number of decimal places to convert to result to */
    toFixed?: number
    /** if data point is a percentage */
    percentage?: boolean
    /** prepend to output string */
    prefix?: string
    /** append to output string */
    suffix?: string
  }
}): JSX.Element => {
  return (
    <>
      Reduced data:{' '}
      {reduceAndOrAverage(
        args.arr,
        args.prop,
        args.totalToDivideBy,
        args.extras
      )}
    </>
  )
}
Example.storyName = 'reduceAndOrAverage'
Example.args = {
  arr: [{ num: 1000 }, { num: 2000 }, { num: 3000 }],
  prop: 'num',
  totalToDivideBy: 3,
  extras: {
    thousandSeparator: true,
    prefix: '$',
  },
}

export default {
  title: 'Helper Functions/reduceAndOrAverage',
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
              import { reduceAndOrAverage } from '@patterninc/react-ui'

              const data = [{num: 1000}, {num: 2000}, {num: 3000}]

              reduceAndOrAverage(data, 'num', 3, {
                thousandSeparator: true,
                prefix: '$',
              })

              Output: '$2,000'
            `}
            description='A function used to reduce and/or average datapoints from data properties.'
            whenToUse={[
              <span key='first-line'>
                <code>reduceAndOrAverage</code> is used when you need to reduce
                and/or average datapoints from a particular data property.
              </span>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
