import React from 'react'
import { Cell, Checkbox } from '../../module'

type TableCheckboxProps = {
  name: string
  checked: boolean
  handleCheck: () => void
}

const TableCheckbox = ({
  name,
  checked,
  handleCheck,
}: TableCheckboxProps): JSX.Element => {
  return (
    <Cell
      style={{
        width: '18px',
      }}
    >
      <Checkbox
        label={name}
        name={name}
        checked={checked}
        callout={handleCheck}
        hideLabel
      />
    </Cell>
  )
}

export default TableCheckbox
