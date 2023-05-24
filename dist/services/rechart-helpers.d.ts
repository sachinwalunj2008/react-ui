export function xAxisProps({ showHours }?: {
    showHours?: boolean | undefined;
}): {
    axisLine: boolean;
    tickCount: number;
    domain: string[];
    type: string;
    interval: string;
    height: number;
    tickLine: boolean;
    tickMargin: number;
    tick: JSX.Element;
};
export function areaProps(colorIndex?: number): {
    type: string;
    fillOpacity: number;
    fill: string;
    dot: boolean;
    strokeWidth: number;
    connectNulls: boolean;
    activeDot: {
        stroke: string;
        fill: string;
        strokeWidth: number;
        r: number;
    };
    stroke: string;
    strokeLinecap: string;
    animationDuration: number;
};
export function linearGradient({ color, index }: {
    color: any;
    index: any;
}): JSX.Element;
export function tooltipProps(prefix?: string): {
    cursor: boolean;
    content: JSX.Element;
};
export namespace cartesianGridProps {
    const vertical: boolean;
}
export namespace yAxisProps {
    const axisLine: boolean;
    const tickLine: boolean;
    const tickCount: number;
    const tickMargin: number;
    const width: number;
    const orientation: string;
    namespace style {
        const fontSize: string;
        const fill: string;
    }
    const type: string;
    const domain: string[];
}
export namespace areaChartProps {
    namespace margin {
        const top: number;
        const right: number;
        const left: number;
        const bottom: number;
    }
}
