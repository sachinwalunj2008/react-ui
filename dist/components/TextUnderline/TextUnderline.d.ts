type TextUnderlineProps = {
    /** The text that will be rendered for this component */
    text: string;
    /** Optionally skip over the first word for calculating how long the line should be. The first word will be included and the line will extend to the 3rd character of the second word.  */
    combineWords?: boolean;
    /** Optionally use the small version for this component (12px). */
    small?: boolean;
    /** Optionally make the text regular font weight */
    regularFont?: boolean;
};
export declare const TextUnderline: ({ text, combineWords, small, regularFont, }: TextUnderlineProps) => JSX.Element;
export {};
