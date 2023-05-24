import React from 'react'

const Donut = ({
  size,
  color,
  cx,
  cy,
  viewBox,
  widthHeight,
}: {
  size: number
  color: string
  cx?: number
  cy?: number
  viewBox?: string
  widthHeight?: { width?: string; height?: string }
}): JSX.Element => {
  return (
    <svg {...widthHeight} viewBox={viewBox}>
      <circle
        cx={cx ?? size + 1}
        cy={cy ?? size + 1}
        r={size}
        stroke={color}
        strokeWidth='2'
        fill='transparent'
      />
    </svg>
  )
}

export default Donut
