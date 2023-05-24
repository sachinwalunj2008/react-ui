declare const PercentageCheck: ({ percent, decimalScale, lessThanZeroText, noConversion, customClass, roundNumber, showLessThanZero, }: PercentageCheckProps) => JSX.Element;
export default PercentageCheck;
interface PercentageCheckProps {
    percent?: number;
    decimalScale?: number;
    lessThanZeroText?: string;
    noConversion?: boolean;
    roundNumber?: boolean;
    customClass?: string;
    showLessThanZero?: boolean;
}
