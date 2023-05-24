import React from 'react'
import { Tooltip, Icon, IconStringList } from '../../module'

type ProductProps = {
  sold_by_iserve: boolean
  sold_by_pattern?: boolean
  sold_by_threepn: boolean
}

type TooltipContentProps = {
  [key: string]: {
    icon: IconStringList
    content: string
  }
}

const tooltipContent: TooltipContentProps = {
  pattern: {
    icon: 'pattern',
    content: 'Products with the Pattern logo mark are sold by iServe',
  },
  threepn: {
    icon: 'threepn',
    content:
      'Products with the Borderless logo mark are sold by our 3PN network',
  },
  patternPlus: {
    icon: 'patternPlus',
    content: 'Products with the Pattern + logo mark are sold by iServe & 3PN',
  },
}

const currentTooltip = (product: ProductProps) => {
  return (product.sold_by_iserve || product.sold_by_pattern) &&
    product.sold_by_threepn
    ? 'patternPlus'
    : product.sold_by_iserve || product.sold_by_pattern
    ? 'pattern'
    : 'threepn'
}

const getSellerTooltipInfo = (
  product: ProductProps
): { icon: IconStringList; content: string } => {
  return {
    icon: tooltipContent[currentTooltip(product)]?.icon,
    content: tooltipContent[currentTooltip(product)]?.content,
  }
}

type TooltipProps = React.ComponentProps<typeof Tooltip>

type SellingInfoTooltipProps = {
  /** Product is needed to determine the content within the tooltip */
  product: ProductProps
  /** Optionally change the position of the tooltip */
  position?: TooltipProps['position']
  /** Optionally change the icon size for the tooltip */
  iconSize?: string
  /** Optional className for the tooltip */
  customClass?: string
}

/**
 * @deprecated Please use the standard Tooltip component to create this.
 **/
const SellingInfoTooltip = ({
  product,
  position = 'left',
  iconSize = '20px',
  customClass = 'svg-blue',
}: SellingInfoTooltipProps): JSX.Element => (
  <span>
    {(product.sold_by_iserve ||
      product.sold_by_pattern ||
      product.sold_by_threepn) && (
      <Tooltip
        position={position}
        tooltipContent={
          <div className='flex fs-14'>
            <div className='icon'>
              <Icon
                icon={getSellerTooltipInfo(product)?.icon}
                customClass={customClass}
              />
            </div>
            <div className='content ml-16'>
              {getSellerTooltipInfo(product)?.content}
            </div>
          </div>
        }
      >
        <Icon
          icon={getSellerTooltipInfo(product)?.icon}
          customClass={customClass}
          size={iconSize}
        />
      </Tooltip>
    )}
  </span>
)

export default SellingInfoTooltip
