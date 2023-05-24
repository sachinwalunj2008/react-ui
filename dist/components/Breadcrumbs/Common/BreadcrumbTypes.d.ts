export type NewBreadcrumbType = {
    /** Breadcrumb name */
    name?: string;
    /** Breadcrumb link url */
    link: string;
    /** Optional Breadcrumb type. This is used for specific checks while updating breadcrumbs. */
    changeType?: 'rootLevel' | 'tab';
    /** Optional icon to be shown next to the breadcrumbs */
    showIcon?: boolean;
};
export type NewBreadcrumbsProps = {
    /** Array of breadcrumbs to display. Includes a link url and a name */
    breadcrumbs: Array<NewBreadcrumbType>;
    /** This function should be used to set the breadcrumbs state in the consuming app and navigating to the correct page. */
    callout: (breadcrumb: NewBreadcrumbType) => void;
    /** Optional character limit for long breadcrumb names. This utilitized trimText to cut the text and add an ellipsis. */
    characterLimit?: number;
};
