export default Confirmation;
/**
 * @deprecated Please do not use this component
 **/
declare class Confirmation extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
declare namespace Confirmation {
    namespace propTypes {
        const icon: PropTypes.Requireable<string>;
        const children: PropTypes.Requireable<PropTypes.ReactElementLike>;
        const customClasses: PropTypes.Requireable<object>;
    }
}
import React from "react";
import PropTypes from "prop-types";
