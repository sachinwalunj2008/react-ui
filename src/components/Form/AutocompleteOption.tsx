import React from 'react'
import { Heading1, WrapMatchingText, Button } from '../../module'
import styles from './_autocomplete-option.module.scss'

function AutocompleteOption({
  onClick,
  isSelected,
  text,
  searchText,
  className,
}: AutocompleteOptionProps): JSX.Element {
  const classes = [styles.autocompleteOption, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <Button as='unstyled' onClick={onClick}>
        {isSelected ? (
          <Heading1 text={text} option customClass={styles.fontSize14} />
        ) : (
          <WrapMatchingText
            text={text}
            match={searchText}
            customClass={styles.fontSize14}
          />
        )}
      </Button>
    </div>
  )
}

type WrapMatchingTextProps = React.ComponentProps<typeof WrapMatchingText>

type AutocompleteOptionProps = {
  /** Function to be called onClick */
  onClick: React.MouseEventHandler<HTMLButtonElement>
  /** Text to display for the option */
  text:
    | React.ComponentProps<typeof Heading1>['text']
    | WrapMatchingTextProps['text']
  /**
   * Passed through to WrapMatchingText component's 'match' prop
   */
  searchText: WrapMatchingTextProps['match']
  /** Determines active state of the option */
  isSelected?: boolean
  /** Optional className for the option */
  className?: string
}

export default AutocompleteOption
