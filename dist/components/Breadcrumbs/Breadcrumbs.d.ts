import { StandardBreadcrumbsProps } from './StandardBreadcrumbs';
export type BreadcrumbsType = StandardBreadcrumbsProps & {
    isNewBreadcrumbs?: boolean;
    navigateFromBreadcrumbs?: (index?: number, link?: string) => void;
    /** This prop is a temporary fix to have a back arrow button visible when breadcrumb length is 1 and previousPageUrl is available */
    /** Right now this prop is only used for the Shelf eventually this will be removed once we have a common breadcrumb experience */
    previousPageUrl?: string;
};
declare const Breadcrumbs: ({ breadcrumbs, characterLimit, isNewBreadcrumbs, navigateFromBreadcrumbs, navigate, previousPageUrl, }: BreadcrumbsType) => JSX.Element;
export default Breadcrumbs;
