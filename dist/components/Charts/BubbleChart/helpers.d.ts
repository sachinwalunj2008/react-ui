export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;
};
export type Line = {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
};
export declare const rectsIntersect: (rect: Rect, occupiedArr: Array<Rect>) => boolean;
export declare const crossesLines: (rect: Rect, lines: Line[]) => boolean;
export declare const noIntersectingLabelLinesWithRects: (line: Line, lines: Line[], rects: Rect[]) => boolean;
export declare const quadrant1PositionPriority: string[];
export declare const quadrant2PositionPriority: string[];
export declare const quadrant3PositionPriority: string[];
export declare const quadrant4PositionPriority: string[];
export declare const getQuadrant: (xValue: number, yValue: number, refX: number, refY: number) => 1 | 2 | 3 | 4;
export declare const displayLabelName: (name?: string) => {
    name1: string;
    name2: string;
};
