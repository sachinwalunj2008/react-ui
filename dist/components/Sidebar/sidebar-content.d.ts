declare const sidebarContent: ({
    page: string;
    link: string;
    icon: string;
    pageTitle: string;
    nestedRoutes?: undefined;
} | {
    page: string;
    link: string;
    icon: string;
    pageTitle: string;
    nestedRoutes: {
        link: string;
        pageTitle: string;
    }[];
})[];
export default sidebarContent;
