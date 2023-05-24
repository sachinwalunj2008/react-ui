export default SelectedDate;
declare function SelectedDate({ dateRangeSelected, startDate, endDate, timeframe, singleDate, showCalendar, }: {
    dateRangeSelected: any;
    startDate: any;
    endDate: any;
    timeframe: any;
    singleDate: any;
    showCalendar: any;
}): JSX.Element;
declare namespace SelectedDate {
    namespace propTypes {
        const dateRangeSelected: PropTypes.Validator<boolean>;
        const startDate: PropTypes.Requireable<string>;
        const endDate: PropTypes.Requireable<string>;
        const timeframe: PropTypes.Requireable<boolean>;
        const singleDate: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from "prop-types";
