import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import TableCheckbox from './TableCheckbox'

export default {
  title: 'Components/Tables/Components/TableCheckbox',
  component: TableCheckbox,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description={
            <span>
              This checkbox component utilizes the standard{' '}
              <code>Checkbox</code> component, but has a <code>Cell</code>{' '}
              wrapper around it with a style of <code>width: 18px</code>.
            </span>
          }
          whenToUse={[
            <span key='first'>
              This should only be used when utilizing the{' '}
              <code>CustomTable</code>
            </span>,
          ]}
        />
      ),
    },
  },
} as ComponentMeta<typeof TableCheckbox>

const Template: ComponentStory<typeof TableCheckbox> = (args) => {
  const { checked } = args
  const [checkedState, setCheckedState] = useState(checked)

  const checkHandler = () => {
    setCheckedState(!checkedState)
  }

  return (
    <TableCheckbox
      {...args}
      checked={checkedState}
      handleCheck={checkHandler}
    />
  )
}

export const basic = Template.bind({})
basic.args = {
  name: 'table_checkbox',
  checked: false,
}
basic.storyName = 'TableCheckbox'
