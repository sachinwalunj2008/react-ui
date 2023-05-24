import React, { useState } from 'react'
import { Button } from '../Button/Button'
import styles from './_table.module.scss'
import Icon from '../Icons/Icon'

type TableFilterPillProps = {
  text: string
  remove: () => void
}

const TableFilterPill = ({
  text,
  remove,
}: TableFilterPillProps): JSX.Element => {
  const [hovered, setHovered] = useState(false)

  return (
    <div className='bgc-light-gray py-4 px-8 bdrr-16 flex align-items-center'>
      <span className='mr-8 uppercase fs-12 light'>{text}</span>
      <Button
        as='unstyled'
        onClick={remove}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Icon
          icon='x'
          size='8px'
          // TODO: move this hovered styling to css instead
          customClass={`${styles.pillIcon} ${
            hovered ? 'svg-dark-purple' : 'svg-purple'
          }`}
        />
      </Button>
    </div>
  )
}

export default TableFilterPill
