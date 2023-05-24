export default ReportLoader;
/**
 * @deprecated Please do not continue to use this loader. UX does not want this used anymore.
 **/
declare function ReportLoader({ noDelay, noText, customClass, loadingMessage }: {
    noDelay: any;
    noText: any;
    customClass: any;
    loadingMessage: any;
}): JSX.Element;
declare namespace ReportLoader {
    namespace propTypes {
        const noDelay: PropTypes.Requireable<boolean>;
        const noText: PropTypes.Requireable<boolean>;
        const customClass: PropTypes.Requireable<string>;
        const loadingMessage: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
}
import PropTypes from "prop-types";
