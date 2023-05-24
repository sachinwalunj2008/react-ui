export default TimeframeFilterBody;
declare function TimeframeFilterBody({ callout, historicalTimeframes, timeframe, currentTimeframe, quarterlyTimeframe, closeMenu, useTimeframeAggregations, customAggregations, startDate, endDate, disableTimeFrameFilter, hideCustomDateSearch, showHistoricTimeFrameDateRange, showHistoricTimeFrameDateRangeOnMobile, comparisonDateRange, getComparisonDateRange, disabledTimeframeOptions, updateToValidFilterState, }: {
    callout: any;
    historicalTimeframes: any;
    timeframe: any;
    currentTimeframe: any;
    quarterlyTimeframe: any;
    closeMenu: any;
    useTimeframeAggregations?: boolean | undefined;
    customAggregations: any;
    startDate: any;
    endDate: any;
    disableTimeFrameFilter?: boolean | undefined;
    hideCustomDateSearch?: boolean | undefined;
    showHistoricTimeFrameDateRange?: boolean | undefined;
    showHistoricTimeFrameDateRangeOnMobile?: boolean | undefined;
    comparisonDateRange: any;
    getComparisonDateRange: any;
    disabledTimeframeOptions?: undefined;
    updateToValidFilterState?: (() => null) | undefined;
}): JSX.Element;
declare namespace TimeframeFilterBody {
    namespace propTypes {
        const callout: PropTypes.Validator<(...args: any[]) => any>;
        const timeframe: PropTypes.Validator<object>;
        const historicalTimeframes: PropTypes.Requireable<any[]>;
        const currentTimeframe: PropTypes.Requireable<boolean>;
        const quarterlyTimeframe: PropTypes.Requireable<boolean>;
        const closeMenu: PropTypes.Requireable<(...args: any[]) => any>;
        const disableTimeFrameFilter: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from "prop-types";
