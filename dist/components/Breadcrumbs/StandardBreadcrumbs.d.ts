import { BreadcrumbType } from './BreadcrumbLink';
export type StandardBreadcrumbsProps = {
    /** Array of breadcrumbs to display. Includes a link url and a name */
    breadcrumbs: Array<BreadcrumbType>;
    /** Optional character limit for long breadcrumb names. This utilitized trimText to cut the text and add an ellipsis. */
    characterLimit?: number;
    /** Optionally pass in a navigate function (useHistory or useNavigate hook functions) - right now only Shelf needs this until we consolidate ExtendedBreadcrumbs.tsx and ExtendedBreadcrumbsNew.js */
    navigate?: (link: string) => void;
};
declare const StandardBreadcrumbs: ({ breadcrumbs, characterLimit, }: StandardBreadcrumbsProps) => JSX.Element;
export default StandardBreadcrumbs;
