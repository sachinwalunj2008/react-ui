import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import OutputForDemo from '../../../.storybook/templates/OutputForDemo'
import { notEmpty } from '../../module'

const NotEmptyTemplate = (args: { item: unknown }): JSX.Element => {
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
      <OutputForDemo output={notEmpty(item) ? 'true' : 'false'} />
    </div>
  )
}

export const number = NotEmptyTemplate.bind({})
number.args = {
  item: 10,
}

export const string = NotEmptyTemplate.bind({})
string.args = {
  item: 'Hello World!',
}

export const emptyString = NotEmptyTemplate.bind({})
emptyString.args = {
  item: '',
}

export const undefinedExample = NotEmptyTemplate.bind({})
undefinedExample.storyName = 'Undefined'

export const nullExample = NotEmptyTemplate.bind({})
nullExample.args = {
  item: null,
}
nullExample.storyName = 'Null'

export default {
  title: 'Helper Functions/notEmpty',
  component: NotEmptyTemplate,
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
              import { notEmpty } from '@patterninc/react-ui'

              notEmpty(10)

              Output: true // boolean
            `}
            description={
              <span>
                A function used to check if the argument passed in has a value
                and is not an empty string (not <code>null</code>,{' '}
                <code>undefined</code>, or <code>''</code>).
              </span>
            }
            whenToUse={[
              <span key='first-line'>
                <code>notEmpty</code> is used when you a boolean returned when
                checking if a variable has a value and is not an empty string.
              </span>,
            ]}
            noArgs
            noDemo
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof NotEmptyTemplate>
