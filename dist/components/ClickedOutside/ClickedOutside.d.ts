export default ClickedOutside;
/**
 * @deprecated The component should not be used and will be removed
 **/
declare class ClickedOutside extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setWrapperRef: (node: any) => void;
    wrapperRef: any;
    handleClickOutside: (event: any) => void;
    render(): JSX.Element;
}
import React from "react";
