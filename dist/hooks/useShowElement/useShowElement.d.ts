import { MutableRefObject } from 'react';
export declare function useShowElement<T extends Element | null>(
/** Ref that is assigned to a JSX element */
ref: MutableRefObject<T>, 
/** How much of the ref element is shown before the observer is triggered. For example: 0.2 */
threshold?: number): boolean;
