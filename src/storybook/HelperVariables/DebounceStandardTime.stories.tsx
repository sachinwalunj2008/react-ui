import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { DEBOUNCE_STANDARD_TIME } from '../../module'

export const Example = (): JSX.Element => {
  return <>Standard Debounce Time: {DEBOUNCE_STANDARD_TIME}</>
}
Example.storyName = 'DEBOUNCE_STANDARD_TIME'

export default {
  title: 'Helper Variables/DEBOUNCE_STANDARD_TIME',
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
              import { DEBOUNCE_STANDARD_TIME } from '@patterninc/react-ui'

              <TextInput debounce={ DEBOUNCE_STANDARD_TIME } ... />

              // DEBOUNCE_STANDARD_TIME = 250ms
            `}
            whenToUse={[
              <span key='first-line'>
                A value defined for our common debounce time. This is set to{' '}
                <code>250ms</code>.
              </span>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
