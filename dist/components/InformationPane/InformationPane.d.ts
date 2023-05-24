import React from 'react';
import { LabelAndDataProps } from '../LabelAndData/LabelAndData';
import { TagProps } from '../Tag/Tag';
type HeaderBase = {
    /** The header label and data that appears in the left side of the header */
    labelAndData?: Omit<LabelAndDataProps, 'children' | 'customClass' | 'labelClass'>;
};
type HeaderWithTag = HeaderBase & {
    /** The tag that appears in the right side of the header */
    tag?: TagProps;
    edit?: never;
};
type HeaderWithEdit = HeaderBase & {
    tag?: never;
    /** The edit function to be passed into the edit icon in the right side of the header */
    edit?: () => void;
};
type InformationPaneProps = {
    /** InformationPane will accept any children elements. It is recommended to use the components defined in this file - ImageAndName, Section, CustomSection, and Divider - to achieve the desired design. */
    children: React.ReactNode;
    header: HeaderWithTag | HeaderWithEdit;
};
declare const InformationPane: {
    ({ header, children, }: InformationPaneProps): JSX.Element;
    ImageAndName: ({ imgUrl, product }: ImageAndNameProps) => JSX.Element;
    Section: ({ data, isTwoColumns }: SectionProps) => JSX.Element;
    CustomSection: ({ isOfffset, children }: CustomSectionProps) => JSX.Element;
    Divider: () => JSX.Element;
};
type ImageAndNameProps = {
    /** The url of the product image */
    imgUrl?: string;
    /** The product name and associated marketplace url */
    product: {
        name: string;
        url?: string;
    };
};
type SectionProps = {
    /** Array of LabelAndData props that will populate in this section */
    data: LabelAndDataProps[];
    /** Boolean used to style the section into 1 or 2 columns. 1 column is the default. */
    isTwoColumns?: boolean;
};
type CustomSectionProps = {
    /** The children elements to be passed into the component. */
    children: React.ReactNode;
    /** Moves the section up by 32px. Caution - should only be used as part of a top section that is directly below the header. */
    isOfffset?: boolean;
};
export { InformationPane };
