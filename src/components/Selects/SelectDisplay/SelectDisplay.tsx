import React, { useState } from 'react'
import Tippy from '@tippyjs/react'
import { Button, Heading1 } from '../../../module'
import styles from './_select-display.module.scss'

export type SelectDisplayOption = {
  /** Identifier for an option */
  name: string
  /** Label display for an option */
  label: string
  /** Tippy value to match and show on condition */
  showTippyOnOption?: boolean
  /** Object of tippy to show chidren on option value */
  children?: {
    /** Array of options for tippy */
    options: SelectDisplayOption[]
  }
}

type SelectDisplayProps<OptionItem extends SelectDisplayOption> = {
  /** Array of options */
  options: OptionItem[]
  /** Function to be called when an option is clicked */
  callout: (option: OptionItem) => void
  /** Determines if there is an active option to be highlighted */
  active?: OptionItem['name']
  /** Adds a border around the component */
  hasBorder?: boolean
  /** Adds a tippy style around the component */
  hasTippy?: boolean
}

const SelectDisplay = <OptionItem extends SelectDisplayOption>({
  options,
  callout,
  active,
  hasBorder,
  hasTippy,
}: SelectDisplayProps<OptionItem>): JSX.Element => {
  const [actionVisible, setActionVisible] = useState(false),
    actionToggle = () => setActionVisible(!actionVisible),
    actionHide = () => setActionVisible(false)

  const getOptions = (filteredOptions: OptionItem[]) => {
    return (
      <div
        className={`${styles.display} ${hasBorder ? styles.border : ''} ${
          hasTippy ? styles.displayTippy : ''
        }`}
      >
        {filteredOptions.map((o) => {
          const showTippy =
            o.children &&
            o?.showTippyOnOption &&
            o.children?.options?.length > 0
          return (
            <Button
              as='unstyled'
              onClick={(e) => {
                e.stopPropagation()
                callout(o)
                if (showTippy) {
                  actionToggle()
                }
              }}
              key={o.name}
              className={`${styles.row} ${hasBorder ? styles.withBorder : ''}`}
            >
              <div>
                {active === o.name ? (
                  <Heading1 text={o.label} option />
                ) : showTippy ? (
                  <Tippy
                    placement={'bottom-end'}
                    className={styles.noPadding}
                    interactive={true}
                    duration={[300, 0]}
                    content={getOptions(o?.children?.options as OptionItem[])}
                    visible={actionVisible}
                    onClickOutside={actionHide}
                  >
                    <span>{o.label}</span>
                  </Tippy>
                ) : (
                  <span>{o.label}</span>
                )}
              </div>
            </Button>
          )
        })}
      </div>
    )
  }
  return <>{getOptions(options)}</>
}

export default SelectDisplay
