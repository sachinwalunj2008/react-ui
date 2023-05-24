import React from 'react'
import styles from './_text-underline.module.scss'

type TextUnderlineProps = {
  /** The text that will be rendered for this component */
  text: string
  /** Optionally skip over the first word for calculating how long the line should be. The first word will be included and the line will extend to the 3rd character of the second word.  */
  combineWords?: boolean
  /** Optionally use the small version for this component (12px). */
  small?: boolean
  /** Optionally make the text regular font weight */
  regularFont?: boolean
}

export const TextUnderline = ({
  text,
  combineWords,
  small,
  regularFont,
}: TextUnderlineProps): JSX.Element => {
  const textArr = text?.split(' ').filter((val) => val),
    textArrLength = textArr.length,
    firstWordLength = textArr[0].length
  let characterLength
  if ((firstWordLength < 5 || combineWords) && textArrLength > 1) {
    characterLength = textArr[0].length + 1 + (textArr[1].length - 2)
  } else if (firstWordLength < 5 && textArrLength === 1) {
    characterLength = null
  } else {
    characterLength = firstWordLength - 2
  }

  return (
    <span
      className={`${styles.container} ${small ? styles.small : ''} ${
        regularFont ? styles.regular : ''
      }`}
    >
      <span className={styles.underline}>
        {characterLength ? text.slice(0, characterLength) : text}
      </span>
      {characterLength && (
        <span>{text.slice(characterLength, text.length)}</span>
      )}
    </span>
  )
}
