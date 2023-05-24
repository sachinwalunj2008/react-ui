import React, { useEffect, useState } from 'react'
import { scaleLinear, max, min } from 'd3'
import { Tippy } from '../../../module'
import { currencyFormat } from '../../../services/HelperService'

type Data = {
  name: string
  pct: number
  ms: number
  color: string
  offset?: number
}

type Props = {
  data: Data[]
  width?: number
  height?: number
  margin?:
    | number
    | { top?: number; right?: number; bottom?: number; left?: number }
}

const defaultWidth = 1000
const defaultHeight = 500
const defaultMargin = { top: 20, right: 30, bottom: 20, left: 50 }

const displayValue = (value: number) =>
  value > 1000000
    ? Math.floor(value / 1000000) + 'M'
    : value > 1000
    ? Math.floor(value / 1000) + 'K'
    : value

const MekkoBarChart = (props: Props): JSX.Element => {
  const {
      data: chartData,
      width = defaultWidth,
      height = defaultHeight,
      margin = defaultMargin,
    } = props,
    [dimensions, setDimensions] = useState({
      marginTop: 0,
      marginLeft: 0,
      innerWidth: 0,
      innerHeight: 0,
    }),
    { marginTop, marginLeft, innerWidth, innerHeight } = dimensions,
    [data, setData] = useState<Data[]>(chartData),
    totalXValue = data.reduce((acc, curr) => acc + curr.ms, 0),
    scaleXMultiplier = innerWidth / totalXValue,
    [range, setRange] = useState({
      x: 0,
      xMin: 0,
      xMax: 0,
      y: 0,
      yMin: 0,
      yMax: 0,
    }),
    xScale = scaleLinear().domain([0, totalXValue]).range([0, innerWidth]),
    yScale = scaleLinear()
      .domain([
        min(data, (d) => d.pct - (d.pct === 0 ? 0 : range.y * 0.1)) ?? 0,
        max(data, (d) => d.pct + range.y * 0.1) ?? 0,
      ])
      .range([innerHeight, 0]),
    zeroY = yScale(0)

  /************************************************************************************************
   * BAR CALCULATIONS
   * Chart starts at the top with y === 0
   * Each bar is drawn from the top down so finding the top of the bar is necessary
   * yScale(value) function defines the y position of that value in px
   * if the bar value is positive the bar is drawn from yScale(value) to yScale(0)
   * however, if the bar value is negative the bar is drawn from yScale(0) to yScale(value)
   */
  const barStartY = (d: Data) => {
    return yScale(d.pct) > zeroY ? zeroY : yScale(d.pct)
  }
  const barHeight = (d: Data) => {
    return yScale(d.pct) < zeroY ? zeroY - yScale(d.pct) : yScale(d.pct) - zeroY
  }
  /* END BAR CALCULATIONS *********************************************************************/
  /***********************************************************************************************/

  useEffect(() => {
    const marginTop = typeof margin === 'number' ? margin : margin?.top ?? 0,
      marginBottom = typeof margin === 'number' ? margin : margin?.bottom ?? 0,
      marginLeft = typeof margin === 'number' ? margin : margin?.left ?? 0,
      marginRight = typeof margin === 'number' ? margin : margin?.right ?? 0,
      innerHeight = height - marginTop - marginBottom,
      innerWidth = defaultWidth - marginLeft - marginRight
    setDimensions({ marginTop, marginLeft, innerWidth, innerHeight })
  }, [margin, height, width])

  useEffect(() => {
    let minX = 0,
      maxX = 0,
      minY = 0,
      maxY = 0
    data.forEach((d: Data) => {
      if (d.ms > maxX) maxX = d.ms
      if (d.ms < minX) minX = d.ms
      if (d.pct > maxY) maxY = d.pct
      if (d.pct < minY) minY = d.pct
    })
    setRange({
      x: maxX - minX,
      xMax: maxX,
      xMin: minX,
      y: maxY - minY,
      yMax: maxY,
      yMin: minY,
    })
  }, [data])

  useEffect(() => {
    const updatedData = chartData
      .sort((a, b) => b.ms * b.pct - a.ms * a.pct)
      .map((d, i) => {
        const offset = chartData
          .slice(0, i)
          .reduce((acc, curr) => acc + Math.abs(curr.ms) * scaleXMultiplier, 0)
        return { ...d, offset }
      })
    setData(updatedData)
  }, [chartData, scaleXMultiplier])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${marginLeft},${marginTop})`}>
        {/* X AXIS FORMATTING */}
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line y1={0} y2={innerHeight} stroke='rgba(0,0,0,.1)' />
            <text
              style={{ textAnchor: 'middle' }}
              dy='.71em'
              y={innerHeight + 9}
            >
              {displayValue(tickValue)}
            </text>
          </g>
        ))}

        {/* Y AXIS FORMATTING */}
        {yScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
            <line x1='0' x2={innerWidth} stroke='rgba(0,0,0,.1)' />
            <text style={{ textAnchor: 'end' }} y={0} dy='.32em' dx={-3}>
              {Math.floor(tickValue * 100) + '%'}
            </text>
          </g>
        ))}

        {/* BARS & LABELS */}
        {data.map((d) => (
          <React.Fragment key={d.name}>
            <Tippy
              appendTo={document.body}
              arrow={true}
              content={
                <div>
                  <div>{d.name}</div>
                  <div>${currencyFormat(d.ms, 0)}</div>
                  <div>{`Growth Opportunity: ${d.pct}%`}</div>
                </div>
              }
              duration={[null, 0]}
            >
              <rect
                y={barStartY(d)}
                x={d?.offset ?? 0}
                width={xScale(d.ms)}
                height={barHeight(d)}
                fill={d.color}
              />
            </Tippy>
            <text
              x={d?.offset ?? 0}
              dx={xScale(d.ms) / 2}
              y={yScale(d.pct) < zeroY ? yScale(d.pct) : yScale(d.pct) + 20}
              dy={yScale(d.pct) > 0 ? -5 : 15}
              textAnchor='middle'
            >
              ${currencyFormat(d.ms, 0)}
            </text>
          </React.Fragment>
        ))}
      </g>
    </svg>
  )
}

export default MekkoBarChart
