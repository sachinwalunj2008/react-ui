import React from 'react'
import { Tooltip, Icon } from '../../module'
import { TippyProps } from '@tippyjs/react'
import styles from './_unsorted-column.module.scss'

type UnsortedColumnTooltipProps = {
  /** Define the tooltip content */
  content: React.ReactNode
  /** Position for the tooltip */
  position?: TippyProps['placement']
}

type UnsortedColumnProps = {
  /** Unique label for the unsorted column headers. */
  label: string
  /** Define the tooltip for a column. */
  tooltip?: UnsortedColumnTooltipProps
  /** Class name for a column. */
  className?: string
}

const UnsortedColumn = ({
  label,
  tooltip,
  className = '',
}: UnsortedColumnProps): JSX.Element => (
  <span className={`${styles.unsortColumnContainer} ${className}`}>
    {label}
    {tooltip && (
      <Tooltip
        tooltipContent={tooltip.content}
        position={tooltip.position ? tooltip.position : 'bottom'}
      >
        <Icon icon='info' customClass={styles.iconStyles} size='12px' />
      </Tooltip>
    )}
  </span>
)

export default UnsortedColumn
