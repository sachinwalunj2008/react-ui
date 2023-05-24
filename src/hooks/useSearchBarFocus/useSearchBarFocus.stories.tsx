import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { SearchBar, useSearchBarFocus } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (): JSX.Element => {
  const searchBarRef = useSearchBarFocus(true)

  return (
    <SearchBar
      value={''}
      onChange={() => {
        return
      }}
      ref={searchBarRef}
    />
  )
}
Example.storyName = 'useSearchBarFocus'
Example.args = {}

export default {
  title: 'Hooks/useSearchBarFocus',
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
              import { useSearchBarFocus } from '@patterninc/react-ui'

              const searchBarRef = useSearchBarFocus(true)

              Output: Returns a ref to be used for the SearchBar.
            `}
            description={
              <span>
                A hook used to get a ref for the <code>SearchBar</code>. This
                ref will be used to dynamically pass the focus to the{' '}
                <code>SearchBar</code>.
              </span>
            }
            whenToUse={[
              <span key='first-line'>
                We only need to use this when a <code>SearchBar</code> is in a
                dropdown (like <code>MultipleSelection</code>) or in a{' '}
                <code>SideDrawer</code>. The <code>autoFocus</code> prop will
                not work in these cases.
              </span>,
            ]}
            noArgs
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
