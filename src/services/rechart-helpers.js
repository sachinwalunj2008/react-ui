import * as React from 'react'
import { colors } from './GraphHelperService'
import { TwoLineDateLabel, LineTooltip } from '../module'

const colorsWithoutHash = colors.map((color) => color.slice(1))

export const cartesianGridProps = {
  vertical: false,
}

export function xAxisProps({ showHours = false } = {}) {
  return {
    axisLine: false,
    tickCount: 8,
    domain: ['dataMin', 'dataMax'],
    type: 'category',
    interval: 'preserveStart',
    height: 45,
    tickLine: false,
    tickMargin: 10,
    // TODO change the true condition to show hours
    tick: showHours ? <TwoLineDateLabel /> : <TwoLineDateLabel />,
  }
}

export const yAxisProps = {
  axisLine: false,
  tickLine: false,
  tickCount: 5,
  tickMargin: 5,
  width: 44,
  orientation: 'right',
  style: {
    fontSize: '12px',
    fill: 'rgb(116, 121, 157)',
  },
  type: 'number',
  domain: ['auto', 'auto'],
}

export function areaProps(colorIndex = 0) {
  const color = colors[colorIndex]
  return {
    type: 'monotone',
    fillOpacity: 1,
    fill: `url(${color})`,
    dot: false,
    strokeWidth: 4,
    connectNulls: true,
    activeDot: {
      stroke: color,
      fill: 'white',
      strokeWidth: 3,
      r: 4.6,
    },
    stroke: color,
    strokeLinecap: 'round',
    animationDuration: 1000,
  }
}

export function linearGradient({ color, index }) {
  return (
    <linearGradient
      key={color}
      id={colorsWithoutHash[index]}
      x1='0'
      y1='0'
      x2='0'
      y2='1'
    >
      <stop
        offset='5%'
        stopColor={color}
        stopOpacity={color === 'FFF' ? 0 : 0.25}
      />
      <stop
        offset={color === 'FFF' ? '95%' : '100%'}
        stopColor={color}
        stopOpacity={0}
      />
    </linearGradient>
  )
}

export function tooltipProps(prefix = '$') {
  return {
    cursor: true,
    content: <LineTooltip className='basic' prefix={prefix} />,
  }
}

export const areaChartProps = {
  margin: { top: 5, right: 5, left: 5, bottom: 5 },
}
