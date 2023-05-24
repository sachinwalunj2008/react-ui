import React from 'react'
import { Link } from 'react-router-dom'
import { InfoTooltip, Tooltip } from '../../module'
import StatRow from './StatRow'
import type { StatFigureProps } from './StatFigure'
import type { TooltipProps } from '../Tooltip/Tooltip'
import type { InfoTooltipProps } from '../InfoTooltip/InfoTooltip'

type MainBoxDataProps = {
  /** array of stats to display */
  statFigures?: StatFigureProps[]
  /** Custom JSX element that will display on the left side of the element */
  customLeftChild?: React.ReactNode
  /** Custom JSX element that will display on the right side of the element */
  customRightChild?: React.ReactNode
  customPreStatFigureChild?: React.ReactNode
  /** tooltip associated with an info icon on the right side of the element */
  tooltipData?: InfoTooltipProps & {
    img?: string
  }
  reportLink?: string
  /** JSX element that will display on the right side of the display element but on the left of the separation bar */
  downloads?: React.ReactNode
  /** JSX element that will display on the right side of the display element but on the right of the separation bar */
  timeframeFilter?: React.ReactNode
  /** JSX element that will display on the right side of the display element but on the right of the separation bar */
  filters?: React.ReactNode
  loading?: boolean
  customClass?: string
  CustomStatFiguresWrapper?: React.ReactNode
  maxStatsInTheHeader?: number
  statTooltipClass?: string
  statTooltipText?: string
  tooltipStatContainerClass?: string
  tooltipPosition?: TooltipProps['position']
  showMultipleStatsVertically?: boolean
}

const MainBoxData = ({
  statFigures,
  customLeftChild,
  customRightChild,
  customPreStatFigureChild = null,
  tooltipData,
  reportLink,
  downloads,
  timeframeFilter,
  filters,
  loading,
  customClass = '',
  CustomStatFiguresWrapper = null,
  maxStatsInTheHeader,
  statTooltipClass,
  statTooltipText = 'Show Additional Metrics',
  tooltipStatContainerClass,
  tooltipPosition,
  showMultipleStatsVertically,
}: MainBoxDataProps): JSX.Element => {
  const [statsInTheHeader, statsInTheTooltip] =
    statFigures &&
    maxStatsInTheHeader &&
    maxStatsInTheHeader < statFigures?.length
      ? [
          statFigures.slice(0, maxStatsInTheHeader),
          statFigures.slice(maxStatsInTheHeader, statFigures.length),
        ]
      : [statFigures, null]

  return (
    <div className={`main-box-data ${customClass}`}>
      {statsInTheHeader && (
        <div className='stat-figures'>
          {customPreStatFigureChild && (
            <>
              {customPreStatFigureChild}
              <div className='divider' />
            </>
          )}
          <StatRow
            loading={loading}
            CustomStatFiguresWrapper={CustomStatFiguresWrapper}
            stats={statsInTheHeader}
            showMultipleStatsVertically={showMultipleStatsVertically}
          />
          {statsInTheTooltip && statsInTheTooltip.length > 0 && (
            <>
              <div className='divider' />
              <Tooltip
                tooltipContent={
                  <div className='main-box-data'>
                    <div className='stat-figures'>
                      <div
                        className={`tooltip-stat ${tooltipStatContainerClass} flex align-items-center`}
                      >
                        <StatRow
                          loading={loading}
                          CustomStatFiguresWrapper={CustomStatFiguresWrapper}
                          stats={statsInTheTooltip}
                        />
                      </div>
                    </div>
                  </div>
                }
                position={tooltipPosition || 'bottom'}
                customClass={`stat-tooltip-container ${statTooltipClass}`}
                maxWidth='max-content'
              >
                <div className='flex align-items-center justify-content-center'>
                  {typeof statTooltipText === 'string' ? (
                    <span className='tooltip-text'>{statTooltipText}</span>
                  ) : (
                    statTooltipText
                  )}
                </div>
              </Tooltip>
            </>
          )}
        </div>
      )}
      {customLeftChild && customLeftChild}
      <div className='right-section flex align-items-center'>
        {(reportLink || downloads || tooltipData) && (
          <div className='left-download-section'>
            {reportLink && (
              <Link to={reportLink}>
                <span className='view-report uppercase'>View Report</span>
              </Link>
            )}
            {downloads && downloads}
            {tooltipData && (
              <InfoTooltip
                image={tooltipData.img}
                title={tooltipData.title}
                text={tooltipData.text}
                customNode={tooltipData.customNode}
                customClass={tooltipData.customClass}
                position={tooltipData.position}
                maxWidth={tooltipData.maxWidth}
                useSideDrawerForMobile={tooltipData.useSideDrawerForMobile}
                size='sm'
              />
            )}
            {(reportLink || downloads || tooltipData) &&
              (timeframeFilter || filters) && <div className='divider' />}
          </div>
        )}
        {customRightChild && customRightChild}
        <div className='sub-section flex align-items-center right-of-divider'>
          {timeframeFilter && timeframeFilter}
          {filters && filters}
        </div>
      </div>
    </div>
  )
}

export default MainBoxData
