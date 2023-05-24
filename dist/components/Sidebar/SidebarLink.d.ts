import { SidebarContent } from './Sidebar';
interface SidebarLinkProps {
    /** This determines the content of the sidebar link and how it will display. */
    content: SidebarContent;
    /** This count is the order in which this SidebarLink appears. It helps with animation. */
    count: number;
    /** The originPath is needed to dynamically generate and set the active styles. */
    originPath: string;
    /** This function is a callout that will only be called when the SidebarLink is clicked. It resets the hover state for the Sidebar. */
    updateHover: () => void;
    /** This function is a callout that will update the active state. */
    callout: (flag: boolean) => void;
    /** This is an optional prop that will have extra margin applied to the SidebarLink */
    firstBottomLink?: boolean;
    /**
     * "highlightOrigin" prop is used to highlight the sidebar.
     * If true(for predict), we need to highlight the origin module in the current breadcrumb tree(index = 0)
     * Else we pick the first element from the current URL(path[1]) and highlight the module that matches with it.
     */
    highlightOrigin: boolean;
}
declare const SidebarLink: ({ content, count, originPath, updateHover, callout, firstBottomLink, highlightOrigin, }: SidebarLinkProps) => JSX.Element;
export default SidebarLink;
