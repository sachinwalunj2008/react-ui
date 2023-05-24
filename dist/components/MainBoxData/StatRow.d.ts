import React from 'react';
import type { StatFigureProps } from './StatFigure';
interface StatsProp extends StatFigureProps {
    stats?: StatFigureProps[];
}
type StatRowProps = {
    stats: StatsProp[];
    loading?: boolean;
    showMultipleStatsVertically?: boolean;
    CustomStatFiguresWrapper?: React.ReactNode;
};
/**
 * @deprecated Please use HeaderMetricGroup instead
 **/
declare const StatRow: ({ stats, loading, showMultipleStatsVertically, CustomStatFiguresWrapper, }: StatRowProps) => JSX.Element;
export default StatRow;
