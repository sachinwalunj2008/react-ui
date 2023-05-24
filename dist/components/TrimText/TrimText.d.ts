import { TooltipProps } from '../Tooltip/Tooltip';
type TrimTextProps = {
    /** The text that you need truncated */
    text: string;
    /** The number of characters before the text is truncated */
    limit: number;
    /** Position the tooltip will open */
    position?: TooltipProps['position'];
    /** Optional class to add to the text */
    customClass?: string;
};
declare const TrimText: ({ text, limit, position, customClass, }: TrimTextProps) => JSX.Element;
export default TrimText;
