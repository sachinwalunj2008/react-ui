import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { percentageString } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (args: {
  /** The string or number that needs to be passed into this function. */
  percent: number
  decimalScale?: boolean
  csvString?: boolean
}): JSX.Element => {
  const { percent, decimalScale, csvString } = args
  return <>{percentageString(percent, decimalScale, csvString)}</>
}
Example.storyName = 'percentageString'
Example.args = {
  percent: 0.0345,
  decimalScale: false,
  csvString: false,
}

export default {
  title: '[Deprecated]/Helper Functions/percentageString',
  component: Example,
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      page: () => (
        <>
          <DocsTemplate deprecated />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
