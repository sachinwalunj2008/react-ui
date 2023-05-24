import React from 'react';
import { Tooltip } from '../../module';
type ProductProps = {
    sold_by_iserve: boolean;
    sold_by_pattern?: boolean;
    sold_by_threepn: boolean;
};
type TooltipProps = React.ComponentProps<typeof Tooltip>;
type SellingInfoTooltipProps = {
    /** Product is needed to determine the content within the tooltip */
    product: ProductProps;
    /** Optionally change the position of the tooltip */
    position?: TooltipProps['position'];
    /** Optionally change the icon size for the tooltip */
    iconSize?: string;
    /** Optional className for the tooltip */
    customClass?: string;
};
/**
 * @deprecated Please use the standard Tooltip component to create this.
 **/
declare const SellingInfoTooltip: ({ product, position, iconSize, customClass, }: SellingInfoTooltipProps) => JSX.Element;
export default SellingInfoTooltip;
