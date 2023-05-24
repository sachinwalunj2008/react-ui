import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { activeCellClass } from '../../module'
import { DocsTemplate } from '../../../.storybook'
import { ActiveCellClassProps } from '../../services/HelperServiceTyped'

type ExampleProps = Omit<ActiveCellClassProps, 'activeName'> & {
  activeName: 'box1' | 'box2' | 'box3'
}

export const Example = (args: ExampleProps): JSX.Element => {
  const { activeName } = args

  return (
    <>
      <p className='pb-8'>
        The active box will be highlighted to show the result of the{' '}
        <code>activeCellClass</code> function. You can change which box is
        highlighted in the <code>ArgsTable</code> below.
      </p>
      <div className='flex' style={{ gap: '16px' }}>
        <div
          style={{ height: '100px', width: '100px' }}
          className={`bdr ${activeCellClass({
            cells: ['box1'],
            activeName: activeName,
          })}`}
        />
        <div
          style={{ height: '100px', width: '100px' }}
          className={`bdr ${activeCellClass({
            cells: ['box2'],
            activeName: activeName,
          })}`}
        />
        <div
          style={{ height: '100px', width: '100px' }}
          className={`bdr ${activeCellClass({
            cells: ['box3'],
            activeName: activeName,
          })}`}
        />
      </div>
    </>
  )
}
Example.storyName = 'activeCellClass'
Example.args = {
  activeName: 'box1',
}

export default {
  title: 'Helper Functions/activeCellClass',
  component: Example,
  argTypes: {
    cells: {
      control: false,
    },
    color: {
      control: false,
    },
  },
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
             import { activeCellClass } from '@patterninc/react-ui'

             <Cell className={
               activeCellClass({
                 cells: ['map_price', 'change__map_price'],
                 // activeName will come from the state of the sort in the component.
                 activeName: 'map_price',
               })
             } />

             Output: Highlights the column that has the value \`map_price\` or \`change__map_price\`
             `}
            description='A function used to return a color based on the active column in a table.'
            whenToUse={[
              <span key='first-line'>
                <code>activeCellClass</code> is used when you are using the{' '}
                <code>CustomTable</code>. You will need this in order to
                properly highlight the active column (the column that is being
                sorted).
              </span>,
            ]}
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
