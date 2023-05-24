export declare const pillColorList: readonly ["red", "blue", "green", "purple", "medium-purple", "dark-purple"];
export type PillColorList = typeof pillColorList[number];
type PillProps = {
    /** Available colors for the Pill */
    color: PillColorList;
    /** The number to display inside the Pill */
    number: number;
    /** Loading state for the Pill */
    loading?: boolean;
};
declare const Pill: ({ color, number, loading }: PillProps) => JSX.Element;
export default Pill;
