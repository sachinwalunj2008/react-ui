export default BulkActions;
/**
 * @deprecated This component should not be used. Please use PrimaryActionButton instead.
 **/
declare function BulkActions({ icon, customText, children, buttonClass, customClass, disabled, }: {
    icon: any;
    customText: any;
    children: any;
    buttonClass: any;
    customClass?: string | undefined;
    disabled: any;
}): JSX.Element;
declare namespace BulkActions {
    namespace propTypes {
        const icon: PropTypes.Requireable<string>;
        const customText: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const children: PropTypes.Requireable<any>;
        const buttonClass: PropTypes.Requireable<string>;
        const customClass: PropTypes.Requireable<string>;
        const disabled: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from "prop-types";
