export function getValidAggregationsForHistoricalTimeframe({ timeframe, startDate, endDate, customAggregations, }: {
    timeframe: any;
    startDate: any;
    endDate: any;
    customAggregations: any;
}): any;
export function HistoricalTimeframe({ callout, timeframes, closeMenu, timeframe, useTimeframeAggregations, hideCustomDateSearch, showHistoricTimeFrameDateRange, comparisonDateRange, getComparisonDateRange, customAggregations, disabledTimeframeOptions, showHistoricTimeFrameDateRangeOnMobile, }: {
    callout: any;
    timeframes: any;
    closeMenu: any;
    timeframe: any;
    useTimeframeAggregations?: boolean | undefined;
    hideCustomDateSearch?: boolean | undefined;
    showHistoricTimeFrameDateRange?: boolean | undefined;
    comparisonDateRange: any;
    getComparisonDateRange: any;
    customAggregations: any;
    disabledTimeframeOptions: any;
    showHistoricTimeFrameDateRangeOnMobile: any;
}): JSX.Element;
export namespace HistoricalTimeframe {
    namespace propTypes {
        const callout: PropTypes.Validator<(...args: any[]) => any>;
        const timeframes: PropTypes.Validator<any[]>;
        const timeframe: PropTypes.Validator<object>;
        const closeMenu: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
