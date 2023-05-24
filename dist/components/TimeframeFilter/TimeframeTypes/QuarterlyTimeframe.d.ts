export function getValidAggregationsForQuarterlyTimeframe(timeframe: any, customAggregations: any): any;
export function QuarterlyTimeframe({ callout, closeMenu, timeframe, useTimeframeAggregations, customAggregations, disabledTimeframeOptions, }: {
    callout: any;
    closeMenu: any;
    timeframe: any;
    useTimeframeAggregations?: boolean | undefined;
    customAggregations: any;
    disabledTimeframeOptions: any;
}): JSX.Element;
export namespace QuarterlyTimeframe {
    namespace propTypes {
        const callout: PropTypes.Validator<(...args: any[]) => any>;
        const timeframe: PropTypes.Validator<object>;
        const closeMenu: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
