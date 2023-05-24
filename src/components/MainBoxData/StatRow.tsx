import React from 'react'
import { StatFigure } from '../../module'
import type { StatFigureProps } from './StatFigure'

interface StatsProp extends StatFigureProps {
  stats?: StatFigureProps[]
}
type StatRowProps = {
  stats: StatsProp[]
  loading?: boolean
  showMultipleStatsVertically?: boolean
  CustomStatFiguresWrapper?: React.ReactNode
}

/**
 * @deprecated Please use HeaderMetricGroup instead
 **/
const StatRow = ({
  stats,
  loading,
  showMultipleStatsVertically,
  CustomStatFiguresWrapper = null,
}: StatRowProps): JSX.Element => {
  const StatFiguresWrapper = (CustomStatFiguresWrapper ||
    React.Fragment) as React.ElementType

  return (
    <>
      {stats.map((e, i) => {
        if (e.stats) {
          return (
            <React.Fragment key={`${i}-${e.title || 'stat'}`}>
              <div
                className={`multiple-stats ${
                  !showMultipleStatsVertically && 'flex'
                }`}
              >
                {e.stats.map((s, index) => {
                  return (
                    <React.Fragment key={index}>
                      {/* @ts-expect-error React 18 issue? */}
                      <StatFiguresWrapper>
                        <StatFigure
                          {...s}
                          loading={loading}
                          multipleStats
                          multipleStatsVertical={showMultipleStatsVertically}
                          customClass={s.customClass ? s.customClass : ''}
                        />
                      </StatFiguresWrapper>
                      {!showMultipleStatsVertically &&
                        index !== (e?.stats?.length ?? 0) - 1 && (
                          <div className='mini-divider' />
                        )}
                    </React.Fragment>
                  )
                })}
              </div>
              {i !== stats.length - 1 && <div className='divider' />}
            </React.Fragment>
          )
        } else {
          return (
            <React.Fragment key={i}>
              {/* @ts-expect-error React 18 issue? */}
              <StatFiguresWrapper>
                <StatFigure
                  {...e}
                  loading={loading}
                  customClass={e.customClass ? e.customClass : ''}
                />
              </StatFiguresWrapper>
              {i !== stats.length - 1 && <div className='divider' />}
            </React.Fragment>
          )
        }
      })}
    </>
  )
}

export default StatRow
