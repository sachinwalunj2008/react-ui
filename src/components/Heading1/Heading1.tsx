import React from 'react'

type CreateUnderlineProps = {
  text: string
  combineFirstWord?: boolean
}
const CreateUnderline = ({
  text,
  combineFirstWord,
}: CreateUnderlineProps): JSX.Element => {
  const headingArr = text?.split(' '),
    headingArrLength = headingArr.filter((val) => val).length,
    firstWordLength = headingArr[0].length
  let characterLength
  if ((firstWordLength < 5 || combineFirstWord) && headingArrLength > 1) {
    characterLength = headingArr[0].length + 1 + (headingArr[1].length - 2)
  } else if (firstWordLength < 5 && headingArrLength === 1) {
    characterLength = null
  } else {
    characterLength = firstWordLength - 2
  }
  return (
    <span>
      <span className='header-with-underline'>
        {characterLength ? text.slice(0, characterLength) : text}
      </span>
      {characterLength && (
        <span>{text.slice(characterLength, text.length)}</span>
      )}
    </span>
  )
}

/**
 * @deprecated Please use the `TextUnderline` component instead. The styles and props have been simplified.
 **/
const Heading1 = ({
  text,
  customClass = '',
  title,
  noBottomMargin,
  combineFirstWord,
  underlineHeight = '6px',
  option = false,
}: Heading1Props): JSX.Element => {
  const className = [
    'custom-h1',
    // TODO: Add code to accept different font-size as per the design requirements instead of using `custom-h1` font-size as 16px all the time
    customClass,
    !noBottomMargin ? 'bottom-margin' : '',
    customClass?.includes('fs-') ? 'custom-font-size' : '',
    option ? 'header-option' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const styles = {
    '--underline-height': underlineHeight,
  } as React.CSSProperties

  return (
    <h1 className={className} title={title} style={styles}>
      <CreateUnderline
        text={text.toString()}
        combineFirstWord={combineFirstWord}
      />
    </h1>
  )
}

export default Heading1

type Heading1Props = {
  text: CreateUnderlineProps['text']
  customClass?: string
  title?: string
  noBottomMargin?: boolean
  combineFirstWord?: CreateUnderlineProps['combineFirstWord']
  option?: boolean
  underlineHeight?: string
}
