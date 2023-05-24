import React from 'react'
import { Tooltip, Mdash, trimText } from '../../module'
import { TooltipProps } from '../Tooltip/Tooltip'
import styles from './_trim-text.module.scss'

type TrimTextProps = {
  /** The text that you need truncated */
  text: string
  /** The number of characters before the text is truncated */
  limit: number
  /** Position the tooltip will open */
  position?: TooltipProps['position']
  /** Optional class to add to the text */
  customClass?: string
}
const TrimText = ({
  text,
  limit,
  position,
  customClass = '',
}: TrimTextProps): JSX.Element => {
  if (!text) return <Mdash />
  const trimmedText = trimText(text, limit)

  const classesToUse = !customClass.includes('fs-')
    ? `${customClass} ${styles.defaultFont}`
    : customClass

  return (
    <div>
      {trimmedText.length <= limit ? (
        <span className={classesToUse}>{text}</span>
      ) : (
        <Tooltip
          tooltipContent={text}
          position={position ? position : 'bottom'}
        >
          <span className={classesToUse}>{trimmedText}</span>
        </Tooltip>
      )}
    </div>
  )
}

export default TrimText
