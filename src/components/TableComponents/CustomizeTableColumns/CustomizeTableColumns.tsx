import React, { useEffect, useState } from 'react'
import { SideDrawer } from '../../SideDrawer/SideDrawer'
import FormButtons from '../../Form/FormButtons'
import Icon from '../../Icons/Icon'
import styles from './_customize-table-columns.module.scss'
import { Button } from '../../Button/Button'
import MultipleSelection from '../../MultipleSelection/MultipleSelection'

type CustomizeTableColumnsProps = {
  /** Array of all the columns that can be displayed in the UI */
  options: string[]
  /** Array of user selected columns that we want displayed in the UI */
  selected: string[]
  /** Updates the array of selected columns after customization has been confirmed */
  selectionCallout: (selectedList: string[]) => void
  /** The reset function to set the columns back to the default setting */
  setToDefaultCallout: () => void
}

const CustomizeTableColumns = ({
  options,
  selected,
  selectionCallout,
  setToDefaultCallout,
}: CustomizeTableColumnsProps): JSX.Element => {
  const [open, setOpen] = useState(false),
    [selectedColumns, setSelectedColumns] = useState(selected)

  const closeDrawer = () => {
    setOpen(false)
  }

  const resetButtonProps = {
    onClick: setToDefaultCallout,
    children: 'Set to Default',
  }

  const cancelButtonProps = {
    onClick: () => {
      closeDrawer()
      setSelectedColumns(selected)
    },
  }

  const saveButtonProps = {
    onClick: () => {
      selectionCallout(selectedColumns)
      closeDrawer()
    },
    children: 'Save Changes',
  }

  useEffect(() => {
    setSelectedColumns(selected)
  }, [selected])

  return (
    <>
      <Button as='unstyled' onClick={() => setOpen(true)}>
        <Icon customClass={styles.iconColor} icon='settings' />
      </Button>
      <SideDrawer
        isOpen={open}
        closeCallout={closeDrawer}
        headerContent='Add or Remove Table Columns'
        footerContent={
          <FormButtons
            resetButtonProps={resetButtonProps}
            cancelButtonProps={cancelButtonProps}
            saveButtonProps={saveButtonProps}
          />
        }
      >
        {({ height }) => (
          <MultipleSelection
            options={options}
            selectedOptions={selectedColumns}
            callout={setSelectedColumns}
            labelText='Table Columns'
            searchPlaceholder='Unselected Columns'
            noListDataText='There are no columns matching that search.'
            exposed
            maxHeight={height - 23} // 23px is the height of the label
          />
        )}
      </SideDrawer>
    </>
  )
}

export default CustomizeTableColumns
