import type { Dispatch, SetStateAction } from 'react';
export interface TippyHideParams {
    tippyRef: React.MutableRefObject<Element | null>;
    scrollSelector?: string;
    scrollDistance?: number;
    scrollHorizontalDistance?: number;
}
export declare const useTippyHide: ({ tippyRef, scrollSelector, scrollDistance, scrollHorizontalDistance, }: TippyHideParams) => [boolean, Dispatch<SetStateAction<boolean>>];
