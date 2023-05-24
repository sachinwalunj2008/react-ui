import React from 'react'
import styles from './_tag.module.scss'

export const tagColorList = [
  'blue',
  'red',
  'green',
  'yellow',
  'purple',
  'royal-blue',
  'teal',
  'pink',
  'orange',
  'gray',
  'light-gray',
  'dark-gray',
] as const // casting as const to define the types `tagColorList` below. This way we define the list once and it will update everywhere `chartColors` is used. https://steveholgado.com/typescript-types-from-arrays/

export type TagColorList = typeof tagColorList[number]

export type TagProps = {
  /** Content of the Tag */
  children: React.ReactNode
  /** Color of the Tag */
  color: TagColorList
}

const Tag = ({ children, color }: TagProps): JSX.Element => {
  return <div className={`${styles.tag} ${styles[color]}`}>{children}</div>
}

export default Tag
