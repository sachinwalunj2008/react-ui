export default GraphLoading;
declare function GraphLoading({ size, height, lineCustomHeight }: {
    size: any;
    height: any;
    lineCustomHeight?: number | undefined;
}): JSX.Element;
declare namespace GraphLoading {
    namespace propTypes {
        const size: PropTypes.Requireable<string>;
        const height: PropTypes.Requireable<number>;
        const lineCustomHeight: PropTypes.Requireable<number>;
    }
}
import PropTypes from "prop-types";
