export type ListLoadingProps = {
    /** If set to `true`, then 10 rows will be populated. Otherwise, 3 rows will be populated. */
    longList?: boolean;
    /** Removes the `slideInUp` animation. Sometimes this is necessary when in small containers because the animation will make this component appear outside of that container. */
    noSlideInUp?: boolean;
    /** This is a custom height set for the rows. This will override the default styles so do not do this unless you have a requirement to do so. */
    customHeight?: string;
    /** This is a custom grid gap between the rows. This will override the default styles so do not do this unless you have a requirement to do so. */
    customGridGap?: string;
    /** This will allow you to set a specific number of rows. This will override the default styles so do not do this unless you have a requirement to do so. */
    numberOfRows?: number;
    /** This will allow altering the style of the list loading rows. It is only to be used under the direction of UX. */
    style?: Record<string, unknown>;
};
declare const ListLoading: ({ longList, noSlideInUp, customHeight, customGridGap, numberOfRows, style, }: ListLoadingProps) => JSX.Element;
export default ListLoading;
