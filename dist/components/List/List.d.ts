export default List;
/** @deprecated Use Table component */
declare function List({ children, customClass }: {
    children: any;
    customClass?: string | undefined;
}): JSX.Element;
declare namespace List {
    namespace propTypes {
        const children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        const customClass: PropTypes.Requireable<string>;
    }
}
import PropTypes from "prop-types";
