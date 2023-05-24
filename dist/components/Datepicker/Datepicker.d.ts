export default Datepicker;
/**
 * @deprecated Please do not use this component, Use DatePickerNew.
 **/
declare class Datepicker extends React.Component<any, any, any> {
    constructor(props: any);
    state: {
        startDate: any;
        endDate: any;
        focusedInput: null;
        preSelected: any;
        selected: any;
        showSelect: any;
        showCustom: any;
        startDateId: any;
        endDateId: any;
        focused: any;
        caretOffsetAfter: string;
        caretOffsetBefore: string;
        showAllDates: any;
    };
    componentDidMount(): void;
    datesChanged: (startDate: any, endDate: any) => void;
    updateSingleDate: (startDate: any) => void;
    handleInputFocus: (focused: any, stateName: any) => void;
    isOutsideRange: (day: any) => any;
    render(): JSX.Element;
}
declare namespace Datepicker {
    namespace propTypes {
        const hasFutureDates: PropTypes.Requireable<boolean>;
        const showAllDates: PropTypes.Requireable<boolean>;
        const onDatesChange: PropTypes.Requireable<(...args: any[]) => any>;
        const onDateChange: PropTypes.Requireable<(...args: any[]) => any>;
        const startDateId: PropTypes.Requireable<string>;
        const endDateId: PropTypes.Requireable<string>;
        const startDate: PropTypes.Requireable<object>;
        const endDate: PropTypes.Requireable<object>;
        const dateRangeFormat: PropTypes.Requireable<string>;
        const singleDateDisplayFormat: PropTypes.Requireable<string>;
        const startDatePlaceholder: PropTypes.Requireable<string>;
        const endDatePlaceholder: PropTypes.Requireable<string>;
        const preSelected: PropTypes.Requireable<string>;
        const selected: PropTypes.Requireable<string>;
        const showSelect: PropTypes.Requireable<string>;
        const showCustom: PropTypes.Requireable<string>;
        const isSingle: PropTypes.Requireable<boolean>;
        const specifiedDay: PropTypes.Requireable<object>;
        const reset: PropTypes.Requireable<boolean>;
        const resetDate: PropTypes.Requireable<(...args: any[]) => any>;
        const focused: PropTypes.Requireable<boolean>;
    }
}
import React from "react";
import PropTypes from "prop-types";
