/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from 'react'
import {
  CartesianGrid,
  Label,
  LabelList,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import { isEqual, uniqBy } from 'lodash'

import { useMediaQuery } from '../../../hooks/responsiveHooks'
import { useWindowSize } from '../../../hooks'

import DonutIcon from './Donut'
import type { BubbleChartProps, BubbleData } from './model'
import { defaultScatterChartProps as defaults } from './bubbleChartConstants'
import { labelStyle } from './BubbleChartCommon'
import EmptyChartData from './EmptyChartData'
import {
  crossesLines,
  rectsIntersect,
  displayLabelName,
  getQuadrant,
  quadrant1PositionPriority,
  quadrant2PositionPriority,
  quadrant3PositionPriority,
  quadrant4PositionPriority,
  noIntersectingLabelLinesWithRects,
} from './helpers'
import type { Line, Rect } from './helpers'

import styles from './_winnability.module.scss'

const donutRadius = [3, 5, 8, 13, 21, 34]

const BubbleChart = ({
  numBubbleNamesToDisplay = 10,
  chart,
  data = [],
  quadrantColors,
  subTitle,
  xAxis,
  yAxis,
  CustomTooltip,
  legend,
  loading,
  showEmptyChart,
}: BubbleChartProps): JSX.Element => {
  const isMobile = useMediaQuery({ type: 'max', breakpoint: 'md' }),
    { width } = useWindowSize(),
    [height, setHeight] = useState(0),
    [refX, setRefX] = useState(0),
    [refY, setRefY] = useState(0),
    [range, setRange] = useState({
      x: 0,
      xMax: defaults.xMax,
      xMin: defaults.xMin,
      y: 0,
      yMax: 0,
      yMin: 0,
    }),
    [largestDonuts, setLargestDonuts] = useState([0]),
    xTicks = xAxis?.ticks ?? defaults.xTicks,
    yTicks = yAxis?.ticks ?? defaults.yTicks,
    occupied = useRef<Array<Rect>>([]),
    labelLines = useRef<Array<Line>>([])

  const updateOccupiedArray = (rect: Rect) => {
    // If a rect is already in the array and the values have changed, update it
    const occupiedRect = occupied.current.find(
      (occupied) => occupied.id === rect.id
    )
    if (occupiedRect) {
      const isUnchanged = isEqual(occupiedRect, rect)

      if (isUnchanged) {
        // No changes to the rect, so don't update the array
        return
      } else {
        const updatedOccupiedSpace: Array<Rect> = [...occupied.current],
          occupiedIndex = updatedOccupiedSpace.findIndex(
            (occRect) => occRect.id === rect.id
          )

        occupied.current = uniqBy(
          [
            rect,
            ...updatedOccupiedSpace.slice(0, occupiedIndex),
            ...updatedOccupiedSpace.slice(occupiedIndex + 1),
          ],
          'id'
        )
      }
      // Otherwise, add it to the array
    } else {
      occupied.current = uniqBy([rect, ...occupied.current], 'id')
    }
  }

  const updateLabelLines = (line: Line) => {
    const renderedLine = labelLines.current.find((labelLine: Line) =>
      isEqual(labelLine, line)
    )

    if (renderedLine) {
      return // line already in the array, so don't update
    } else {
      labelLines.current.push(line)
    }
  }

  const findOpenLabelSpace = (
    bubbleSize: number,
    labelBox: { width: number; height: number },
    name: string,
    quadrant: number,
    startPosition: { cx: number; cy: number }
  ): {
    linePosition: { x: number; y: number }
    labelPosition: { x: number; y: number }
    openSpace: boolean
  } => {
    const establishedLabelPosition = occupied.current.find(
      (occupiedSpace) => occupiedSpace.id === `label_${name}`
    )

    // use specific position priority for each quadrant so that best position is chosen first
    const possiblePositions = [
        quadrant1PositionPriority,
        quadrant2PositionPriority,
        quadrant3PositionPriority,
        quadrant4PositionPriority,
      ][quadrant - 1],
      linePosition = {
        x: startPosition.cx,
        y: startPosition.cy,
      },
      labelPosition = { x: startPosition.cx, y: startPosition.cy }

    let openSpace = false,
      loops = 0,
      lineLength = donutRadius[Math.min(bubbleSize, 5)]

    // TODO: determine what to do if there is no open space after 5 loops
    while (!openSpace && loops < 5) {
      lineLength =
        donutRadius[Math.min(bubbleSize, 5)] +
        20 * loops + // extend the length of the line by 20px for each loop
        Math.max(bubbleSize, 5) // to extend line beyond bubble a little

      for (let i = 0; i < possiblePositions.length; i++) {
        const position = possiblePositions[i]
        const labelRect: Rect = {
          x: startPosition.cx,
          y: startPosition.cy,
          width: labelBox.width,
          height: labelBox.height,
          id: `label_${name}`,
        }

        // set unique values for each position
        switch (position) {
          case 'top-left':
            labelRect.x = startPosition.cx - lineLength - labelBox.width / 2 // (width / 2) centers the label with the line
            labelRect.y = startPosition.cy - lineLength - labelBox.height // height places the label box above the line
            linePosition.x = startPosition.cx - lineLength
            linePosition.y = startPosition.cy - lineLength
            break
          case 'top-right':
            labelRect.x = startPosition.cx + lineLength - labelBox.width / 2
            labelRect.y = startPosition.cy - labelBox.height - lineLength
            linePosition.x = startPosition.cx + lineLength
            linePosition.y = startPosition.cy - lineLength
            break
          case 'bottom-right':
            labelRect.x = startPosition.cx + lineLength - labelBox.width / 2
            labelRect.y = startPosition.cy + lineLength + 10
            linePosition.x = startPosition.cx + lineLength
            linePosition.y = startPosition.cy + lineLength
            break
          case 'bottom-left':
            labelRect.x = startPosition.cx - lineLength - labelBox.width / 2
            labelRect.y = startPosition.cy + lineLength + 10
            linePosition.x = startPosition.cx - lineLength
            linePosition.y = startPosition.cy + lineLength
            break
          case 'top':
            labelRect.x = startPosition.cx - labelBox.width / 2
            labelRect.y = startPosition.cy - lineLength - labelBox.height
            linePosition.x = startPosition.cx
            linePosition.y = startPosition.cy - lineLength
            break
          case 'right':
            labelRect.x = startPosition.cx + lineLength + 10
            labelRect.y = startPosition.cy
            linePosition.x = startPosition.cx + lineLength
            linePosition.y = startPosition.cy
            break
          case 'bottom':
            labelRect.x = startPosition.cx - labelBox.width / 2
            labelRect.y = startPosition.cy + lineLength + 10
            linePosition.x = startPosition.cx
            linePosition.y = startPosition.cy + lineLength
            break
          case 'left':
            labelRect.x = startPosition.cx - lineLength - labelBox.width - 10
            labelRect.y = startPosition.cy
            linePosition.x = startPosition.cx - lineLength
            linePosition.y = startPosition.cy
            break
          default:
            break
        }

        // if the label already has a position, use it instead and stop the loop
        if (isEqual(labelRect, establishedLabelPosition)) {
          openSpace = true
          labelPosition.x = labelRect.x
          labelPosition.y = labelRect.y
          break
        }

        const newLabelLine = {
          x1: startPosition.cx,
          x2: linePosition.x,
          y1: startPosition.cy,
          y2: linePosition.y,
        }

        // if the label doesn't intersect any occupied spaces, use it and stop the loop
        if (
          !rectsIntersect(labelRect, occupied.current) &&
          !crossesLines(labelRect, labelLines.current) &&
          !noIntersectingLabelLinesWithRects(
            newLabelLine,
            labelLines.current,
            occupied.current
          )
        ) {
          openSpace = true
          labelPosition.x = labelRect.x
          labelPosition.y = labelRect.y
          updateOccupiedArray(labelRect)
          updateLabelLines(newLabelLine)
          break
        }
      }

      loops++
    }

    return { labelPosition, linePosition, openSpace }
  }

  const Donut = (props: {
    cx: number
    cy: number
    color: string
    bubbleSize: number
    name: string
  }) => {
    const bubbleSize = props.bubbleSize > 5 ? 5 : props.bubbleSize
    const size = donutRadius[bubbleSize]

    // NOTE: This rect creates a bounding box around the donut icon so that we can check if the label intersects with it
    const rect = {
      x: props.cx - size,
      y: props.cy - size,
      width: size * 2,
      height: size * 2,
      id: `donut_${props.name}`,
    }
    updateOccupiedArray(rect)

    return (
      <DonutIcon size={size} color={props.color} cx={props.cx} cy={props.cy} />
    )
  }

  const dynamicCalloutLabel = (props: {
    index?: number
    name?: string
    cx?: number | string
    cy?: number | string
    z?: number | string
  }) => {
    const { index = 0, name = '' } = props
    if (!largestDonuts.includes(data[index].z) || !name) return <></>

    const { x: xValue, y: yValue } = data[index]
    const quadrant = getQuadrant(xValue, yValue, refX, refY)

    const cx = Number(props.cx),
      cy = Number(props.cy),
      { bubbleSize } = data[index],
      textStyle = { fontSize: '10px' }

    // determine the width and height of the label box
    const labelWidth = name.length < 30 ? name.length * 5 : 150,
      labelHeight = name.length < 30 ? 10 : 20

    const startingPoint = { cx, cy },
      dimensions = { width: labelWidth, height: labelHeight }

    const { linePosition, labelPosition, openSpace } = findOpenLabelSpace(
      bubbleSize,
      dimensions,
      name,
      quadrant,
      startingPoint
    )

    const { name1 = '', name2 = '' } = openSpace ? displayLabelName(name) : {}

    return (
      <svg>
        <line
          x1={cx}
          x2={openSpace ? linePosition.x : cx}
          y1={cy}
          y2={openSpace ? linePosition.y : cy}
          stroke={openSpace ? 'black' : 'transparent'}
        />
        <text x={labelPosition.x} y={labelPosition.y} style={textStyle}>
          {name1}
        </text>
        {name2 && (
          <text x={labelPosition.x} y={labelPosition.y + 10} style={textStyle}>
            {name2}
          </text>
        )}
      </svg>
    )
  }

  // const calloutLabel = (props: {
  //   index?: number
  //   name?: string
  //   cx?: number | string
  //   cy?: number | string
  //   z?: number | string
  // }) => {
  //   const { index = 0, name } = props
  //   const cx = Number(props.cx)
  //   const cy = Number(props.cy)
  //   const { bubbleSize, x, y } = data[index]

  //   if (!largestDonuts.includes(data[index].z) || !name) return <></>

  //   const lineLength = donutRadius[Math.min(bubbleSize, 5)] + 10
  //   const atAngle = lineLength / Math.sqrt(2)
  //   const x2 = cx + (x < refX ? -atAngle : atAngle)
  //   const y2 = cy + (y < refY ? atAngle : -atAngle)
  //   const yPosition = y < refY ? 'down' : 'up'

  //   const NameText = ({
  //     name,
  //     baseX,
  //     baseY,
  //     yPosition,
  //   }: {
  //     name: string
  //     baseX: number
  //     baseY: number
  //     yPosition: 'up' | 'down'
  //   }) => {
  //     const textStyle = { fontSize: '10px' }

  //     if (name.length < 30) {
  //       const textOffset = name.length * 2.5
  //       const startX = baseX - textOffset
  //       const startY = baseY + (yPosition === 'up' ? -10 : 10)

  //       return (
  //         <text x={startX} y={startY} style={textStyle}>
  //           {name}
  //         </text>
  //       )
  //     }
  //     const nameWordArray = name.slice(0, 60).split(' ')
  //     let namePart1 = '',
  //       namePart2 = ''

  //     for (let i = 0; i < nameWordArray.length; i++) {
  //       if (namePart1.length + nameWordArray[i].length < 30) {
  //         namePart1 += `${nameWordArray[i]} `
  //       } else if (namePart2.length + nameWordArray[i].length < 30) {
  //         namePart2 += `${nameWordArray[i]} `
  //       } else {
  //         namePart2 += `${nameWordArray[i]}`
  //         namePart2 = namePart2.slice(0, 28) + '...'
  //         break
  //       }
  //     }

  //     namePart1.trim()
  //     namePart2.trim()
  //     const textOffset = namePart1.length * 2.5
  //     const startX = baseX - textOffset
  //     const startY = baseY + (yPosition === 'up' ? -25 : 10)

  //     return (
  //       <>
  //         <text x={startX} y={startY} style={textStyle}>
  //           {namePart1}
  //         </text>
  //         <text x={startX} y={startY + 15} style={textStyle}>
  //           {namePart2}
  //         </text>
  //       </>
  //     )
  //   }

  //   return (
  //     <svg>
  //       <line x1={cx} x2={x2} y1={cy} y2={y2} stroke='black' />
  //       <NameText name={name} baseX={x2} baseY={y2} yPosition={yPosition} />
  //     </svg>
  //   )
  // }

  const customYTicks = (props: {
    x: number
    y: number
    payload: { value: number }
  }) => {
    const xPosition =
      !yAxis?.display || yAxis?.display === 'left' ? props.x - 15 : props.x
    const { value } = props.payload
    const yTick =
      Math.abs(value) > 1000000
        ? Math.floor(value / 1000000) + 'M'
        : Math.abs(value) > 1000
        ? Math.floor(value / 1000) + 'K'
        : value
    return (
      <svg>
        <text x={xPosition} y={props.y} dy={5} className={styles.yTicks}>
          {yTick}
        </text>
      </svg>
    )
  }

  const customXTicks = (props: {
    x: number
    y: number
    payload: { value: number }
  }) => {
    const { value } = props.payload
    const xTick = value.toFixed(xAxis?.tickFixed ?? 0)
    return (
      <svg>
        <text
          x={props.x}
          y={props.y}
          dy={10}
          textAnchor='middle'
          className={styles.xTicks}
        >
          {xTick}
        </text>
      </svg>
    )
  }

  /** Set X & Y axis ranges */
  useEffect(() => {
    if (!data || data.length === 0) return
    const zSizes: number[] = []
    let minX = xAxis?.range ? xAxis.range[0] : 0,
      maxX = xAxis?.range ? xAxis.range[1] : 0,
      minY = yAxis?.range ? yAxis.range[0] : 0,
      maxY = yAxis?.range ? yAxis.range[1] : 0

    data.forEach((data: BubbleData) => {
      if (data.x > maxX) maxX = data.x
      if (data.x < minX) minX = data.x
      if (data.y > maxY) maxY = data.y
      if (data.y < minY) minY = data.y
      zSizes.push(data.z)
    })
    const largestZSizesToDisplay = zSizes
      .sort((a, b) => b - a)
      .slice(0, numBubbleNamesToDisplay)
    setLargestDonuts(largestZSizesToDisplay)

    const xRef = xAxis?.ref?.value ?? (minX + maxX) / 2
    setRefX(xRef)

    const yRef = yAxis?.ref ? yAxis.ref.value : (minY + maxY) / 2
    setRefY(yRef)

    const yBuffer = (maxY - minY) / (yTicks - 1)
    const xBuffer = (maxX - minX) / (xTicks - 1)
    const newXMax = Math.ceil(maxX + xBuffer)
    const newXMin = Math.floor(minX - xBuffer)
    setRange({
      x: maxX - minX,
      xMax: xAxis?.max ?? newXMax,
      xMin: xAxis?.min ?? newXMin,
      y: maxY - minY,
      yMax: Math.max(maxY, yRef) + yBuffer,
      yMin: Math.min(minY, yRef) - yBuffer,
    })
  }, [data, numBubbleNamesToDisplay, refX, refY, xAxis, xTicks, yAxis, yTicks])

  /** Set && Update chart aspect ratio for changing screen sizes */
  useEffect(() => {
    if (width) {
      const aspect = chart?.aspectRatio
      if (aspect) {
        setHeight(width / aspect)
      } else {
        if (width < 400) setHeight(200)
        if (width >= 600) setHeight(300)
        if (width >= 800) setHeight(400)
        if (width >= 1000) setHeight(500)
        if (width >= 1200) setHeight(600)
      }
    }
  }, [chart?.aspectRatio, width])

  return (
    <>
      {/* ******************************** NO DATA MESSAGE ******************************** */}
      {!data || data.length === 0 ? (
        <EmptyChartData
          data={data}
          chart={chart}
          subTitle={subTitle}
          legend={legend}
          yAxis={yAxis}
          loading={loading}
          height={height}
          showEmptyChart={showEmptyChart}
        />
      ) : (
        <ResponsiveContainer width='99%' height={height}>
          <ScatterChart
            width={defaults.width}
            height={defaults.height}
            margin={{
              top: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid />

            {/*************************** SET X AXIS AND Y AXIS ***************************************/}
            <XAxis
              xAxisId='top'
              orientation='top'
              type='number'
              dataKey='x'
              domain={[range.xMin, range.xMax]}
              unit=''
              stroke='transparent'
              tickLine={false}
              tickCount={xTicks}
              tickMargin={
                subTitle?.bottomLeft?.text || subTitle?.bottomRight?.text
                  ? 20
                  : 0
              }
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
              type='number'
              dataKey='x'
              domain={[range.xMin, range.xMax]}
              unit=''
              tickCount={xTicks}
              tickMargin={
                subTitle?.bottomLeft?.text || subTitle?.bottomRight?.text
                  ? 20
                  : 0
              }
              tick={customXTicks}
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
              yAxisId={yAxis?.display === 'right' ? 'left' : undefined}
              type='number'
              dataKey='y'
              unit=''
              orientation='left'
              domain={[range.yMin, range.yMax]}
              tick={yAxis?.display !== 'right' && customYTicks}
              tickCount={yTicks}
              tickMargin={yAxis?.display === 'right' ? 5 : 25}
              offset={yAxis?.display === 'left' ? -10 : 0}
            >
              {!isMobile &&
                chart?.leftTitle?.text &&
                yAxis?.display === 'right' && (
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
              yAxisId={yAxis?.display === 'right' ? undefined : 'right'}
              type='number'
              dataKey='y'
              unit=''
              orientation='right'
              domain={[range.yMin, range.yMax]}
              tick={yAxis?.display === 'right' && customYTicks}
              tickCount={yAxis?.ticks ?? defaults.yTicks}
              tickMargin={yAxis?.display === 'right' ? 5 : 25}
              offset={yAxis?.display === 'left' ? -10 : 0}
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

            {/*********************** SHADE THE BACKGROUND AREA OF EACH QUADRANT **********************/}
            <ReferenceArea
              id='quadrant-1'
              x2={refX}
              y1={refY}
              fill={quadrantColors?.[0] ?? '#fff'}
              fillOpacity={0.25}
            />
            <ReferenceArea
              id='quadrant-2'
              x1={refX}
              y1={refY}
              fill={quadrantColors?.[1] ?? '#fff'}
              fillOpacity={0.25}
            />
            <ReferenceArea
              id='quadrant-3'
              x1={refX}
              y2={refY}
              fill={quadrantColors?.[2] ?? '#fff'}
              fillOpacity={0.25}
            />
            <ReferenceArea
              id='quadrant-4'
              x2={refX}
              y2={refY}
              fill={quadrantColors?.[3] ?? '#fff'}
              fillOpacity={0.25}
            />

            {/*********************** SECONDARY REFERENCE LINES ***************************************/}
            <ReferenceLine x={refX} stroke={'black'} strokeDasharray='3 3' />

            <ReferenceLine
              y={refY}
              stroke={'black'}
              label={{ value: yAxis?.ref?.text, position: 'insideBottomLeft' }}
            />

            {/************************** DATA BUBBLES && CALLOUT LABELS **************************/}
            <Scatter data={data} shape={(args) => <Donut {...args} />}>
              <LabelList dataKey='name' content={dynamicCalloutLabel} />
            </Scatter>

            {/************************************ TOOLTIP DISPLAY ************************************/}
            {CustomTooltip && (
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={CustomTooltip}
              />
            )}

            {/************************************ LEGEND ***********************************/}
            {!isMobile && !!legend && (
              <Legend
                verticalAlign='bottom'
                content={legend}
                wrapperStyle={{ bottom: '-16px' }}
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </>
  )
}

export default BubbleChart
