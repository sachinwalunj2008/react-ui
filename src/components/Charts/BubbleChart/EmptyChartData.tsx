import React from 'react'
import {
  CartesianGrid,
  Label,
  Legend,
  ReferenceArea,
  ReferenceLine,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import { useMediaQuery } from '../../../hooks/responsiveHooks'
import { defaultScatterChartProps as defaults } from './bubbleChartConstants'
import { labelStyle } from './BubbleChartCommon'
import { BubbleChartProps } from './model'

const EmptyChartData = ({
  chart,
  subTitle,
  legend,
  yAxis,
  loading,
  height,
  showEmptyChart,
}: BubbleChartProps): JSX.Element => {
  const isMobile = useMediaQuery({ type: 'max', breakpoint: 'md' })
  return (
    <ResponsiveContainer width='99%' height={height}>
      {showEmptyChart ? (
        <ScatterChart
          width={chart?.width ?? defaults.width}
          height={chart?.height ?? defaults.height}
          margin={{
            top: 20,
            right: 40,
            bottom: 20,
            left: 0,
          }}
        >
          <CartesianGrid />
          <XAxis
            xAxisId='top'
            orientation='top'
            dataKey='x'
            domain={[-3, 3]}
            tickCount={7}
            type='number'
            stroke='transparent'
            tickLine={false}
          >
            <Label
              value={chart?.title?.text}
              style={labelStyle(chart?.title)}
              position='center'
            />
            {!isMobile && (
              <Label
                value={!isMobile ? subTitle?.topLeft?.text : ''}
                position='insideTopLeft'
                offset={10}
                style={labelStyle(subTitle?.topLeft)}
              />
            )}
            {!isMobile && (
              <Label
                value={!isMobile ? subTitle?.topRight?.text : ''}
                position='insideTopRight'
                offset={10}
                style={labelStyle(subTitle?.topRight)}
              />
            )}
          </XAxis>
          <XAxis
            orientation='bottom'
            dataKey='x'
            domain={[-3, 3]}
            tickCount={7}
            type='number'
            stroke='transparent'
            tickLine={false}
          >
            <Label
              value={chart?.bottomTitle?.text}
              style={labelStyle(chart?.bottomTitle)}
              position='bottom'
            />
            {!isMobile && (
              <Label
                value={!isMobile ? subTitle?.bottomLeft?.text : ''}
                position='insideBottomLeft'
                offset={10}
                style={labelStyle(subTitle?.bottomLeft)}
              />
            )}
            {!isMobile && (
              <Label
                value={!isMobile ? subTitle?.bottomRight?.text : ''}
                position='insideBottomRight'
                offset={10}
                style={labelStyle(subTitle?.bottomRight)}
              />
            )}
          </XAxis>

          <YAxis
            dataKey='y'
            orientation='left'
            domain={[-3, 3]}
            tickCount={9}
            type='number'
            tickLine={false}
            stroke='transparent'
          >
            {!isMobile && chart?.leftTitle?.text && yAxis?.display === 'right' && (
              <Label
                style={{
                  fontWeight: chart?.leftTitle?.bold ? 'bold' : 'regular',
                  fontSize: '12px',
                }}
                value={chart?.leftTitle?.text ?? ''}
                position='center'
                angle={-90}
                offset={0}
              />
            )}
          </YAxis>
          <YAxis
            dataKey='y'
            orientation='right'
            domain={[-3, 3]}
            tickCount={9}
            type='number'
            tickLine={false}
            stroke='transparent'
          >
            {!isMobile &&
              chart?.rightTitle?.text &&
              (!yAxis?.display || yAxis?.display === 'left') && (
                <Label
                  style={{
                    fontWeight: chart?.rightTitle?.bold ? 'bold' : 'regular',
                    fontSize: '12px',
                  }}
                  value={chart?.rightTitle?.text ?? ''}
                  position='center'
                  angle={-90}
                  offset={0}
                />
              )}
          </YAxis>
          <ReferenceArea
            id='quadrant-1'
            x1={0}
            y1={0}
            fill={
              loading ? 'var(--medium-purple)' : 'var(--chart-light-5-green)'
            }
            fillOpacity={0.25}
          />
          <ReferenceArea
            id='quadrant-2'
            x1={0}
            y2={0}
            fill={
              loading ? 'var(--medium-purple)' : 'var(--chart-light-5-yellow)'
            }
            fillOpacity={0.25}
          />
          <ReferenceArea
            id='quadrant-3'
            x2={0}
            y1={0}
            fill={
              loading ? 'var(--medium-purple)' : 'var(--chart-light-5-yellow)'
            }
            fillOpacity={0.25}
          />
          <ReferenceArea
            id='quadrant-4'
            x2={0}
            y2={0}
            fill={loading ? 'var(--medium-purple)' : 'var(--chart-light-5-red)'}
            fillOpacity={0.25}
          />
          <ReferenceLine
            x={0}
            stroke={'var(--black)'}
            opacity={loading ? 0 : 0.25}
          />
          <ReferenceLine
            y={0}
            stroke={'var(--black)'}
            opacity={loading ? 0 : 0.25}
          />

          {loading && (
            <ReferenceArea
              fillOpacity={1}
              fill={'var(--chart-light-5-red)'}
              id='blank_chart'
              x1={0}
              x2={0}
              y1={0}
              y2={0}
            >
              <Label
                style={{ fill: 'var(--purple)', fontSize: '14px' }}
                value={'Loading...'}
                position='center'
              />
            </ReferenceArea>
          )}
          <Scatter />
          {!isMobile && !!legend && (
            <Legend
              verticalAlign='bottom'
              content={legend}
              wrapperStyle={{ bottom: '-16px' }}
            />
          )}
        </ScatterChart>
      ) : (
        <ScatterChart>
          <XAxis domain={[-1, 1]} hide></XAxis>
          <YAxis domain={[-1, 1]} hide />
          <ReferenceArea
            id='blank_chart'
            fill={'#70757b'}
            x1={-1}
            x2={1}
            y1={-1}
            y2={1}
          >
            <Label
              value={chart?.noDataMessage || 'No Data Available'}
              position='center'
            />
          </ReferenceArea>
        </ScatterChart>
      )}
    </ResponsiveContainer>
  )
}

export default EmptyChartData
