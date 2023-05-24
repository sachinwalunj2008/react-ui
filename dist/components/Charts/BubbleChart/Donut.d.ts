declare const Donut: ({ size, color, cx, cy, viewBox, widthHeight, }: {
    size: number;
    color: string;
    cx?: number | undefined;
    cy?: number | undefined;
    viewBox?: string | undefined;
    widthHeight?: {
        width?: string | undefined;
        height?: string | undefined;
    } | undefined;
}) => JSX.Element;
export default Donut;
