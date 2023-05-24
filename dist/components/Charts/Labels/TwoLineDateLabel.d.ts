type TwoLineDateLabelProps = {
    x: number;
    y: number;
    payload: {
        value: string | number;
    };
    xTickFormat?: boolean;
};
declare const TwoLineDateLabel: ({ x, y, payload, xTickFormat, }: TwoLineDateLabelProps) => JSX.Element;
export default TwoLineDateLabel;
