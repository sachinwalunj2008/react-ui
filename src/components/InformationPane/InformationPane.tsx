import React from 'react'
import { Button, Icon, ProductImage, LabelAndData, Tag } from '../../module'
import { LabelAndDataProps } from '../LabelAndData/LabelAndData'
import { TagProps } from '../Tag/Tag'
import styles from './_information-pane.module.scss'

type HeaderBase = {
  /** The header label and data that appears in the left side of the header */
  labelAndData?: Omit<
    LabelAndDataProps,
    'children' | 'customClass' | 'labelClass'
  >
}

type HeaderWithTag = HeaderBase & {
  /** The tag that appears in the right side of the header */
  tag?: TagProps
  edit?: never
}

type HeaderWithEdit = HeaderBase & {
  tag?: never
  /** The edit function to be passed into the edit icon in the right side of the header */
  edit?: () => void
}

type InformationPaneProps = {
  /** InformationPane will accept any children elements. It is recommended to use the components defined in this file - ImageAndName, Section, CustomSection, and Divider - to achieve the desired design. */
  children: React.ReactNode
  header: HeaderWithTag | HeaderWithEdit
}

const InformationPane = ({
  header,
  children,
}: InformationPaneProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <Header {...header} />
      {children}
    </div>
  )
}

type HeaderProps = InformationPaneProps['header']

const Header = ({ labelAndData, tag, edit }: HeaderProps) => {
  return (
    <div className={styles.header}>
      {!!labelAndData ? <LabelAndData {...labelAndData} /> : null}
      {!!tag ? <Tag {...tag} /> : null}
      {!!edit ? (
        <Button as='unstyled' onClick={edit}>
          <Icon icon='pencil' customClass={styles.iconColor} size='16px' />
        </Button>
      ) : null}
    </div>
  )
}

type ImageAndNameProps = {
  /** The url of the product image */
  imgUrl?: string
  /** The product name and associated marketplace url */
  product: { name: string; url?: string }
}

const ImageAndName = ({ imgUrl, product }: ImageAndNameProps): JSX.Element => {
  return (
    <div className={styles.imageAndNameContainer}>
      <ProductImage
        url={imgUrl}
        alt={product.name}
        style={{ width: 'auto', height: 'auto' }}
        iconSize='100px'
        imgStyle={{ maxWidth: '100%', maxHeight: '128px' }}
      />
      <span className={styles.productName}>
        {product.url ? (
          <a
            href={product.url}
            target='_blank'
            rel='noreferrer'
            className={styles.link}
          >
            {product.name}
          </a>
        ) : (
          <span>{product.name}</span>
        )}
      </span>
    </div>
  )
}

type SectionProps = {
  /** Array of LabelAndData props that will populate in this section */
  data: LabelAndDataProps[]
  /** Boolean used to style the section into 1 or 2 columns. 1 column is the default. */
  isTwoColumns?: boolean // rename to boolean name
}

const Section = ({ data, isTwoColumns }: SectionProps): JSX.Element => {
  return (
    <div
      className={`${styles.section} ${isTwoColumns ? styles.twoColumns : ''}`}
    >
      {data.map((d, index) => (
        <div
          key={d.label?.toString()}
          className={
            isTwoColumns && data.length % 2 !== 0 && index === 0
              ? styles.oddNumber
              : ''
          }
        >
          <LabelAndData
            {...d}
            labelClass={styles.labelAndData}
            customClass={styles.labelAndData}
          />
        </div>
      ))}
    </div>
  )
}

type CustomSectionProps = {
  /** The children elements to be passed into the component. */
  children: React.ReactNode
  /** Moves the section up by 32px. Caution - should only be used as part of a top section that is directly below the header. */
  isOfffset?: boolean
}

const CustomSection = ({ isOfffset, children }: CustomSectionProps) => {
  return (
    <div className={`${styles.section} ${isOfffset ? styles.offset : ''}`}>
      {children}
    </div>
  )
}

const Divider = (): JSX.Element => {
  return <div className={styles.divider} />
}

InformationPane.ImageAndName = ImageAndName
InformationPane.Section = Section
InformationPane.CustomSection = CustomSection
InformationPane.Divider = Divider

export { InformationPane }
