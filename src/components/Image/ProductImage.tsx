import React from 'react'
import styles from './_product-image.module.scss'
import { Icon } from '../../module'

export type ImageProps = {
  /** text displayed if the image fails to load */
  alt?: string
  /** custom class for image container */
  containerClass?: string
  /** change the default size of the no-image icon (in px format, ex: '20px') */
  iconSize?:
    | string
    | {
        height: string
        width: string
      }
  /** custom class for image <img> component */
  imageClass?: string
  /** object with styles to overwrite image container default styles */
  style?: React.CSSProperties
  /** object with styles to overwrite image default styles */
  imgStyle?: React.CSSProperties
  /** link to image */
  url?: string
}

const ProductImage = ({
  alt = 'Product',
  containerClass = '',
  iconSize = '40px',
  imageClass = '',
  style = {},
  imgStyle = {},
  url,
}: ImageProps): JSX.Element => {
  const setFallback = (err: React.SyntheticEvent<HTMLImageElement, Event>) => {
    err.currentTarget.onerror = null
    err.currentTarget.src = '/images/no-img.svg'
  }

  return (
    <div
      className={`${styles.display} ${styles.thumbnail} ${containerClass}`}
      style={{ ...style }}
    >
      {url ? (
        <img
          className={imageClass}
          src={url}
          onError={setFallback}
          alt={alt}
          style={{ maxWidth: '100%', maxHeight: '100%', ...imgStyle }}
        />
      ) : (
        <Icon icon='noImage' size={iconSize} customClass={styles.iconColor} />
      )}
    </div>
  )
}

export default ProductImage
