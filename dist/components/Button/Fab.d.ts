export default Fab;
/** @deprecated - Please do not use this component. PrimaryActionButton is the standard for this now. */
declare function Fab({ customClass, position, menu, children, callout, verticalPosition, adjustPosition, }: {
    customClass?: string | undefined;
    position: any;
    menu: any;
    children: any;
    callout: any;
    verticalPosition: any;
    adjustPosition: any;
}): JSX.Element;
declare namespace Fab {
    namespace propTypes {
        const position: PropTypes.Requireable<string>;
        const customClass: PropTypes.Requireable<string>;
        const menu: PropTypes.Requireable<boolean>;
        const callout: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
