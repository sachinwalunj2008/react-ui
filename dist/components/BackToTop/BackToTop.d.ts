/**
 * @deprecated This component was used for Lists. Now that we are using Tables, this component is no longer useful.
 **/
declare const BackToTop: ({ listLength, containerId, goTo, offset, }: BackToTopProps) => JSX.Element;
export default BackToTop;
type BackToTopProps = {
    /** Number of items in list */
    listLength: number;
    /** Optional container id*/
    containerId?: string;
    /** Optional string to scroll to different place */
    goTo?: string;
    /** How many pixels to offset */
    offset?: number;
};
