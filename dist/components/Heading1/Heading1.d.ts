type CreateUnderlineProps = {
    text: string;
    combineFirstWord?: boolean;
};
/**
 * @deprecated Please use the `TextUnderline` component instead. The styles and props have been simplified.
 **/
declare const Heading1: ({ text, customClass, title, noBottomMargin, combineFirstWord, underlineHeight, option, }: Heading1Props) => JSX.Element;
export default Heading1;
type Heading1Props = {
    text: CreateUnderlineProps['text'];
    customClass?: string;
    title?: string;
    noBottomMargin?: boolean;
    combineFirstWord?: CreateUnderlineProps['combineFirstWord'];
    option?: boolean;
    underlineHeight?: string;
};
