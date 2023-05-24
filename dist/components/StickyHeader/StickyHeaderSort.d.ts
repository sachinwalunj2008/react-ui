export default StickyHeaderSort;
/**
 * @deprecated Please do not use this. These were meant to be used with Lists, but those are being deprecated.
 **/
declare function StickyHeaderSort({ header, defaultSort, options, setSortBy, redText, listLength, downloads, optGroup, optGroupingKey, optGroupSections, customClass, }: {
    header: any;
    defaultSort: any;
    options: any;
    setSortBy: any;
    redText: any;
    listLength: any;
    downloads: any;
    optGroup: any;
    optGroupingKey: any;
    optGroupSections: any;
    customClass?: string | undefined;
}): JSX.Element;
declare namespace StickyHeaderSort {
    namespace propTypes {
        const header: PropTypes.Requireable<any>;
        const defaultSort: PropTypes.Requireable<object>;
        const options: PropTypes.Requireable<any[]>;
        const setSortBy: PropTypes.Requireable<(...args: any[]) => any>;
        const listLength: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        const redText: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from "prop-types";
