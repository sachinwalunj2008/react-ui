type UseMediaQueryProps = {
    type: 'min' | 'max' | 'exact';
    breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};
export declare function useMediaQuery({ type, breakpoint, }: UseMediaQueryProps): boolean;
export declare function useGetExactMediaQuery(): UseMediaQueryProps['breakpoint'];
export {};
