import { NewBreadcrumbType } from './Common/BreadcrumbTypes';
type BreadcrumbArgs = {
    breadcrumb: NewBreadcrumbType;
    breadcrumbs: NewBreadcrumbType[];
};
declare const addNewBreadcrumb: ({ breadcrumb, breadcrumbs }: BreadcrumbArgs) => NewBreadcrumbType[];
declare const breadcrumbIndex: ({ breadcrumb, breadcrumbs }: BreadcrumbArgs) => number;
declare const breadcrumbNavigation: ({ breadcrumb, breadcrumbs }: BreadcrumbArgs) => NewBreadcrumbType[];
export { addNewBreadcrumb, breadcrumbIndex, breadcrumbNavigation };
