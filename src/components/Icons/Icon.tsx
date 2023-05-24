import React from 'react'
import iconsList from './iconsList'
import styles from './_icons.module.scss'

export type IconStringList = keyof typeof iconsList
export type IconProps = {
  /** Name of the Icon from the IconStringList */
  icon: IconStringList
  /** Optional class */
  customClass?: string
  /** Optional size of the Icon - default is 20px */
  size?:
    | string
    | {
        height: string
        width: string
      }
}
const Icon = ({
  icon,
  customClass = '',
  size = '20px',
}: IconProps): JSX.Element => {
  let height = size,
    width = size
  if (typeof size === 'object') {
    height = size?.height
    width = size?.width
  }

  const inlineStyles = {
    '--svg-height': height,
    '--svg-width': width,
  } as React.CSSProperties

  return (
    <span
      // TODO: Remove the `icon` class once all apps have removed instances of .icon
      className={`icon ${icon} ${styles.iconStyles} ${customClass}`}
      style={inlineStyles}
    >
      {iconsList[icon]}
    </span>
  )
}

export default Icon
