type Data = {
    name: string;
    pct: number;
    ms: number;
    color: string;
    offset?: number;
};
type Props = {
    data: Data[];
    width?: number;
    height?: number;
    margin?: number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
};
declare const MekkoBarChart: (props: Props) => JSX.Element;
export default MekkoBarChart;
