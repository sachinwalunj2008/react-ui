import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { standardSortParams } from '../../module'
import { DocsTemplate } from '../../../.storybook'
import { SortByProps } from '../../components/SortColumn/SortColumn'

export const Example = (args: {
  /** The string that needs to be passed into this function. */
  sortBy: SortByProps
  /** Array of strings. Used to determine which columns have `string` values. */
  columnsWithStrings?: string[]
  /** This prop is for testing purposes only. It is used to update the current column that is being sorted */
  activePropName?: 'name' | 'total_sales' | 'is_active'
}): JSX.Element => {
  const { sortBy, columnsWithStrings, activePropName } = args
  return (
    <>
      {standardSortParams(
        { ...sortBy, prop: activePropName || 'name' },
        columnsWithStrings
      )}
    </>
  )
}
Example.storyName = 'standardSortParams'
Example.args = {
  sortBy: { prop: 'name', flip: false },
  columnsWithStrings: ['name'],
  activePropName: 'name',
}

export default {
  title: 'Helper Functions/standardSortParams',
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
              import { standardSortParams } from '@patterninc/react-ui'

              standardSortParams({prop: 'name', flip: false}, ['name'])
              Output: 'name:asc:lowercase'

              standardSortParams({prop: 'total_sales', flip: false}, ['name'])
              Output: 'total_sales:desc'
            `}
            description='A function used to generate the sort params for an api.'
            whenToUse={[
              <span key='first-line'>
                <code>standardSortParams</code> is used when you need to
                generate the sort params for an api.
              </span>,
              <span key='second-line'>
                The second argument is used to pass in every column in a table
                that is a <code>string</code> value. This is important to
                maintain the expected sort order for columns. If the value in a
                column is <b>not a string</b>, then it does not belong in this
                array. The <code>flip</code> parameter in the{' '}
                <code>sortBy</code> object will be reversed when the column is a
                string. This was a decision made by our UX team on how to
                display columns that are strings.
              </span>,
              <i key='third-line'>
                Note: The second argument is also used to determine when{' '}
                <code>:lowercase</code> gets added to the end of the output
                string. This helps the api to not consider casing when sorting.
              </i>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
