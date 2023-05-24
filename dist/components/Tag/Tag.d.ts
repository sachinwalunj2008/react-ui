import React from 'react';
export declare const tagColorList: readonly ["blue", "red", "green", "yellow", "purple", "royal-blue", "teal", "pink", "orange", "gray", "light-gray", "dark-gray"];
export type TagColorList = typeof tagColorList[number];
export type TagProps = {
    /** Content of the Tag */
    children: React.ReactNode;
    /** Color of the Tag */
    color: TagColorList;
};
declare const Tag: ({ children, color }: TagProps) => JSX.Element;
export default Tag;
