import type { ImageProps } from '../Image/ProductImage';
import type { TagProps } from '../Tag/Tag';
interface BaseProps {
    /** URL that goes to the product information page for the selected product */
    productLink?: string;
    /** sortBy prop object which must include the `prop` value in order to highlight selected sort */
    sortBy: {
        prop: string;
        order?: 'asc' | 'desc';
    };
    /** the sold_by_iserve and/or sold_by_threepn values as an object */
    soldBy?: {
        iserve?: boolean;
        threepn?: boolean;
    };
    /** an array of tag objects which include the text, color and (if applicable) solid values */
    tags?: TagProps[];
    /** the main display text */
    title: string;
    /** the prop string associated with the title value in the product object (for sorting) */
    titleProp?: string;
    /** id props: the id value, the label to display (such as `ID` or `asin`) and the prop associated with the id value in the product object (for sorting) */
    uniqId: {
        id: string | number;
        idLabel: string;
        idName: string;
    };
    /** the image prop object which includes {alt, url} and custom classes and image styles */
    imageProps?: ImageProps;
}
type CellWithExternalLink = BaseProps & {
    /** URL that links to an external marketplace */
    externalLink?: string;
    /** array of marketplace name strings or a single marketplace name  */
    marketplaceNames: string[] | string;
};
type CellWithoutExternalLink = BaseProps & {
    externalLink?: never;
    marketplaceNames?: string[] | string;
};
type PrimaryTableCellProps = CellWithExternalLink | CellWithoutExternalLink;
declare const PrimaryTableCell: ({ imageProps, title, titleProp, tags, productLink, externalLink, marketplaceNames, uniqId, sortBy, soldBy, }: PrimaryTableCellProps) => JSX.Element;
export default PrimaryTableCell;
