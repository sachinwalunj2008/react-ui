import React from 'react';
declare const WrapMatchingText: ({ text, match, wrapper, customClass, }: WrapMatchingTextProps) => JSX.Element;
type WrapMatchingTextProps = {
    text: string;
    match: string | RegExp;
    wrapper?: React.ComponentType;
    customClass?: string;
};
export default WrapMatchingText;
