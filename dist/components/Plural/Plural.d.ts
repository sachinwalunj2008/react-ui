type PluralProps = {
    /** The base text string for this component. For example, if you wanted the output of this component to be `Products`, you would use `Product` for this prop. */
    text: string;
    /** The number that will be used to determine if the `text` should be plural. */
    number: number | string;
    /** Optional suffix to replace `s` if the plural version of the `text` does not work with just `s` at the end of the word. */
    suffix?: string;
};
declare const Plural: ({ text, number, suffix }: PluralProps) => JSX.Element;
export default Plural;
