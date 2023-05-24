import { NewBreadcrumbsProps, NewBreadcrumbType } from './BreadcrumbTypes';
declare const BreadcrumbArrow: () => JSX.Element;
type BreadcrumbPopoverContentProps = {
    /** Array of breadcrumbs */
    breadcrumbs: Array<NewBreadcrumbType>;
    /** Function to close the popover */
    close: () => void;
    /** Breadcrumb callout */
    callout: NewBreadcrumbsProps['callout'];
    /** Optionally remove the 1st and last index of the breadcrumbs so they are not shown in the popover. Only the Desktop experience needs this. */
    isDesktop?: boolean;
};
declare const BreadcrumbPopoverContent: ({ breadcrumbs, close, callout, isDesktop, }: BreadcrumbPopoverContentProps) => JSX.Element;
export { BreadcrumbArrow, BreadcrumbPopoverContent };
