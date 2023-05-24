import React from 'react';
export type ImageProps = {
    /** text displayed if the image fails to load */
    alt?: string;
    /** custom class for image container */
    containerClass?: string;
    /** change the default size of the no-image icon (in px format, ex: '20px') */
    iconSize?: string | {
        height: string;
        width: string;
    };
    /** custom class for image <img> component */
    imageClass?: string;
    /** object with styles to overwrite image container default styles */
    style?: React.CSSProperties;
    /** object with styles to overwrite image default styles */
    imgStyle?: React.CSSProperties;
    /** link to image */
    url?: string;
};
declare const ProductImage: ({ alt, containerClass, iconSize, imageClass, style, imgStyle, url, }: ImageProps) => JSX.Element;
export default ProductImage;
