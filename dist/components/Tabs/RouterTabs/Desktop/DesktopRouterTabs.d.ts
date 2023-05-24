declare function DesktopRouterTabs({ children, subtabs }: {
    children: any;
    subtabs?: boolean | undefined;
}): JSX.Element;
declare namespace DesktopRouterTabs {
    namespace propTypes {
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike[]>;
        const subtabs: PropTypes.Requireable<boolean>;
        const mobileConfig: PropTypes.Requireable<any[]>;
    }
}
export default DesktopRouterTabs;
import PropTypes from "prop-types";
