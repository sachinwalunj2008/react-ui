import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import OutputForDemo from '../../../.storybook/templates/OutputForDemo'
import { useTableCheckboxes } from './useTableCheckboxes'
import { Button } from '../../module'

export const Example = (): JSX.Element => {
  const data = [{ id: 1, name: 'test', currency: 10000 }]
  const {
    checkAll,
    setCheckAll,
    selectedBoxes,
    setSelectedBoxes,
    unselectedBoxes,
    setUnselectedBoxes,
  } = useTableCheckboxes(data)
  return (
    <div>
      <OutputForDemo
        output={
          <div className='flex flex-direction-column align-items-center gap-16 mt-8'>
            <span>CheckAll: {checkAll ? ' true' : ' false'}</span>
            <Button
              style={{ width: '150px' }}
              onClick={() => setCheckAll(!checkAll)}
            >
              Toggle CheckAll
            </Button>
            SelectedBoxes:{' '}
            {selectedBoxes?.[0] && (
              <span>
                Name: {selectedBoxes?.[0].name} Id: {selectedBoxes?.[0].id}{' '}
                Currency: {selectedBoxes?.[0].currency}
              </span>
            )}
            <Button
              style={{ width: '150px' }}
              onClick={() => {
                setSelectedBoxes([])
                setUnselectedBoxes(data)
              }}
            >
              Unselect
            </Button>
            UnselectedBoxes:{' '}
            {unselectedBoxes?.[0] && (
              <span>
                Name: {unselectedBoxes?.[0].name} Id: {unselectedBoxes?.[0].id}{' '}
                Currency: {unselectedBoxes?.[0].currency}
              </span>
            )}
            <Button
              style={{ width: '150px' }}
              onClick={() => {
                setSelectedBoxes(data)
                setUnselectedBoxes([])
              }}
            >
              Select
            </Button>
          </div>
        }
      />
    </div>
  )
}
Example.storyName = 'useTableCheckboxes'

export default {
  title: 'Hooks/useTableCheckboxes',
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
              import { useTableCheckboxes } from '@patterninc/react-ui'

              const data = [{ id: 1, name: 'test', currency: 10000 }]
              const {
                checkAll,
                setCheckAll,
                selectedBoxes,
                setSelectedBoxes,
                unselectedBoxes,
                setUnselectedBoxes,
              } = useTableCheckboxes(data)
            `}
            description='This hook is for initializing state used with CheckboxTable. The data
            argument is optional, as you will likely want to initialize the data
            yourself from an api using the setters.'
            whenToUse={[
              <span key='first-line'>
                <code>useTableCheckboxes</code> is a hook and is used solely for
                initializing state.
              </span>,
              <span key='first-line'>
                This hook is meant to be used with <code>CheckboxTable</code>
              </span>,
            ]}
            noArgs
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
