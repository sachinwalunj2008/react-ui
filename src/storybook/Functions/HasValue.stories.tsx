import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import OutputForDemo from '../../../.storybook/templates/OutputForDemo'
import { hasValue } from '../../module'

const HasValueTemplate = (args: { item: unknown }): JSX.Element => {
  const { item } = args
  const getDisplayArgsValue = () => {
    if (item === undefined) return 'undefined'
    if (item === null) return 'null'
    if (item === '') return 'Empty String'
    return item
  }
  const displayArgsValue = getDisplayArgsValue()

  return (
    <div className='flex-column'>
      <p>Value: {displayArgsValue}</p>
      <OutputForDemo output={hasValue(item) ? 'true' : 'false'} />
    </div>
  )
}

export const number = HasValueTemplate.bind({})
number.args = {
  item: 10,
}

export const string = HasValueTemplate.bind({})
string.args = {
  item: 'Hello World!',
}

export const undefinedExample = HasValueTemplate.bind({})
undefinedExample.storyName = 'Undefined'

export const nullExample = HasValueTemplate.bind({})
nullExample.args = {
  item: null,
}
nullExample.storyName = 'Null'

export default {
  title: 'Helper Functions/hasValue',
  component: HasValueTemplate,
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
              import { hasValue } from '@patterninc/react-ui'

              hasValue(10)

              Output: true // boolean
            `}
            description={
              <span>
                A function used to check if the argument passed in has a value
                (not <code>null</code> or <code>undefined</code>).
              </span>
            }
            whenToUse={[
              <span key='first-line'>
                <code>hasValue</code> is used when you need a boolean returned
                when checking if a variable has a value.
              </span>,
            ]}
            noArgs
            noDemo
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof HasValueTemplate>
