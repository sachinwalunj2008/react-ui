export type BreadcrumbType = {
    /** Link url for breadcrumb navigation */
    link: string;
    /** Name to display for the breadcrumb */
    name?: string;
};
type BreadcrumbLinkProps = {
    breadcrumb: BreadcrumbType;
    /** Optional character limit for long breadcrumb names. This utilitized trimText to cut the text and add an ellipsis. */
    characterLimit?: number;
};
declare const BreadcrumbLink: ({ breadcrumb, characterLimit, }: BreadcrumbLinkProps) => JSX.Element;
export default BreadcrumbLink;
