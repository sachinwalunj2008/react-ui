import React from 'react'
import { PopoverAndMobileDrawer, Icon } from '../../module'
import CustomDisplayContent from './CustomDisplayContent'
import styles from './_custom-display.module.scss'

export type DisplaySelectionProps = {
  /** Array of all the items that can be displayed in the UI */
  totalDisplayList: string[]
  /** Array of user selected items that we want displayed in the UI */
  selectedDisplayList: string[]
  /** Function to set array of selected items saved by the user */
  customSelectionCallout: (selectedList: string[]) => void
  /** The text that will display at the top of the popover */
  headerText: string
  /** Custom placeholder text for the searchbar */
  searchPlaceholder?: string
  /** Custom text that will display if no items match the search input */
  noListDataText?: string
  /** The callout that will be made when the `Set to Default` button is clicked. */
  setToDefaultCallout: () => void
}

/**
 * @deprecated This component is no longer being used.
 **/
const CustomDisplay = ({
  selectedDisplayList,
  totalDisplayList,
  customSelectionCallout,
  headerText,
  searchPlaceholder,
  noListDataText,
  setToDefaultCallout,
}: DisplaySelectionProps): JSX.Element => {
  return (
    <PopoverAndMobileDrawer
      tippyProps={{
        placement: 'left',
        className: styles.noPadding,
        maxWidth: 'none',
        appendTo: document.body,
      }}
      content={
        <CustomDisplayContent
          selectedDisplayList={selectedDisplayList}
          totalDisplayList={totalDisplayList}
          customSelectionCallout={customSelectionCallout}
          headerText={headerText}
          searchPlaceholder={searchPlaceholder}
          noListDataText={noListDataText}
          setToDefaultCallout={setToDefaultCallout}
        />
      }
      sideDrawerProps={{
        headerContent: headerText,
      }}
    >
      <Icon customClass={styles.iconColor} icon='settings' />
    </PopoverAndMobileDrawer>
  )
}

export default CustomDisplay
