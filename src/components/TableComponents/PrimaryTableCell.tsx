import React from 'react'
import { Link } from 'react-router-dom'
import {
  ProductImage,
  SellingInfoTooltip,
  Tag,
  TrimText,
  useIsMobileView,
} from '../../module'
import type { ImageProps } from '../Image/ProductImage'
import type { TagProps } from '../Tag/Tag'
import styles from './_primary-cell.module.scss'

interface BaseProps {
  /** URL that goes to the product information page for the selected product */
  productLink?: string
  /** sortBy prop object which must include the `prop` value in order to highlight selected sort */
  sortBy: { prop: string; order?: 'asc' | 'desc' }
  /** the sold_by_iserve and/or sold_by_threepn values as an object */
  soldBy?: {
    iserve?: boolean
    threepn?: boolean
  }
  /** an array of tag objects which include the text, color and (if applicable) solid values */
  tags?: TagProps[]
  /** the main display text */
  title: string
  /** the prop string associated with the title value in the product object (for sorting) */
  titleProp?: string
  /** id props: the id value, the label to display (such as `ID` or `asin`) and the prop associated with the id value in the product object (for sorting) */
  uniqId: {
    id: string | number
    idLabel: string
    idName: string
  }
  /** the image prop object which includes {alt, url} and custom classes and image styles */
  imageProps?: ImageProps
}

type CellWithExternalLink = BaseProps & {
  /** URL that links to an external marketplace */
  externalLink?: string
  /** array of marketplace name strings or a single marketplace name  */
  marketplaceNames: string[] | string
}

type CellWithoutExternalLink = BaseProps & {
  externalLink?: never
  marketplaceNames?: string[] | string
}

type PrimaryTableCellProps = CellWithExternalLink | CellWithoutExternalLink

const PrimaryTableCell = ({
  imageProps,
  title,
  titleProp = 'name',
  tags,
  productLink,
  externalLink,
  marketplaceNames,
  uniqId,
  sortBy,
  soldBy,
}: PrimaryTableCellProps): JSX.Element => {
  const isMobileView = useIsMobileView()

  const { id, idLabel, idName } = uniqId

  const productImage = () => {
    return <ProductImage {...imageProps} />
  }

  const productTitle = () => {
    return (
      <div
        className={`${styles.productTitle} ${
          soldBy?.iserve || soldBy?.threepn ? '' : styles.marginBottom
        } ${sortBy.prop === titleProp ? styles.semibold : ''}`}
      >
        <TrimText text={title} limit={60} />
      </div>
    )
  }

  const productMarketplaces = () => {
    return (
      <span
        className={
          ['marketplace_name', 'marketplace_names'].includes(sortBy.prop)
            ? styles.semibold
            : ''
        }
      >
        {Array.isArray(marketplaceNames)
          ? marketplaceNames.length === 1
            ? marketplaceNames[0]
            : `${marketplaceNames[0]} - ${marketplaceNames.length} Variations`
          : marketplaceNames}
      </span>
    )
  }

  return (
    <div className={styles.container}>
      {/* PREFIX CONTAINER */}
      <div className={styles.prefixContainer}>
        {productLink ? (
          <Link to={productLink}>{productImage()}</Link>
        ) : (
          productImage()
        )}
      </div>

      {/* BODY CONTAINER */}
      <div>
        {/* TITLE */}
        {productLink ? (
          <Link to={productLink}>{productTitle()}</Link>
        ) : (
          productTitle()
        )}

        <div
          className={`${styles.productDetailsContainer} ${
            isMobileView
              ? soldBy?.iserve || soldBy?.threepn
                ? ''
                : styles.gap
              : ''
          }`}
        >
          {/* ID */}
          {id && (
            <>
              <span
                className={sortBy.prop === idName ? styles.idSort : styles.id}
              >
                {`${idLabel}: ${id}`}
              </span>

              {/* DIVIDER */}
              {marketplaceNames && <span className={styles.divider}>|</span>}
            </>
          )}

          <div className={styles.marketplaceContainer}>
            {/* MARKETPLACES */}
            {externalLink ? (
              <a
                href={externalLink}
                target='_blank'
                rel={'noopener noreferrer'}
                className={styles.marketplaceHover}
              >
                {productMarketplaces()}
              </a>
            ) : (
              productMarketplaces()
            )}

            {/* SOLD BY */}
            {(soldBy?.iserve || soldBy?.threepn) && (
              <>
                <span className={styles.divider}>|</span>
                <SellingInfoTooltip
                  product={{
                    sold_by_iserve: !!soldBy?.iserve,
                    sold_by_threepn: !!soldBy?.threepn,
                  }}
                  position='bottom'
                />
              </>
            )}
          </div>
        </div>

        {/* TAGS */}
        {!!tags && (
          <div className={styles.tagContainer}>
            {tags?.map((tag, i) => (
              // using index as key because it could be possible to have duplicate tag names
              <Tag key={i} {...tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PrimaryTableCell
