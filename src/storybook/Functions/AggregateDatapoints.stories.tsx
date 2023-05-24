import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { aggregateDatapoints } from '../../module'

export const Example = (args: {
  /** Data that needs to be aggregated */
  data: Record<string, unknown>[]
  /** Name of property to aggregate */
  propName: string
}): JSX.Element => {
  return <>Aggregated data: {aggregateDatapoints(args.data, args.propName)}</>
}
Example.storyName = 'aggregateDatapoints'
Example.args = {
  data: [{ num: 1 }, { num: 2 }, { num: 3 }],
  propName: 'num',
}

export default {
  title: 'Helper Functions/aggregateDatapoints',
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
              import { aggregateDatapoints } from '@patterninc/react-ui'

              const data = [{num: 1}, {num: 2}, {num: 3}]

              aggregateDatapoints(data, 'num')

              Output: 6
            `}
            description='A function used to aggregate datapoints from data properties.'
            whenToUse={[
              <span key='first-line'>
                <code>aggregateDatapoints</code> is used when you need to
                aggregate datapoints from a particular data property.
              </span>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
